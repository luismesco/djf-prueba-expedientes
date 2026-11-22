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
const processCardIcons = {
  route:'M5 5h6m5 14h3M5 5v7h14v7M9 8l3-3-3-3m7 14 3 3-3 3',
  file:'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6m-6 4h6',
  tree:'M6 3h5v5H6zM3 16h5v5H3zM16 16h5v5h-5zM8 8v4h11v4m-13-4v4',
  sources:'M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1zm0 0v14',
  calendar:'M4 6h16v15H4zM8 3v5m8-5v5M4 10h16m-12 4h3m2 3h3',
  law:'M12 4v15M5 7h14M6 7l-3 6h6L6 7zm12 0-3 6h6l-3-6zM8 21h8',
  institution:'M3 9l9-5 9 5M5 10h14M7 10v8m5-8v8m5-8v8M4 20h16',
  map:'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15m6-12v15',
  search:'M15.5 15.5l4 4M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z',
  inbox:'M4 6h16l2 9v5H2v-5z M2 15h6l2 2h4l2-2h6',
  limits:'M4 20V4m0 16h16M8 15l4-4 3 2 5-6M16 7h4v4',
  first:'M6 3h8l4 4v14H6zM14 3v5h4m-8 5 2-2v6m-2 0h4',
  second:'M6 3h8l4 4v14H6zM14 3v5h4m-8 4a2 2 0 1 1 3 2l-3 3h4',
  check:'M6 3h8l4 4v14H6zM14 3v5h4m-9 6 2 2 4-4',
};
function processCardIcon(name) {
  const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');
  const path=document.createElementNS(ns,'path');
  svg.setAttribute('viewBox','0 0 24 24');
  svg.setAttribute('class','process-card-icon');
  svg.setAttribute('aria-hidden','true');
  svg.setAttribute('focusable','false');
  path.setAttribute('d',processCardIcons[name]);
  path.setAttribute('fill','none');
  path.setAttribute('stroke','currentColor');
  path.setAttribute('stroke-width','1.65');
  path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  svg.append(path);
  return svg;
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
  const content=views.map(([label,description,children,icon],index)=>{
    const card=processElement(typeof children==='string'?'a':'button','','process-card');
    card.append(processCardIcon(icon),processElement('strong',label),processElement('span',description));
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
    const stages=root.querySelector(':scope > .process-stages');
    if(stages)stages.hidden=menu.hidden;
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
function renderCatalogueEntry(entry) {
  const details=processElement('details','','process-route');
  details.append(processElement('summary',entry.name));
  const steps=processElement('p',entry.steps);
  const output=processElement('p');
  output.append(processElement('strong','Resultado o constancia. '),document.createTextNode(entry.output));
  details.append(steps,output);
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
    for(const row of rows)section.append(renderCatalogueEntry(row));
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
  const info=processElement('p',total+' rutas de trabajo · '+families.length+' familias · '+acts.length+' actuaciones por documento · '+Object.keys(djfProcessCatalogue.local).length+' fichas estatales');
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
    if(family.source)group.append(processSource('Consultar fuente de la familia',family.source));
    for(const row of family.entries)group.append(renderCatalogueEntry(row));
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
    ['Buscador de procesos y actuaciones','Rutas de trabajo por familia y guías por documento recibido.',[label,input,status,list],'search'],
    ['Cargos y medios de la entidad','Secuencias por elección, vías locales por cotejar y referencias estatales.',[renderLocalProcessRoutes(code)],'map'],
  ]));
}
