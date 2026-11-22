(() => {
  const query = new URLSearchParams(location.search);
  const code = query.get('entidad');
  const topic = query.get('tema');
  const embedded = query.get('panel') === '1' && window.parent !== window;
  const aliases = {CAM: 'CAMP', TAM: 'TAMPS', TAMP: 'TAMPS'};
  const id = Number(Object.keys(EST).find(key => (aliases[EST[key]] ?? EST[key]) === code));
  const processes = new Set(Object.keys(processGuides));
  const panes = new Map([
    ['catalogo', 'b-eyo'], ['cobertura', 'b-eyo'], ['oficios', 'b-eyo'], ['primera', 'b-eyo'], ['segunda', 'b-eyo'], ['dictamen', 'b-eyo'],
    ['norm', 'b-norm'], ['ople', 'b-ople'], ['topes', 'b-topes'], ['exp', 'b-exp'], ['planes', 'b-ople'],
  ]);
  const sourceLink = (label, href) => {
    const a = document.createElement('a');
    a.className = 'btn-ghost';
    a.textContent = label;
    a.href = href;
    return a;
  };
  const index = './index.html?v=iconos-1';
  const from = processes.has(topic) ? topic : query.get('proceso');
  const topicHref = target => {
    const params = new URLSearchParams({entidad: code, tema: target, v: 'iconos-1'});
    if (processes.has(from) && !processes.has(target)) params.set('proceso', from);
    if (embedded) params.set('panel','1');
    return './consulta.html?' + params;
  };
  const setBackLinks = (back, backLabel) => {
    document.getElementById('detailBar').replaceChildren(
      sourceLink(backLabel, back), sourceLink('Volver al mapa', index),
    );
  };
  const contextTitle = (text, pane) => {
    const heading = document.createElement('h2');
    heading.textContent = text;
    heading.tabIndex = -1;
    pane.prepend(heading);
    if (!embedded) heading.focus({preventScroll: true});
  };
  if (topic === 'federal') {
    openFicha(DATA[0].code, false);
    goStep('detalle', 'b-eyo');
    const panel = document.getElementById('b-eyo');
    const federal = document.getElementById('eyoFederal');
    panel.replaceChildren(federal);
    contextTitle('Oficios del ámbito federal', panel);
    setBackLinks(index, 'Volver a Expedientes');
    return;
  }
  if (!id || (!panes.has(topic) && !processes.has(topic))) {
    location.replace(index);
    return;
  }
  openFicha(id, false);
  const block = panes.get(topic) ?? 'b-eyo';
  goStep('detalle', block);
  const panel = document.getElementById(block);
  const caseHref = index + '&' + new URLSearchParams({entidad: code});
  const name = DATA.find(row => row.code === id).name;
  if (processes.has(from) && !processes.has(topic)) setBackLinks(topicHref(from), 'Volver al proceso');
  else setBackLinks(caseHref, 'Volver a los procesos de ' + name);
  if (topic === 'catalogo') {
    renderProcessCatalogue(panel,code);
    contextTitle(name + ' · Catálogo de procesos', panel);
  } else if (topic === 'cobertura' || processes.has(topic)) {
    const state = DATA.find(row => row.code === id);
    renderStateCoverage(panel, {
      state,
      offices: EYO_UTF[id],
      dictamen: EYO_DIC[id],
      norms: NORM5[id],
      ople: OPLE8[id],
      plans: PLANES[id],
      limits: MONTOS[id] ?? {},
      cargos: CARGOS,
      recentDecisions: SENT02[id],
      historicalDecisions: SENT03[id],
      link: topicHref,
      code,
    }, topic);
    if (topic === 'sancionadores') attachComplaintDesk(panel, code);
    contextTitle(name + ' · ' + (processes.has(topic) ? processGuides[topic].title : 'Documentos por proceso'), panel);
  } else if (topic === 'oficios') {
    panel.replaceChildren(renderSectionViews([
      ['Primera vuelta','Oficio inicial de la UTF para el Informe Anual 2025.',topicHref('primera'),'first'],
      ['Segunda vuelta','Segundo oficio de la UTF para el mismo ejercicio.',topicHref('segunda'),'second'],
      ['Dictamen consolidado','Consulta el dictamen de la entidad y su disponibilidad en el acervo.',topicHref('dictamen'),'check'],
    ]));
    contextTitle(name + ' · Errores y Omisiones', panel);
  } else if (['primera','segunda','dictamen'].includes(topic)) {
    const rounds = ['primera','segunda','dictamen'];
    const n = rounds.indexOf(topic);
    const rows = [...document.getElementById('eyoContent').children];
    panel.replaceChildren(rows[n*2], rows[n*2+1]);
    contextTitle(name + ' · Errores y Omisiones', panel);
    setBackLinks(topicHref('oficios'), 'Volver a Errores y Omisiones');
  } else if (topic === 'planes') {
    const plans = document.getElementById('oplePlanes');
    panel.replaceChildren(plans);
    contextTitle(name + ' · Planes 2026–2027', panel);
  } else {
    if (topic === 'exp') document.getElementById('expForm')?.remove();
    contextTitle(name, panel);
  }
  if (embedded) {
    const content = document.createElement('main');
    content.id = 'djf-section-content';
    content.setAttribute('aria-label','Contenido de la sección');
    if (!processes.has(topic)) {
      const back = document.querySelector('#detailBar a');
      if (back) {
        if (!new URL(back.href).searchParams.has('panel')) back.target = '_top';
        content.append(back);
      }
    }
    content.append(panel);
    for (const link of content.querySelectorAll('a[href]')) {
      const target = new URL(link.href);
      if (target.pathname.endsWith('/mesa.html')) {
        target.searchParams.set('panel','1');
        target.searchParams.set('v','iconos-1');
        link.href = target.href;
      }
    }
    document.body.append(content);
    document.body.classList.add('djf-embedded-section');
    document.body.dataset.sectionTopic=topic;
    observeSectionHeight(content);
  }
})();
