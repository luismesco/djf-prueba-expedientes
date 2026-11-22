function renderStateCoverage(panel, data) {
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
    ['Jornada, resultados e impugnaciones', [
      ['Jornada, cómputos y validez', pending, 'Actas y cómputos por demarcación, resultados definitivos, declaración de validez, constancias o asignaciones y ajustes posteriores.'],
      ['Medios de impugnación y criterios', recentDecisions && historicalDecisions ? 'Dos periodos enlazados' : recentDecisions || historicalDecisions ? 'Un periodo enlazado' : 'Sin carpeta local enlazada', 'Identificar folio, acto impugnado, autoridad, resolución, efectos y cumplimiento. Consultar sentencias locales, federales y jurisprudencia.', 'exp'],
    ]],
    ['Fiscalización del Informe Anual 2025', [
      ['Informe presentado', pending, 'Informe, acuse, anexos y respaldo contable del sujeto obligado.'],
      ['Primera vuelta', linked(offices?.v1), 'Oficio y notificación, observaciones, respuesta, acuse y anexos. El enlace de esta ficha corresponde al oficio.', 'primera'],
      ['Segunda vuelta', linked(offices?.v2), 'Oficio y notificación, respuesta, acuse, anexos y relación de numerales con primera vuelta. El enlace corresponde al oficio.', 'segunda'],
      ['Dictamen consolidado', linked(dictamen), 'Dictamen y anexos. Identificar conclusión, respuesta valorada, conducta y monto involucrado.', 'dictamen'],
      ['Resolución y seguimiento', pending, 'Resolución del Consejo General, efectos por conclusión, impugnación si existe y determinación de cumplimiento.'],
    ]],
  ];
  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const note = element('p', 'Cobertura de enlaces del acervo al 20 de noviembre de 2026. Una carpeta enlazada acredita su disponibilidad en el índice. «Por cotejar» indica que la presencia del documento específico sigue pendiente de confirmar.');
  const grid = element('div', '', 'coverage-grid');
  for (const [title, entries] of rows) {
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
  for (const [title, url] of [
    ['INE · Calendario y etapas locales', 'https://ine.mx/voto-y-elecciones/elecciones-locales-2026/elecciones-locales-2026-etapas/'],
    ['INE · Actividades federales 2026–2027', 'https://ine.mx/voto-y-elecciones/elecciones-2027/actividades-2027/'],
    ['INE · Dictamen y resolución', 'https://repositoriodocumental.ine.mx/xmlui/handle/123456789/166167'],
    ['TEPJF · Ejemplo de impugnación, SUP-RAP-80/2021', 'https://www.te.gob.mx/media/SentenciasN/pdf/Superior/SUP-RAP-0080-2021.pdf'],
  ]) {
    const anchor = element('a',title);
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    sources.append(anchor);
  }
  panel.replaceChildren(note, grid, sources);
}
