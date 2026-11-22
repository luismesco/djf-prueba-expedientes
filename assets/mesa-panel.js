(() => {
  const query=new URLSearchParams(location.search);
  const embedded=query.get('panel')==='1'&&window.parent!==window;
  const content=document.getElementById('contenido-principal');
  if(embedded)document.body.classList.add('djf-embedded-mesa');
  for(const link of content.querySelectorAll('a[href]')){
    const url=new URL(link.href);
    if(url.pathname.endsWith('/consulta.html')){
      const params=Object.fromEntries(url.searchParams);
      delete params.v;
      link.href=djfUrl('consulta',{...params,panel:embedded?'1':null});
    }
  }
  if(embedded)observeSectionHeight(content);
})();
