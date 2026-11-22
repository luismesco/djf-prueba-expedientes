const processGuides = {
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
    workflow.append(element('h3', 'Cómo se trabaja'));
    const steps = element('ol');
    for (const [title, description] of guide.steps) {
      const step = element('li');
      step.append(element('strong', title), element('p', description));
      steps.append(step);
    }
    workflow.append(steps, element('h3', 'Resultado del proceso'), element('p', guide.outcome));
    if (topic === 'anual') {
      const officeLink = element('a', 'Consultar Errores y Omisiones');
      officeLink.href = link('oficios');
      workflow.append(officeLink);
      if (data.code === 'QROO') {
        const deskLink = element('a', 'Abrir Mesa de análisis de muestra');
        deskLink.href = './mesa.html';
        workflow.append(deskLink);
      }
    }
  }
  const grid = element('div', '', 'coverage-grid');
  for (const [title, entries] of sections[topic] ?? rows) {
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
    grid.append(section);
  }
  const sources = element('div', '', 'coverage-sources');
  for (const [title, url] of (guide?.sources ?? [
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
  panel.replaceChildren(...(guide ? [workflow, element('h3', 'Documentos y cobertura')] : []), note, grid, sources);
}
