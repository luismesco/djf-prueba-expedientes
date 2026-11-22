const specialProcessGuides = {
  extraordinaria: {
    title: 'Elecciones extraordinarias',
  },
  judicial: {
    title: 'Elecciones judiciales',
  },
  participacion: {
    title: 'Consulta popular y revocación de mandato',
  },
  sancionadores: {
    title: 'Quejas y procedimientos sancionadores',
  },
};

const processGuides = {
  ...specialProcessGuides,
  partido: {
    title: 'Vida y obligaciones del partido',
    sources: [['INE · Actores políticos y documentos de partidos', 'https://ine.mx/actores-politicos/'], ['Cámara de Diputados · Ley General de Partidos Políticos', 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPP.pdf']],
  },
  anual: {
    title: 'Fiscalización del informe anual',
    sources: [
      ['INE · Ejemplo de dictamen y resolución anual', 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/166167'],
      ['INE · Ejemplo de seguimiento a una conclusión, cumplimiento SG-RAP-2/2025', 'https://repositoriodocumental.ine.mx/xmlui/bitstream/handle/123456789/185938/CGex202510-31-ap-5-11.pdf'],
    ],
  },
  organizacion: {
    title: 'Organización electoral local',
    sources: [['INE · Plan y calendarios de coordinación 2026–2027', 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/189392']],
  },
  fiscalizacion: {
    title: 'Fiscalización de precampaña y campaña',
    sources: [['TEPJF · Ejemplo de revisión de precampaña, SUP-RAP-80/2021', 'https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf']],
  },
  defensa: {
    title: 'Impugnación y cumplimiento',
    sources: [['TEPJF · Ejemplo de recurso de apelación, SUP-RAP-80/2021', 'https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf']],
  },
};

function renderStateCoverage(panel, data, topic) {
  const {state, offices, dictamen, norms, ople, plans, limits, cargos, recentDecisions, historicalDecisions, link} = data;
  const linked = value => value ? 'En el acervo' : 'Sin enlace en el acervo';
  const pending = 'Por cotejar';
  const fmt = new Intl.NumberFormat('es-MX', {style:'currency',currency:'MXN'});
  const amount = value => fmt.format(Number(value)) + ' MXN';
  const rows = [
    ['Preparación del proceso electoral', [
      ['Marco local', linked(norms), 'Constitución estatal, legislación electoral, reglamentos, lineamientos y acuerdos aplicables, con versión y vigencia.', 'norm'],
      ['Autoridad electoral local', linked(ople), 'Sitio del OPLE, acuerdos, publicaciones y estrados.', 'ople'],
      ['Plan y calendario', linked(plans), 'Plan integral y calendario aprobado, modificaciones, cargos, demarcaciones, numeralia y plataformas. La carpeta requiere cotejo documental.', 'planes'],
      ['Registro e intercampaña', pending, 'Convocatorias, acuerdos de registro de candidaturas y sustituciones, periodos de intercampaña y acuerdos aplicables.'],
    ]],
    ['Precampaña y campaña', Object.entries(cargos)
      .filter(([key]) => state.scope.includes(key) || Object.hasOwn(limits, key))
      .flatMap(([key, label]) => ['pre','cam'].map(round => {
        const val = limits[key]?.[round];
        const stage = round === 'pre' ? 'Precampaña' : 'Campaña';
        const status = val ? 'Monto registrado' : round === 'pre' && state.status === 'acuerdo' ? 'Acuerdo localizado' : pending;
        const description = val ? amount(val) + ' · ' + limits[key].acuerdo : 'Acuerdo oficial, fecha, cargo, demarcación, monto y fuente. Cotejar si el monto es general o por demarcación.';
        return [stage + ' · ' + label, status, description, 'topes'];
      }))],
    ['Jornada y resultados', [
      ['Jornada, cómputos y validez', pending, 'Actas y cómputos por demarcación, resultados definitivos, declaración de validez, constancias o asignaciones y ajustes posteriores.'],
    ]],
    ['Impugnación y cumplimiento', [
      ['Medios de impugnación y criterios', recentDecisions && historicalDecisions ? 'Dos periodos enlazados' : recentDecisions || historicalDecisions ? 'Un periodo enlazado' : 'Sin carpeta local enlazada', 'Identificar folio, acto impugnado, autoridad, resolución, efectos y cumplimiento. Consultar sentencias locales, federales y jurisprudencia.', 'exp'],
      ['Acto, demanda y cumplimiento', pending, 'Acto y notificación, demanda y acuse, constancias de trámite, sentencia y evidencia de cumplimiento.'],
    ]],
    ['Fiscalización del Informe Anual 2025', [
      ['Informe presentado', pending, 'Informe, acuse, anexos y respaldo contable del sujeto obligado.'],
      ['Primera vuelta', linked(offices?.v1), 'Oficio y notificación, observaciones, respuesta, acuse y anexos. El enlace de esta ficha corresponde al oficio.', 'primera'],
      ['Segunda vuelta', linked(offices?.v2), 'Oficio y notificación, respuesta, acuse, anexos y relación de numerales con primera vuelta. El enlace corresponde al oficio.', 'segunda'],
      ['Dictamen consolidado', linked(dictamen), 'Dictamen y anexos. Identificar conclusión, respuesta valorada, conducta y monto involucrado.', 'dictamen'],
      ['Resolución y seguimiento', pending, 'Resolución del Consejo General, efectos por conclusión, impugnación si existe y determinación de cumplimiento.'],
    ]],
  ];
  const fiscalInputs = ['Control de informes y revisión', [
    ['Informes y acuses', pending, 'Control de ingresos y gastos por etapa, comprobantes, pólizas, informes y constancias de envío.'],
    ['Respuestas y anexos', pending, 'Respuesta presentada, acuse y anexos por proceso electoral y etapa.'],
    ['Dictamen y resolución de la etapa', pending, 'Dictamen, anexos, resolución, conclusiones aplicables y seguimiento o impugnación.'],
  ]];
  const sections = {
    organizacion: [rows[0], rows[2]],
    fiscalizacion: [fiscalInputs],
    defensa: [rows[3]],
    anual: [rows[4]],
    partido: [['Documentos del partido', [
      ['Registro y representación', pending, 'Acreditación, denominación, ámbito, estatuto vigente, nombramientos y constancias.'],
      ['Vida interna y obligaciones', pending, 'Padrón, órganos, actas, reformas, transparencia y solicitudes o actuaciones relacionadas.'],
      ['Convenios y prerrogativas', pending, 'Actos de aprobación, instrumentos, acuerdos de registro, pautas y ministraciones según el trámite.'],
    ]]],
    extraordinaria: [['Documentos del proceso extraordinario', [['Aplicabilidad, convocatoria y calendario', pending, 'Verifica primero la existencia de un proceso extraordinario para la entidad, demarcación y ciclo elegidos.']]]],
    judicial: [['Documentos de la elección judicial', [['Ámbito y proceso aplicable', pending, 'Confirma si el expediente es federal o local y si corresponde a la entidad y al ciclo consultados.']]]],
    participacion: [['Documentos del ejercicio de participación', [['Convocatoria, actos y resultados territoriales', pending, 'Confirma el ejercicio y conserva su identificación propia.']]]],
    sancionadores: [['Documentos del procedimiento', [['Vía, expediente y resolución', pending, 'Localiza la referencia individual antes de registrar un procedimiento como incorporado.']]]],
  };
  const element = processElement;
  const note = element('p', 'Cobertura de enlaces del acervo al 20 de noviembre de 2026. Una carpeta enlazada acredita su disponibilidad en el índice. «Por cotejar» indica que la presencia del documento específico sigue pendiente de confirmar.');
  const guide = processGuides[topic];
  const grid = element('div', '', 'coverage-grid');
  function documentSection(title, entries, offered = []) {
    const section = element('section', '', 'coverage-stage');
    section.append(element('h3', title));
    const list = element('ul');
    for (const [name, status, description, target] of entries) {
      const item = element('li');
      item.append(element('span', status, 'coverage-status'), element('strong', name, 'coverage-title'), element('p', description));
      if (target && !offered.includes(target)) {
        const resource = element('a', 'Consultar ' + name);
        resource.href = link(target);
        item.append(resource);
      }
      list.append(item);
    }
    section.append(list);
    return section;
  }
  const sourceRows=new Map();
  for (const [label,description,href] of inePublications(topic,data.code)){
    const previous=sourceRows.get(href);
    if(previous)previous.descriptions.add(description);
    else sourceRows.set(href,{label,descriptions:new Set([description])});
  }
  for (const [label,href] of guide?.sources??[]) {
    if(!sourceRows.has(href))sourceRows.set(href,{label,descriptions:new Set()});
  }
  const publications=element('ul');
  for(const [href,{label,descriptions}] of sourceRows){
    const item=element('li');
    item.append(processSource(label,href));
    if(descriptions.size)item.append(element('p',[...descriptions].join(' ')));
    publications.append(item);
  }
  function referenceSection(label,...children){
    const details=element('details','','process-reference ine-series');
    details.append(element('summary',label),publications,...children.filter(Boolean));
    return details;
  }
  if (!guide) {
    for (const entry of rows) grid.append(documentSection(...entry));
    panel.replaceChildren(note,grid,referenceSection('Fuentes oficiales'));
    return;
  }
  const routeList = renderProcessRoutes(topic,data.code);
  const catalogueLink = element('a','Abrir catálogo completo');
  catalogueLink.href = link('catalogo');
  if (topic === 'anual') {
    const [report,,,decision,resolution]=rows[4][1];
    const docs=documentSection('Documentación del sujeto obligado', [
      report,
      ['Respuesta y anexos de primera vuelta',pending,'Respuesta presentada, acuse y correspondencia de anexos por numeral.'],
      ['Respuesta y anexos de segunda vuelta',pending,'Respuesta presentada, acuse y anexos asociados a los numerales de la segunda vuelta.'],
    ]);
    const references=referenceSection('Referencias de la revisión anual',routeList,catalogueLink);
    const reconciliation=element('section','','annual-reconciliation');
    reconciliation.append(
      element('p','Cruza evidencia y respuesta con la valoración de la UTF. Identifica por separado el monto observado, el residual y la determinación de la resolución.'),
    );
    if(data.code==='QROO'){
      const mesa=element('a','Abrir Mesa de análisis de Quintana Roo · muestra');
      mesa.href='./mesa.html';
      reconciliation.prepend(mesa);
    }
    panel.replaceChildren(renderSectionViews([
      ['Oficios de Errores y Omisiones','Primera y segunda vuelta del Informe Anual 2025.',link('oficios',{etapa:'anual'}),'file'],
      ['Informe, respuestas y anexos','Acuses y evidencia del sujeto obligado por vuelta.',[docs],'tree'],
      ['Dictamen y resolución','Conclusiones, determinaciones y constancias pendientes de cotejo.',[documentSection('Determinaciones de la autoridad',[decision,resolution])],'law'],
      ['Cotejo por numeral y conclusión','Observación, respuesta, prueba, valoración y consecuencia.',[reconciliation],'check'],
    ]),references);
    return;
  }
  const copy = {
    organizacion:['Documentos de la elección','Marco local, OPLE, plan, candidaturas y constancias de resultados.','Cargos y medios locales','Secuencia por cargo y vías de defensa que corresponde cotejar en la entidad.'],
    fiscalizacion:['Informes, respuestas y resoluciones','Documentos del sujeto obligado y determinaciones por etapa.','Rutas de fiscalización electoral','Precampaña, campaña, registro de operaciones y seguimiento.'],
    defensa:['Documentos de defensa','Acto, pruebas, demanda, acuse, sentencia y constancias de cumplimiento.','Vías y actuaciones de defensa','Medios federales y de la entidad, más guías por documento recibido.'],
    partido:['Documentos del partido','Registro, nombramientos, padrón, convenios y obligaciones.','Trámites del partido','Constitución, afiliación, representación, candidaturas y prerrogativas.'],
    extraordinaria:['Documentos de la elección extraordinaria','Acto de origen, convocatoria y calendario por cargo y demarcación.','Ruta de una elección extraordinaria','Cómo seguir un proceso extraordinario y documentar su cierre.'],
    judicial:['Documentos de la elección judicial','Convocatoria, marco judicial, candidaturas y constancias.','Rutas judiciales federal y local','Qué se revisa en cada ámbito y en qué momento.'],
    participacion:['Documentos de participación','Actos y resultados de consulta popular o revocación de mandato.','Ruta de consulta y revocación','Procedencia, apoyos cuando aplican, organización y resultados.'],
    sancionadores:['Documentos del procedimiento','Acto de inicio, notificaciones, respuestas, constancias y resolución.','Vías y actuaciones de quejas','Qué hacer ante un emplazamiento, vista, audiencia o resolución.'],
  }[topic];
  const [docsTitle,docsText,detailTitle,detailText]=copy;
  const resources={
    organizacion:[
      ['Normatividad local','Leyes y reglamentos de la entidad.','norm','law'],
      ['OPLE y publicaciones','Autoridad local, acuerdos, estrados y acervo.','ople','institution'],
      ['Planes electorales','Planes, numeralia y plataformas de la entidad.','planes','calendar'],
    ],
    fiscalizacion:[
      ['Consultar acuerdos y topes','Elige etapa y cargo para comparar los montos registrados.','topes','limits'],
      ['Errores y Omisiones','Oficios de precampaña y campaña, y recursos e impugnaciones.','oficios','file'],
    ],
    defensa:[['Sentencias y jurisprudencia','Abre los índices y carpetas disponibles en el Acervo.','exp','search']],
  };
  const direct = resources[topic]??[];
  for (const [title,entries] of sections[topic]??rows) {
    grid.append(documentSection(title,entries,direct.map(([, ,target])=>target)));
  }
  const content = [
    ...direct.map(([label,description,target,icon])=>[label,description,link(target),icon]),
    [docsTitle,docsText,[note,grid],'file'],
    ...(routeList ? [[detailTitle,detailText,[routeList,catalogueLink],topic==='defensa'?'law':topic==='organizacion'?'map':'tree']] : []),
  ];
  if (topic === 'fiscalizacion') {
    panel.replaceChildren(renderSectionViews(content.slice(0,direct.length+1)),
      referenceSection('Referencias de fiscalización',routeList,catalogueLink));

    return;
  }
  panel.replaceChildren(renderSectionViews(content),referenceSection('Fuentes oficiales'));
}
