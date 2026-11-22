function processElement(tag,text,classes) {
  const el=document.createElement(tag);
  if(text)el.textContent=text;
  if(classes)el.className=classes;
  return el;
}
function processSource(title,href) {
  const link=processElement('a',title);
  link.href=href;
  link.target='_blank';
  link.rel='noopener';
  return link;
}
function renderSectionViews(views, initial = -1) {
  const root=processElement('div','','process-views');
  const menu=processElement('div','','process-card-menu');
  menu.setAttribute('role','group');
  menu.setAttribute('aria-label','Contenido de la sección');
  const back=processElement('button','← Volver a las tarjetas','process-card-back');
  back.type='button';
  root.append(menu,back);
  let active=-1;
  const content=views.map(([label,description,children],index)=>{
    const card=processElement(typeof children==='string'?'a':'button','','process-card');
    card.append(processElement('strong',label),processElement('span',description));
    menu.append(card);
    if(typeof children==='string'){
      card.href=children;
      return {card};
    }
    card.type='button';
    const section=processElement('section','','process-view');
    const title=processElement('h3',label,'process-card-title');
    title.tabIndex=-1;
    section.setAttribute('aria-label',label);
    section.append(title,...children);
    root.append(section);
    card.addEventListener('click',()=>show(index,true));
    return {card,section,title};
  });
  function show(index,focus) {
    const previous=active;
    active=index;
    menu.hidden=index>=0;
    back.hidden=index<0;
    content.forEach(({section},i)=>{if(section)section.hidden=i!==index;});
    if(focus){
      if(index>=0)content[index].title?.focus();
      else content[previous]?.card.focus();
    }
  }
  back.addEventListener('click',()=>show(-1,true));
  show(initial,false);
  return root;
}
function renderCatalogueEntry(entry,source) {
  const details=processElement('details','','process-route');
  details.append(processElement('summary',entry.name));
  const steps=processElement('p',entry.steps);
  const output=processElement('p');
  output.append(processElement('strong','Resultado o constancia. '),document.createTextNode(entry.output));
  details.append(steps,output);
  if(source)details.append(processSource('Abrir fuente de consulta',source));
  return details;
}
function renderLocalProcessRoutes(code) {
  const state=djfProcessCatalogue.local[code];
  if(!state)return null;
  const area=processElement('section','','process-local');
  area.append(processElement('h3','Rutas y medios en la entidad'));
  for(const [title,steps] of state.routes){
    const details=processElement('details','','process-route');
    details.append(processElement('summary',title),processElement('p',steps));
    area.append(details);
  }
  area.append(processElement('h4','Medios y actuaciones por cotejar'),processElement('p',state.ways),processElement('p',state.control));
  for(const [title,link] of state.refs)area.append(processSource(title,link));
  return area;
}
function renderProcessRoutes(topic,code) {
  const {families,acts}=djfProcessCatalogue;
  const filters={
    partido:[0,1],anual:[3],fiscalizacion:[3],defensa:[5],organizacion:[1,2],sancionadores:[4],
    extraordinaria:[2],judicial:[2],participacion:[2],
  };
  if(!filters[topic])return null;
  const section=processElement('section','','process-routes');
  for(const index of filters[topic]){
    const family=families[index];
    let rows=family.entries;
    if(topic==='anual')rows=rows.filter(item=>/ordinaria|trimestrales|remanentes|SIF|gasto programado|liderazgo/i.test(item.name));
    if(topic==='fiscalizacion')rows=rows.filter(item=>!/ordinaria|trimestrales|gasto programado|liderazgo/i.test(item.name));
    if(topic==='extraordinaria')rows=rows.filter(item=>/Extraordinaria/.test(item.name));
    if(topic==='judicial')rows=rows.filter(item=>/judicial/i.test(item.name));
    if(topic==='participacion')rows=rows.filter(item=>/Consulta popular/.test(item.name));
    section.append(processElement('h3',family.title));
    for(const row of rows)section.append(renderCatalogueEntry(row,family.source));
  }
  if(['organizacion','defensa'].includes(topic))section.prepend(renderLocalProcessRoutes(code));
  if(['sancionadores','defensa','anual'].includes(topic)){
    section.append(processElement('h3','Qué hacer al recibir un documento'));
    for(const act of acts)section.append(renderCatalogueEntry(act));
  }
  return section;
}
function renderProcessCatalogue(panel,code) {
  const {families,acts}=djfProcessCatalogue;
  const total=families.reduce((sum,family)=>sum+family.entries.length,0);
  const info=processElement('p',total+' rutas de trabajo · '+families.length+' familias · '+acts.length+' actuaciones por documento · 32 fichas estatales');
  const note=processElement('p','El catálogo reúne trámites del partido, vías de defensa y elecciones que requieren seguimiento. La aplicación depende del rol, ámbito, entidad, acto y norma vigente.');
  const input=processElement('input');
  input.id='process-finder';
  input.type='search';
  input.placeholder='Ej. emplazamiento, coalición o dictamen';
  const label=processElement('label','Buscar en procesos y actuaciones');
  label.htmlFor=input.id;
  const status=processElement('p');
  status.setAttribute('role','status');
  const list=processElement('div','','process-catalogue');
  const groups=[...families,{title:'Actuaciones por documento recibido',entries:acts}];
  for(const family of groups){
    const group=processElement('details','','process-family');
    group.append(processElement('summary',family.title+' · '+family.entries.length));
    for(const row of family.entries)group.append(renderCatalogueEntry(row,family.source));
    list.append(group);
  }
  const normalized=text=>text.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'');
  input.addEventListener('input',()=>{
    const query=normalized(input.value.trim());
    let matches=0;
    for(const group of list.children){
      let visible=0;
      for(const route of group.querySelectorAll('.process-route')){
        route.hidden=!!query&&!normalized(route.textContent).includes(query);
        if(!route.hidden)visible++;
      }
      group.hidden=!visible;
      group.open=!!query&&visible>0;
      matches+=visible;
    }
    status.textContent=query?matches+' resultados':'';
  });
  panel.replaceChildren(info,note,renderSectionViews([
    ['Buscador de procesos y actuaciones','57 rutas y 14 guías por documento recibido.',[label,input,status,list]],
    ['Cargos y medios de la entidad','Secuencias por elección, vías locales por cotejar y referencias estatales.',[renderLocalProcessRoutes(code)]],
  ]));
}
