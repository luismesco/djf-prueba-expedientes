const processStages = {
  anual: [
    ['informe','Informe y acuse','Informe presentado, acuse, anexos y respaldo contable.',[1]],
    ['primera','Primera vuelta','Oficio, notificación, respuesta, acuse y anexos de primera vuelta.',[0,1,3]],
    ['segunda','Segunda vuelta','Oficio y respuesta de segunda vuelta, con cotejo de antecedentes por numeral.',[0,1,3]],
    ['dictamen','Dictamen y resolución','Conclusiones, valoración de respuestas, anexos y resolutivos.',[2,3]],
    ['defensa','Impugnación y cumplimiento','Resolución, notificación, recurso aplicable, sentencia y constancias de cumplimiento.',[2,3],'defensa'],
  ],
  fiscalizacion: [
    ['preparacion','Calendario y acuerdos','Ciclo, calendario de fiscalización, cargos, sujetos obligados y acuerdos aplicables.',[0]],
    ['precampana','Precampaña','Acuerdo de topes, operaciones, comprobantes, informe y acuse de precampaña.',[0,1,2]],
    ['campana','Campaña','Acuerdo de topes, contabilidad, informe, acuse y evidencia de campaña.',[0,1,2]],
    ['revision','Oficios y respuestas','Notificaciones, oficios, respuestas y anexos del periodo revisado.',[1,2]],
    ['dictamen','Dictamen y resolución','Conclusiones y determinaciones del periodo que corresponda.',[2]],
    ['defensa','Impugnación y cumplimiento','Acto, constancia de notificación, recurso o juicio, resolución y seguimiento.',[2],'defensa'],
  ],
  organizacion: [
    ['preparacion','Preparación','Plan, calendario, acuerdos, autoridades y cargos por demarcación.',[0,1]],
    ['registro','Registro de candidaturas','Convocatorias, registros, sustituciones y listas definitivas.',[0,1]],
    ['precampana','Precampaña','Periodos por cargo, acuerdos y comunicaciones oficiales de precampaña.',[0,1],'fiscalizacion'],
    ['intercampana','Intercampaña','Calendario y comunicaciones aplicables al periodo entre precampaña y campaña.',[0,1]],
    ['campana','Campaña','Periodos y acuerdos de campaña por cargo y demarcación.',[0,1],'fiscalizacion'],
    ['jornada','Jornada','Actas de casilla, reportes de incidentes y documentación de la jornada.',[0,1]],
    ['computos','Cómputos y validez','Actas de cómputo, recuentos, constancias, declaratorias y asignaciones.',[0,1]],
    ['cierre','Impugnación y cierre','Resoluciones, resultados definitivos y ajustes o cumplimiento.',[0,1],'defensa'],
  ],
  sancionadores: [
    ['inicio','Recepción e inicio','Queja, acuerdo de inicio o prevención y anexos recibidos.',[0,1,2]],
    ['cautelares','Cautelares y protección','Acuerdo, notificación, alcance y constancias de ejecución, cuando procedan.',[0,1,2]],
    ['emplazamiento','Emplazamiento y contestación','Traslado, cédula, contestación, pruebas y acuse.',[0,1,2]],
    ['instruccion','Pruebas, audiencia y alegatos','Diligencias, admisión y desahogo de pruebas, acta o escrito de alegatos, según la vía.',[0,1,2]],
    ['resolucion','Resolución y seguimiento','Determinación, notificación, efectos y constancias posteriores.',[0,1,2],'defensa'],
  ],
  defensa: [
    ['acto','Acto y notificación','Acto impugnable, constancia de notificación o conocimiento, competencia y oportunidad.',[0,1]],
    ['promocion','Promoción y trámite','Demanda o recurso, personería, agravios, pruebas, acuse y actuaciones procesales.',[0,1]],
    ['sentencia','Sentencia y efectos','Resolución, notificación, cambio en la determinación y efectos ordenados.',[0,1]],
    ['cumplimiento','Cumplimiento y cierre','Actos de cumplimiento, notificaciones, evidencias y asuntos pendientes.',[0,1]],
  ],
  partido: [
    ['registro','Registro y acreditación','Registro, documentación básica y constancias de acreditación local.',[0,1]],
    ['vida','Vida interna','Padrón, convocatorias, actas, renovación de órganos y nombramientos.',[0,1]],
    ['participacion','Candidaturas y convenios','Actas partidistas, registros, convenios, acuerdos y documentación de prerrogativas.',[0,1],'organizacion'],
    ['seguimiento','Obligaciones y seguimiento','Transparencia, determinaciones y documentación de cierre cuando proceda.',[0,1]],
  ],
  extraordinaria: [
    ['convocatoria','Convocatoria y calendario','Acto de origen, convocatoria, plan y calendario del proceso extraordinario.',[0,1]],
    ['registros','Registros','Candidaturas, acuerdos y modificaciones de registros.',[0,1]],
    ['campana','Campaña','Calendario, topes e informes del proceso extraordinario.',[0,1],'fiscalizacion'],
    ['resultados','Jornada, cómputos y validez','Actas, cómputos, constancias y determinaciones de validez.',[0,1]],
    ['cierre','Impugnación y cierre','Resoluciones, cambios en resultados y constancias de cumplimiento.',[0,1],'defensa'],
  ],
  judicial: [
    ['convocatoria','Convocatoria y demarcación','Convocatoria, cargos, ámbito y marco geográfico judicial.',[0,1]],
    ['listas','Postulación y candidaturas','Listas, aprobaciones y modificaciones de postulaciones.',[0,1]],
    ['campana','Campaña judicial','Reglas aplicables y documentación de campaña por ámbito y cargo.',[0,1]],
    ['jornada','Jornada','Actas y constancias de la jornada judicial.',[0,1]],
    ['computos','Cómputos, asignación y validez','Cómputos, verificación de requisitos, asignaciones y constancias.',[0,1]],
    ['cierre','Impugnación y cumplimiento','Resoluciones y efectos por cargo y ámbito.',[0,1],'defensa'],
  ],
  participacion: [
    ['inicio','Convocatoria y procedencia','Acto convocante, ámbito, reglas y verificación de apoyos cuando corresponda.',[0,1]],
    ['organizacion','Organización','Calendario, acuerdos, materiales y demarcaciones.',[0,1]],
    ['jornada','Jornada y cómputos','Actas, cómputos por demarcación y publicaciones de resultados.',[0,1]],
    ['cierre','Resultados y cierre','Determinación definitiva, efectos y actuaciones posteriores.',[0,1],'defensa'],
  ],
};

function addProcessStages(view,topic,link) {
  const stages=processStages[topic];
  if(!stages)return view;
  const menu=view.querySelector(':scope > .process-card-menu');
  const cards=[...menu.querySelectorAll(':scope > .process-card')];
  const destinations=cards.map(card=>card.getAttribute('href'));
  const controls=processElement('div','','process-stage-selector');
  controls.setAttribute('role','group');
  controls.setAttribute('aria-label','Etapas del proceso');
  const context=processElement('section','','process-stage-context');
  const current=new URLSearchParams(location.search).get('fase');
  const options=[['','Todas las etapas','',cards.map((_,i)=>i)],...stages];
  const select=processElement('select');
  select.setAttribute('aria-label','Etapa activa');
  for(const [key,label] of options){
    const option=processElement('option',label);
    option.value=key;
    select.append(option);
  }
  function activate(key){
    const url=new URL(location.href);
    if(key)url.searchParams.set('fase',key);
    else url.searchParams.delete('fase');
    history.replaceState(history.state,'',url);
    show(key);
  }
  function arrow(label,path,step){
    const button=processElement('button');
    button.type='button';
    button.setAttribute('aria-label',label);
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="'+path+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    button.addEventListener('click',()=>{
      if(button.getAttribute('aria-disabled')==='true')return;
      activate(options[select.selectedIndex+step][0]);
    });
    return button;
  }
  const previous=arrow('Etapa anterior','m15 6-6 6 6 6',-1);
  const next=arrow('Etapa siguiente','m9 6 6 6-6 6',1);
  select.addEventListener('change',()=>activate(select.value));
  controls.append(previous,select,next);
  const status=processElement('span','','process-stage-status');
  status.setAttribute('role','status');
  controls.append(status);
  const section=processElement('section','','process-stages');
  section.setAttribute('aria-label','Atención por etapa');
  section.hidden=menu.hidden;
  section.append(controls,context);
  menu.before(section);
  function show(key){
    const index=Math.max(options.findIndex(([phase])=>phase===key),0);
    const [phase,label,summary,visible,related]=options[index];
    key=phase;
    select.selectedIndex=index;
    previous.setAttribute('aria-disabled',String(index<=1));
    next.setAttribute('aria-disabled',String(index===options.length-1));
    status.textContent=label;
    announceToolContext(topic,summary?label:'',summary?key:'');
    context.hidden=!summary;
    context.replaceChildren();
    if(summary){
      context.append(processElement('p',summary));
      if(related){
        const resource=processElement('a',related==='defensa'?'Abrir impugnaciones y cumplimiento':'Abrir fiscalización electoral');
        resource.href=link(related,related==='fiscalizacion'&&['precampana','campana'].includes(key)?{fase:key}:{});
        context.append(resource);
      }
    }
    cards.forEach((card,i)=>{
      card.hidden=!visible.includes(i);
      if(!destinations[i])return;
      const url=new URL(destinations[i],location.href);
      if(!key){
        card.setAttribute('href',destinations[i]);
        return;
      }
      url.searchParams.set('faseOrigen',key);
      if(['precampana','campana'].includes(key)&&['oficios','topes'].includes(url.searchParams.get('tema'))) {
        url.searchParams.set('etapa',key);
      }
      card.href=url.href;
    });
  }
  show(current);
  return view;
}
