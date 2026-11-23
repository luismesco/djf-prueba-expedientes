(() => {
  const access = document.getElementById('work-access');
  const panel = document.getElementById('work-section');
  const frame = document.getElementById('work-section-frame');
  const heading = document.getElementById('work-section-title');
  const close = document.getElementById('work-close-section');
  const full = document.getElementById('work-full-section');
  const loading = document.getElementById('work-section-loading');
  const cards = new Map([...access.querySelectorAll('[data-access]')].map(card=>[card.dataset.access,card]));
  let active = '';
  let currentSrc = '';

  function sync(focus=false) {
    const url = new URL(location.href);
    const id = url.searchParams.get('seccion');
    const state = url.searchParams.get('entidad');
    const card = cards.get(id);
    if (!card || !state || access.closest('#demo-options').hidden) {
      const previous = cards.get(active)?.querySelector('a[data-topic]');
      active = '';
      currentSrc = '';
      document.dispatchEvent(new CustomEvent('djf:tool-context',{detail:{topic:'',phase:''}}));
      panel.hidden = true;
      access.hidden = false;
      frame.removeAttribute('src');
      if (focus && previous) previous.focus();
      return;
    }
    active = id;
    const link = card.querySelector('a[data-topic]');
    const target = new URL(link.href);
    if(id==='sancionadores'&&url.searchParams.get('vista')==='notificaciones')target.searchParams.set('vista','notificaciones');
    full.href = target.href;
    target.searchParams.set('panel','1');
    url.searchParams.delete('seccion');
    url.searchParams.delete('vista');
    close.href = url.href;
    heading.textContent = card.querySelector('strong').textContent;
    frame.title = heading.textContent + ' · ' + document.getElementById('demo-entity').textContent;
    access.hidden = true;
    panel.hidden = false;
    if (target.href !== currentSrc) {
      currentSrc = target.href;
      document.dispatchEvent(new CustomEvent('djf:tool-context',{detail:{topic:target.searchParams.get('tema'),phase:''}}));
      frame.style.height = '320px';
      loading.hidden = false;
      frame.src = currentSrc;
    }
    if (focus) heading.focus();
  }
  function select(id) {
    const url = new URL(location.href);
    url.searchParams.delete('vista');
    if (id) url.searchParams.set('seccion',id);
    else url.searchParams.delete('seccion');
    history.pushState(null,'',url);
    sync(true);
  }
  access.addEventListener('click',event=>{
    const link=event.target.closest('.work-card > a[data-topic]');
    if(!link||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
    if(access.classList.contains('work-editing')) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    select(link.closest('[data-access]').dataset.access);
  });
  close.addEventListener('click',event=>{
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
    event.preventDefault();
    select(null);
  });
  frame.addEventListener('load',()=>{if(active)loading.hidden=true;});
  window.addEventListener('message',event=>{
    if(!active||event.source!==frame.contentWindow||event.origin!==(location.protocol==='file:'?'null':location.origin))return;
    if(event.data?.type!=='djf-section-height'||!Number.isFinite(event.data.height))return;
    frame.style.height=Math.max(320,Math.min(20000,event.data.height+4))+'px';
    loading.hidden=true;
  });
  document.addEventListener('djf:entidad',()=>sync());
  sync();
})();
