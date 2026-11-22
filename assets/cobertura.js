const specialProcessGuides = {
  extraordinaria: {
    title: 'Elecciones extraordinarias',
    outcome: 'Expediente del proceso extraordinario, vinculado al acto que lo origina y a los resultados de su propia elección.',
    steps: [
      ['Acreditar el origen', 'Identifica la sentencia o el supuesto que motivó la convocatoria y la demarcación a la que afecta.'],
      ['Abrir calendario propio', 'Integra convocatoria, plan, calendario y convenios de coordinación del proceso extraordinario.'],
      ['Dar seguimiento por etapa', 'Vincula registros, topes, informes de fiscalización y actuaciones de jornada según el calendario aprobado.'],
      ['Cerrar con resultados', 'Integra cómputos, constancias, impugnaciones y cumplimiento, en su caso.'],
    ],
  },
  judicial: {
    title: 'Elecciones judiciales',
    outcome: 'Expediente por ámbito, cargo y demarcación judicial, con resultados y constancias oficiales.',
    steps: [
      ['Confirmar ámbito y participación', 'Verifica el ciclo y si se trata de elección judicial federal o local. Confirma si la entidad participa antes de abrir expediente local.'],
      ['Integrar organización del proceso', 'Reúne convocatoria, marco geográfico, cargos, calendario y acuerdos de coordinación.'],
      ['Vincular candidaturas y publicaciones', 'Incorpora listados oficiales, materiales, reglas de campaña y documentación de fiscalización del proceso, cuando proceda.'],
      ['Cotejar cómputos y validez', 'Registra tipo de cómputo, declaratoria, constancias y resoluciones aplicables.'],
    ],
  },
  participacion: {
    title: 'Consulta popular y revocación de mandato',
    outcome: 'Expediente por ejercicio y ámbito, con el fundamento, la documentación territorial aplicable y la publicación del cómputo.',
    steps: [
      ['Identificar el ejercicio', 'Revisa instrumento, ámbito, convocatoria y calendario. Usa la entidad como referencia territorial cuando el ejercicio sea federal.'],
      ['Integrar documentos preparatorios', 'Agrega reglas, materiales, acuerdos de organización y, si procede, constancias de apoyo ciudadano.'],
      ['Registrar jornada y cómputos', 'Asocia las actas y resultados a la demarcación y al órgano que los emite.'],
      ['Conservar el cierre', 'Agrega cómputo definitivo, actos de validez o determinaciones posteriores, según el ejercicio.'],
    ],
  },
  sancionadores: {
    title: 'Quejas y procedimientos sancionadores',
    outcome: 'Expediente con vía, autoridad, hechos, pruebas, actuaciones, resolución y seguimiento.',
    steps: [
      ['Identificar la vía', 'Registra materia, hechos, autoridad y número de expediente. Distingue queja, procedimiento oficioso y revisión de informes.'],
      ['Integrar actuaciones', 'Reúne escrito inicial o acuerdo de inicio, pruebas, acuerdos, notificaciones y contestaciones.'],
      ['Seguir sustanciación y resolución', 'Documenta diligencias y medidas cuando existan, y conserva la resolución con sus efectos.'],
      ['Vincular impugnación y cumplimiento', 'Relaciona la sentencia, si existe, y las constancias que acrediten los actos de cumplimiento.'],
    ],
  },
};

const processGuides = {
  ...specialProcessGuides,
  partido: {
    title: 'Vida y obligaciones del partido',
    outcome: 'Trámite vinculado al órgano, acto, ámbito y constancias de presentación, aprobación o seguimiento.',
    steps: [
      ['Identificar el trámite y la autoridad', 'Separa la actuación interna del trámite ante el INE u OPLE. Coteja estatuto, acuerdo y disposiciones vigentes.'],
      ['Integrar expediente', 'Reúne convocatoria, actas, personería, documentos básicos y anexos aplicables, con versión y fecha.'],
      ['Presentar y dar seguimiento', 'Conserva acuse, prevenciones, respuestas y determinación de la autoridad cuando proceda.'],
      ['Actualizar el registro', 'Vincula el resultado con el padrón, directorio, acuerdos o registros que deban actualizarse.'],
    ],
    sources: [['INE · Actores políticos y documentos de partidos', 'https://ine.mx/actores-politicos/'], ['Cámara de Diputados · Ley General de Partidos Políticos', 'https://www.diputados.gob.mx/LeyesBiblio/pdf/LGPP.pdf']],
  },
  anual: {
    title: 'Fiscalización del informe anual',
    outcome: 'Expediente enlazado por numeral y conclusión, con el resultado de la revisión, la resolución y los pendientes de seguimiento.',
    steps: [
      ['Abrir el ejercicio', 'Identifica ejercicio, sujeto obligado y ámbito. Reúne el informe presentado, su acuse, anexos, registros contables y calendario aplicable.'],
      ['Atender la primera vuelta', 'Registra oficio y constancia de notificación. Abre una fila por numeral con requerimiento, evidencia solicitada, responsable, respuesta y anexos. Conserva el acuse de presentación.'],
      ['Atender la segunda vuelta', 'Relaciona cada numeral con su antecedente, cuando exista. Identifica qué requiere nueva aclaración o soporte, presenta la respuesta y conserva sus anexos y acuse.'],
      ['Revisar dictamen y resolución', 'Cruza cada conclusión con el oficio, las respuestas y la evidencia valorada. Registra conducta, monto involucrado, determinación, efecto y su localizador. Abre seguimiento o impugnación si corresponde.'],
    ],
    sources: [
      ['INE · Ejemplo de dictamen y resolución anual', 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/166167'],
      ['INE · Ejemplo de seguimiento a una conclusión, cumplimiento SG-RAP-2/2025', 'https://repositoriodocumental.ine.mx/xmlui/bitstream/handle/123456789/185938/CGex202510-31-ap-5-11.pdf'],
    ],
  },
  organizacion: {
    title: 'Organización electoral local',
    outcome: 'Calendario aplicable con hitos, cargos y demarcaciones, más resultados y constancias por elección.',
    steps: [
      ['Identificar el proceso', 'Ubica entidad, año, modalidad ordinaria o extraordinaria, cargos y demarcaciones. Abre el plan y calendario aprobados y verifica sus modificaciones.'],
      ['Dar seguimiento a la preparación', 'Vincula convocatorias, acuerdos de registro y sustituciones. Registra los periodos de precampaña, intercampaña y campaña según el calendario local.'],
      ['Integrar jornada y cómputos', 'Recaba resultados y actas oficiales, verifica demarcación y agrega los cómputos aplicables. Identifica su carácter preliminar o definitivo.'],
      ['Actualizar validez y resultados', 'Incorpora declaración de validez, constancias o asignaciones y los cambios ordenados por resoluciones. Registra la fuente y fecha de cada actualización.'],
    ],
    sources: [['INE · Plan y calendarios de coordinación 2026–2027', 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/189392']],
  },
  fiscalizacion: {
    title: 'Fiscalización de precampaña y campaña',
    outcome: 'Control separado por etapa, sujeto obligado, cargo y demarcación, con el tope aplicable, lo informado y el resultado de la revisión.',
    steps: [
      ['Identificar la etapa y el tope', 'Selecciona precampaña o campaña, cargo y demarcación. Coteja monto, fecha y autoridad en el acuerdo oficial y sus anexos.'],
      ['Integrar ingresos, gastos e informes', 'Reúne registros, comprobantes, pagos, aportaciones y evidencia del ejercicio del gasto. Relaciona cada documento con el informe y conserva el acuse.'],
      ['Atender la revisión', 'Incorpora oficios, notificaciones, respuestas y evidencia adicional. Registra el cruce entre lo informado y lo observado por la autoridad.'],
      ['Registrar el resultado', 'Integra dictamen y resolución aplicables a esa etapa. Distingue monto observado, monto determinado y sanción, cuando exista. Identifica las conclusiones con seguimiento o impugnación.'],
    ],
    sources: [['TEPJF · Ejemplo de revisión de precampaña, SUP-RAP-80/2021', 'https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf']],
  },
  defensa: {
    title: 'Impugnación y cumplimiento',
    outcome: 'Expediente con acto y conclusión impugnados, planteamientos y pruebas, resolución, efectos y evidencia de cumplimiento.',
    steps: [
      ['Identificar el acto y su notificación', 'Reúne el acto completo, autoridad emisora, fecha y constancia de notificación. Identifica qué determinación y conclusiones afectan al interesado.'],
      ['Verificar procedencia y oportunidad', 'Coteja medio, autoridad competente, legitimación, definitividad y plazo con la norma vigente y los hechos del caso. Registra el fundamento y el cómputo que corresponda.'],
      ['Construir el planteamiento', 'Vincula cada agravio con acto, hecho, prueba, norma y efecto solicitado. Anexa constancias y registra órgano, folio y acuse de presentación.'],
      ['Dar seguimiento a la resolución', 'Registra efectos, conclusión afectada, autoridad obligada y acto de cumplimiento. Conserva notificaciones y constancias y registra cualquier revisión posterior.'],
    ],
    sources: [['TEPJF · Ejemplo de recurso de apelación, SUP-RAP-80/2021', 'https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf']],
  },
};

const processExamples = {
  partido: ['DEMO-PART-01 · Actualización de representación ante el OPLE', [
    ['Acto de origen', 'Designación del órgano partidista competente y documento que acredita facultades.'],
    ['Expediente', 'Nombramiento, anexos de acreditación y datos del órgano ante el que se presenta.'],
    ['Presentación', 'Acuse de recepción y referencia a la respuesta o toma de nota, si corresponde.'],
    ['Seguimiento', 'Directorio actualizado con vigencia y sustitución del nombramiento anterior.'],
  ]],
  anual: ['DEMO-IA-01 · Revisión de un informe anual', [
    ['Observación de primera vuelta', 'El oficio de muestra solicita aclarar una operación y aportar su soporte.'],
    ['Respuesta y evidencias', 'Escrito de aclaración, póliza, comprobante y acuse vinculados al numeral.'],
    ['Seguimiento de segunda vuelta', 'Cruce con la primera observación y registro de la evidencia adicional solicitada.'],
    ['Dictamen y resolución', 'La conclusión se registra por separado con el resultado y su localizador.'],
  ]],
  organizacion: ['DEMO-EL-01 · Seguimiento de una elección municipal', [
    ['Preparación', 'Calendario aprobado, convocatoria e identificación de la demarcación.'],
    ['Candidaturas', 'Acuerdos de registro y sustituciones asociados al cargo.'],
    ['Jornada y cómputo', 'Acta de cómputo municipal y referencia a los resultados publicados.'],
    ['Validez', 'Declaración y constancia, con espacio para anotar modificaciones posteriores.'],
  ]],
  fiscalizacion: ['DEMO-FIS-01 · Revisión de gastos de campaña', [
    ['Etapa y demarcación', 'Campaña municipal. El tope se toma del acuerdo aplicable al cargo y demarcación.'],
    ['Operación de ejemplo', 'Registro de propaganda relacionado con póliza, comprobante, pago y evidencia de exhibición.'],
    ['Informe y revisión', 'Acuse del informe vinculado al gasto. Se registra por separado cualquier requerimiento de revisión.'],
    ['Resultado', 'Conclusión y resolución pendientes de incorporarse al expediente de muestra.'],
  ]],
  defensa: ['DEMO-DEF-01 · Seguimiento de un acto impugnado', [
    ['Acto y notificación', 'Resolución de muestra y constancia de notificación.'],
    ['Planteamiento', 'Agravio de ejemplo por falta de valoración de una constancia, con enlace a la prueba.'],
    ['Sentencia', 'Campos para sentido, efectos y autoridad obligada.'],
    ['Cumplimiento', 'Acuerdo de cumplimiento y constancia de notificación, cuando se incorporen.'],
  ]],
  extraordinaria: ['DEMO-EXT-01 · Elección extraordinaria municipal', [
    ['Origen', 'Sentencia y convocatoria que abren un expediente distinto del ordinario.'],
    ['Calendario', 'Hitos y responsables del proceso extraordinario.'],
    ['Documentación', 'Registro de candidaturas, acuerdos de fiscalización y actuaciones de jornada.'],
    ['Cierre', 'Cómputos, validez y seguimiento de impugnaciones.'],
  ]],
  judicial: ['DEMO-JUD-01 · Elección de un cargo judicial', [
    ['Ámbito y cargo', 'Identificación de la elección, cargo y demarcación judicial.'],
    ['Preparación', 'Convocatoria, marco geográfico y listado oficial de candidaturas.'],
    ['Jornada y cómputo', 'Materiales y publicación del cómputo correspondiente.'],
    ['Validez', 'Declaratoria y constancia asociadas al cargo y demarcación.'],
  ]],
  participacion: ['DEMO-PAR-01 · Integración territorial de una consulta', [
    ['Ejercicio', 'Convocatoria y ámbito del mecanismo de participación.'],
    ['Organización', 'Calendario, materiales y ubicación de mesas receptoras.'],
    ['Resultados', 'Actas y cómputos asociados a cada demarcación.'],
    ['Cierre', 'Publicación definitiva y determinaciones posteriores, cuando existan.'],
  ]],
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
    ['Oficios y respuestas', pending, 'Oficios, notificaciones, respuestas y anexos del proceso electoral y etapa consultados.'],
    ['Dictamen y resolución de la etapa', pending, 'Dictamen, anexos, resolución, conclusiones aplicables y seguimiento o impugnación.'],
  ]];
  const sections = {
    organizacion: [rows[0], rows[2]],
    fiscalizacion: [rows[1], fiscalInputs],
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
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const note = element('p', 'Cobertura de enlaces del acervo al 20 de noviembre de 2026. Una carpeta enlazada acredita su disponibilidad en el índice. «Por cotejar» indica que la presencia del documento específico sigue pendiente de confirmar.');
  const guide = processGuides[topic];
  const workflow = element('section', '', 'coverage-workflow');
  if (guide) {
    workflow.append(element('p', 'Identifica el expediente por entidad, ciclo o ejercicio y ámbito. Agrega el cargo y la demarcación cuando correspondan. Vincula los acuerdos federales aplicables por clave.'));
    workflow.append(element('h3', 'Cómo se trabaja'));
    const steps = element('ol');
    for (const [title, description] of guide.steps) {
      const step = element('li');
      step.append(element('strong', title), element('p', description));
      steps.append(step);
    }
    workflow.append(steps, element('h3', 'Resultado del proceso'), element('p', guide.outcome));
  }
  const example = processExamples[topic];
  const examplePanel = element('section', '', 'coverage-example');
  if (example) {
    const [title, fields] = example;
    examplePanel.append(element('h3','Expediente de muestra'), element('p', title));
    const list = element('dl');
    for (const [label,value] of fields) {
      const row = element('div');
      row.append(element('dt', label), element('dd', value));
      list.append(row);
    }
    examplePanel.append(list);
  }
  const grid = element('div', '', 'coverage-grid');
  function documentSection(title, entries) {
    const section = element('section', '', 'coverage-stage');
    section.append(element('h3', title));
    const list = element('ul');
    for (const [name, status, description, target] of entries) {
      const item = element('li');
      item.append(element('span', status, 'coverage-status'), element('strong', name, 'coverage-title'), element('p', description));
      if (target) {
        const resource = element('a', 'Consultar ' + name);
        resource.href = link(target);
        item.append(resource);
      }
      list.append(item);
    }
    section.append(list);
    return section;
  }
  for (const [title, entries] of sections[topic] ?? rows) grid.append(documentSection(title, entries));
  const sources = element('div', '', 'coverage-sources');
  for (const [title, url] of (guide ? (guide.sources ?? []) : [
    ['INE · Calendario y etapas locales', 'https://ine.mx/voto-y-elecciones/elecciones-locales-2026/elecciones-locales-2026-etapas/'],
    ['INE · Actividades federales 2026–2027', 'https://ine.mx/voto-y-elecciones/elecciones-2027/actividades-2027/'],
    ['INE · Dictamen y resolución', 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/166167'],
    ['TEPJF · Ejemplo de impugnación, SUP-RAP-80/2021', 'https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf'],
  ])) {
    const anchor = element('a',title);
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    sources.append(anchor);
  }
  const official = element('details', '', 'ine-series');
  official.append(element('summary', 'Publicaciones oficiales para este proceso'));
  const publications = element('ul');
  for (const [label, description, href] of inePublications(topic, data.code)) {
    const item = element('li');
    const anchor = element('a', label);
    anchor.href = href;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    item.append(anchor, element('p', description));
    publications.append(item);
  }
  official.append(publications);
  if (!guide) {
    panel.replaceChildren(note,grid,official,sources);
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
    const references=element('details','','process-reference');
    references.append(element('summary','Referencias de la revisión anual'),workflow,routeList,catalogueLink,official,sources);
    const reconciliation=element('section','','annual-reconciliation');
    reconciliation.append(
      element('p','Cruza evidencia y respuesta con la valoración de la UTF. Identifica por separado el monto observado, el residual y la determinación de la resolución.'),
      ...(example?[examplePanel]:[]),
    );
    if(data.code==='QROO'){
      const mesa=element('a','Abrir Mesa de análisis de Quintana Roo · muestra');
      mesa.href='./mesa.html';
      reconciliation.prepend(mesa);
    }
    panel.replaceChildren(renderSectionViews([
      ['Oficios de Errores y Omisiones','Primera y segunda vuelta del Informe Anual 2025.',link('oficios'),'file'],
      ['Informe, respuestas y anexos','Acuses y evidencia del sujeto obligado por vuelta.',[docs],'tree'],
      ['Dictamen y resolución','Conclusiones, determinaciones y constancias pendientes de cotejo.',[documentSection('Determinaciones de la autoridad',[decision,resolution])],'law'],
      ['Cotejo por numeral y conclusión','Observación, respuesta, prueba, valoración y consecuencia.',[reconciliation],'check'],
    ]),references);
    return;
  }
  const copy = {
    organizacion:['Calendario y etapas de la elección','Preparación, registros, jornada, cómputos y declaración de validez.','Documentos de la elección','Marco local, OPLE, plan, candidaturas y constancias de resultados.','Cargos y medios locales','Secuencia por cargo y vías de defensa que corresponde cotejar en la entidad.'],
    fiscalizacion:['Cómo se revisan los gastos','Tope aplicable, comprobantes, informe, requerimientos y determinación.','Topes e informes por etapa','Acuerdos y montos por cargo, informes, oficios y resultados de fiscalización.','Rutas de fiscalización electoral','Precampaña, campaña, registro de operaciones y seguimiento.'],
    defensa:['Del acto impugnado al cumplimiento','Notificación, procedencia, agravios, sentencia y ejecución de efectos.','Documentos de defensa','Acto, pruebas, demanda, acuse, sentencia y constancias de cumplimiento.','Vías y actuaciones de defensa','Medios federales y de la entidad, más guías por documento recibido.'],
    partido:['Cómo se integra un trámite partidista','Acto interno, autoridad, presentación, acuse y seguimiento.','Documentos del partido','Registro, nombramientos, padrón, convenios y obligaciones.','Trámites del partido','Constitución, afiliación, representación, candidaturas y prerrogativas.'],
    extraordinaria:['De la convocatoria a los resultados','Origen de la elección, calendario propio, jornada, cómputos y cierre.','Documentos de la elección extraordinaria','Acto de origen, convocatoria y calendario por cargo y demarcación.','Ruta de una elección extraordinaria','Cómo seguir un proceso extraordinario y documentar su cierre.'],
    judicial:['Preparación, jornada y cómputos','Ámbito, cargos, postulaciones, resultados y validez.','Documentos de la elección judicial','Convocatoria, marco judicial, candidaturas y constancias.','Rutas judiciales federal y local','Qué se revisa en cada ámbito y en qué momento.'],
    participacion:['Cómo se sigue el ejercicio','Convocatoria, organización territorial, votación, cómputos y cierre.','Documentos de participación','Actos y resultados de consulta popular o revocación de mandato.','Ruta de consulta y revocación','Procedencia, apoyos cuando aplican, organización y resultados.'],
    sancionadores:['Cómo se tramita una queja','Inicio, emplazamiento, pruebas, resolución y seguimiento.','Documentos del procedimiento','Acto de inicio, notificaciones, respuestas, constancias y resolución.','Vías y actuaciones de quejas','Qué hacer ante un emplazamiento, vista, audiencia o resolución.'],
  }[topic];
  const [routeTitle,routeText,docsTitle,docsText,detailTitle,detailText]=copy;
  const resources={
    organizacion:[
      ['Normatividad local','Leyes y reglamentos de la entidad.','norm','law'],
      ['OPLE y publicaciones','Autoridad local, acuerdos, estrados y acervo.','ople','institution'],
      ['Planes electorales','Planes, numeralia y plataformas de la entidad.','planes','calendar'],
    ],
    fiscalizacion:[['Consultar acuerdos y topes','Elige etapa y cargo para comparar los montos registrados.','topes','limits']],
    defensa:[['Sentencias y jurisprudencia','Abre los índices y carpetas disponibles en el Acervo.','exp','search']],
  };
  const content = [
    ...((resources[topic]??[]).map(([label,description,target,icon])=>[label,description,link(target),icon])),
    [routeTitle,routeText,[workflow,...(example?[examplePanel]:[])],topic==='organizacion'?'calendar':'route'],
    [docsTitle,docsText,[note,grid],'file'],
    ...(routeList ? [[detailTitle,detailText,[routeList,catalogueLink],topic==='defensa'?'law':topic==='organizacion'?'map':'tree']] : []),
    ['Publicaciones y fuentes oficiales','Enlaces al INE, a la autoridad local y a las referencias aplicables.',[official,sources],'sources'],
  ];
  panel.replaceChildren(renderSectionViews(content));
}
