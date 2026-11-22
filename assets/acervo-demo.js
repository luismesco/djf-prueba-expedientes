(() => {
  const query = new URLSearchParams(location.search);
  const code = query.get('entidad');
  const topic = query.get('tema');
  const aliases = {CAM: 'CAMP', TAM: 'TAMPS', TAMP: 'TAMPS'};
  const id = Number(Object.keys(EST).find(key => (aliases[EST[key]] ?? EST[key]) === code));
  const processes = new Set(Object.keys(processGuides));
  const panes = new Map([
    ['cobertura', 'b-eyo'], ['oficios', 'b-eyo'], ['primera', 'b-eyo'], ['segunda', 'b-eyo'], ['dictamen', 'b-eyo'],
    ['norm', 'b-norm'], ['ople', 'b-ople'], ['topes', 'b-topes'], ['exp', 'b-exp'], ['planes', 'b-ople'],
  ]);
  const sourceLink = (label, href) => {
    const a = document.createElement('a');
    a.className = 'btn-ghost';
    a.textContent = label;
    a.href = href;
    return a;
  };
  const index = './index.html?v=ocupaciones-1';
  const from = processes.has(topic) ? topic : query.get('proceso');
  const topicHref = target => {
    const params = new URLSearchParams({entidad: code, tema: target, v: 'ocupaciones-1'});
    if (processes.has(from) && !processes.has(target)) params.set('proceso', from);
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
    heading.focus({preventScroll: true});
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
  if (topic === 'cobertura' || processes.has(topic)) {
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
    const choices = document.createElement('nav');
    choices.className = 'chips';
    choices.setAttribute('aria-label', 'Oficios por vuelta');
    for (const [key,label] of [['primera','Primera vuelta'],['segunda','Segunda vuelta'],['dictamen','Dictamen consolidado']]) {
      choices.append(sourceLink(label, topicHref(key)));
    }
    panel.replaceChildren(choices);
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
})();
