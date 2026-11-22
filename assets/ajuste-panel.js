function observeSectionHeight(content) {
  const notify = () => {
    const height = Math.ceil(content.getBoundingClientRect().height);
    window.parent.postMessage({type:'djf-section-height',height},location.origin === 'null' ? '*' : location.origin);
  };
  new ResizeObserver(notify).observe(content);
  notify();
}
