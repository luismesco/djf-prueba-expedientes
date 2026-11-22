(() => {
  const query=new URLSearchParams(location.search);
  if (query.get('panel')!=='1'||window.parent===window) return;
  const content=document.getElementById('contenido-principal');
  document.body.classList.add('djf-embedded-mesa');
  for(const link of content.querySelectorAll('a[href]')){
    const url=new URL(link.href);
    if(url.pathname.endsWith('/consulta.html')){
      url.searchParams.set('panel','1');
      link.href=url.href;
    }
  }
  observeSectionHeight(content);
})();
