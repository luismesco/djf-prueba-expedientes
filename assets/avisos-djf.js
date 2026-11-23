function djfDate(offset=0) {
  const now=new Date();
  now.setDate(now.getDate()+offset);
  return [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
}

function djfNoticeKey(state) {
  return 'djf-quejas-demo-v1:'+state;
}

function djfNotices(state) {
  try {
    const entries=JSON.parse(localStorage.getItem(djfNoticeKey(state)));
    if(Array.isArray(entries))return entries;
  } catch {}
  return [
    {id:'muestra-1',folio:'DEMO-01',subject:'Requerimiento de información',received:djfDate(),due:djfDate(3),time:'18:00',read:false,done:false,source:'Fecha de muestra'},
    {id:'muestra-2',folio:'DEMO-02',subject:'Acuerdo de trámite',received:djfDate(-1),due:'',time:'',read:false,done:false,source:'Notificación de muestra'},
  ];
}

(() => {
  const banner=document.getElementById('djf-notice-banner');
  if(!banner)return;
  const summary=banner.querySelector('strong');
  const detail=banner.querySelector('.djf-notice-detail');
  function update(){
    const state=new URLSearchParams(location.search).get('entidad');
    banner.hidden=!state;
    if(!state)return;
    const entries=djfNotices(state);
    const unread=entries.filter(entry=>!entry.read).length;
    const due=entries.filter(entry=>entry.due&&!entry.done).sort((a,b)=>a.due.localeCompare(b.due)||(a.time||'').localeCompare(b.time||''));
    summary.textContent=unread===1?'1 notificación sin leer':unread?unread+' notificaciones sin leer':'Notificaciones y plazos';
    const first=due[0];
    if(first){
      const date=new Date(first.due+'T12:00:00').toLocaleDateString('es-MX',{day:'numeric',month:'short'});
      detail.textContent=(first.due<djfDate()?'Vencido':'Próximo vencimiento')+' · '+first.folio+' · '+date+(first.time?' · '+first.time:'');
    }else detail.textContent='Sin vencimientos pendientes';
    banner.querySelector('[data-inbox]').href=djfUrl('index',{entidad:state,seccion:'sancionadores',vista:'notificaciones'});
    banner.querySelector('[data-calendar]').href=djfUrl('index',{entidad:state,seccion:'calendario'});
  }
  document.addEventListener('djf:entidad',update);
  window.addEventListener('popstate',update);
  window.addEventListener('pageshow',update);
  window.addEventListener('storage',event=>{
    if(!event.key||event.key.startsWith('djf-quejas-demo-v1:'))update();
  });
  update();
})();
