const eyoStages = [
    ['anual','Anual','Informe Anual 2025'],
    ['precampana','Precampaña','Fiscalización de precampaña'],
    ['campana','Campaña','Fiscalización de campaña'],
    ['otros','Otros procesos','Trimestrales, extraordinarios, judiciales y obtención de apoyo ciudadano, según el sujeto y el procedimiento'],
  ];

function renderEyoStages(panel,{id,initial,link,origin}) {
  const controls=processElement('div','','eyo-stage-controls');
  controls.setAttribute('role','group');
  controls.setAttribute('aria-label','Tipo de revisión');
  const content=processElement('section','','eyo-stage-content');
  content.setAttribute('aria-labelledby','eyo-stage-title');
  panel.replaceChildren(controls,content);
  const buttons=eyoStages.map(([key,label])=>{
    const button=processElement('button',label);
    button.type='button';
    button.addEventListener('click',()=>{
      const url=new URL(location.href);
      url.searchParams.set('etapa',key);
      history.replaceState(history.state,'',url);
      show(key);
    });
    controls.append(button);
    return button;
  });

  function show(key) {
    const [, ,subtitle]=eyoStages.find(([stage])=>stage===key);
    buttons.forEach((button,index)=>button.setAttribute('aria-pressed',String(eyoStages[index][0]===key)));
    const title=processElement('h3',subtitle);
    title.id='eyo-stage-title';
    const cards=[];
    if(key==='anual'){
      const offices=EYO_UTF[id];
      for(const [round,label,icon] of [['v1','Primera vuelta','first'],['v2','Segunda vuelta','second']]){
        const office=offices?.[round];
        if(office?.id)cards.push([label,'INE/UTF/DA/'+office.n+'/2026 · Oficio en Drive',fileUrl(office.id),icon]);
      }
      if(EYO_DIC[id])cards.push(['Dictamen consolidado','Consulta el dictamen incorporado para esta entidad.',link('dictamen',{etapa:key}),'check']);
    }else{
      cards.push(['Consulta en el INE','Informes, dictámenes y resoluciones por proceso y sujeto obligado.',ineDirectories.treasury,'institution']);
      if(key==='otros')cards.push(['Procesos y vías','Consulta extraordinarias, judiciales y otros supuestos en el catálogo.',link('catalogo'),'tree']);
    }
    cards.push(['Recursos e impugnaciones','Acto controvertido, sentencia y cumplimiento. Consulta el recurso de apelación u otro medio aplicable.',link('defensa',{etapa:key,origen:'oficios',proceso:origin}),'law']);
    const links=renderSectionViews(cards);
    for(const anchor of links.querySelectorAll('a[href^="https://"]')){
      anchor.target='_blank';
      anchor.rel='noopener';
    }
    content.replaceChildren(title);
    if(key!=='anual'){
      content.append(processElement('p','La maqueta aún carece de oficios individualizados para este tipo de revisión.','eyo-stage-note'));
    }
    content.append(links);
  }

  show(eyoStages.some(([key])=>key===initial)?initial:'anual');
}
