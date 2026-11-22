function observeSectionHeight(content) {
  const notify = () => {
    const height = Math.ceil(content.getBoundingClientRect().height);
    window.parent.postMessage({type:'djf-section-height',height},location.protocol === 'file:' ? '*' : location.origin);
  };
  new ResizeObserver(notify).observe(content);
  notify();
}

function announceToolContext(topic, phase = '', phaseKey = '') {
  const title=processGuides[topic]?.title ?? (topic==='oficios'?'Errores y Omisiones':'');
  const message={type:'djf-tool-context',topic,phase,phaseKey,title};
  if(window.parent===window)document.dispatchEvent(new CustomEvent('djf:tool-context',{detail:message}));
  else window.parent.postMessage(message,location.protocol==='file:'?'*':location.origin);
}
