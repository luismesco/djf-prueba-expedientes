function attachComplaintDesk(panel, state) {
  const key = 'djf-quejas-demo-v1:' + state;
  const today = new Date();
  const iso = date => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
  const localDate = date => new Date(date+'T12:00:00');
  const format = date => date ? localDate(date).toLocaleDateString('es-MX', {day:'numeric',month:'long',year:'numeric'}) : '';
  const addDays = count => iso(new Date(today.getFullYear(),today.getMonth(),today.getDate()+count));
  let entries;
  try { entries = JSON.parse(localStorage.getItem(key)); } catch { entries = null; }
  if (!Array.isArray(entries)) entries = [
    {id:'muestra-1',folio:'DEMO-01',subject:'Requerimiento de información',received:addDays(0),due:addDays(3),time:'18:00',read:false,done:false,source:'Fecha de muestra'},
    {id:'muestra-2',folio:'DEMO-02',subject:'Acuerdo de trámite',received:addDays(-1),due:'',time:'',read:false,done:false,source:'Notificación de muestra'},
  ];
  let month = new Date(today.getFullYear(),today.getMonth(),1);
  let selectedDay = '';
  const desk = document.createElement('section');
  desk.className = 'complaint-desk';
  desk.setAttribute('aria-label','Seguimiento de quejas y procedimientos');
  desk.innerHTML = `
    <p class="complaint-note">Maqueta de seguimiento. Los registros se guardan en este navegador. Captura la fecha de vencimiento previamente verificada.</p>
    <p class="complaint-feedback" role="status"></p>
    <div data-desk-panel="notices">
      <h3 id="complaint-notices-title" tabindex="-1">Notificaciones</h3>
      <details class="complaint-editor">
        <summary>Registrar notificación</summary>
        <form class="complaint-form" autocomplete="off">
          <label>Folio<input name="folio" required maxlength="60" placeholder="DEMO-03"></label>
          <label>Asunto<input name="subject" required maxlength="120"></label>
          <label>Fecha de notificación<input type="date" name="received" required value="${iso(today)}"></label>
          <label>Fecha de vencimiento <small>opcional</small><input type="date" name="due"></label>
          <label>Hora de vencimiento <small>opcional</small><input type="time" name="time"></label>
          <label>Referencia de la constancia <small>opcional</small><input name="source" maxlength="120"></label>
          <button type="submit">Guardar notificación</button>
        </form>
      </details>
      <div class="complaint-notices"></div>
    </div>
    <div data-desk-panel="calendar" hidden>
      <h3 id="complaint-calendar-title" tabindex="-1">Calendario de vencimientos</h3>
      <div class="complaint-month">
        <button type="button" data-month="-1" aria-label="Mes anterior">←</button>
        <p aria-live="polite" class="complaint-month-name"></p>
        <button type="button" data-month="1" aria-label="Mes siguiente">→</button>
      </div>
      <table class="complaint-calendar" aria-label="Vencimientos por día">
        <thead><tr>${['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map(day=>'<th scope="col">'+day+'</th>').join('')}</tr></thead>
        <tbody></tbody>
      </table>
      <button type="button" class="complaint-all-days" hidden>Mostrar todo el mes</button>
      <div class="complaint-due"></div>
    </div>`;
  const guide = [...panel.childNodes];
  const noticePanel = desk.querySelector('[data-desk-panel=notices]');
  const calendarContent = desk.querySelector('[data-desk-panel=calendar]');
  noticePanel.querySelector('h3').textContent='Bandeja de notificaciones';
  calendarContent.querySelector('h3').textContent='Vencimientos por día';
  calendarContent.hidden=false;
  const unreadLabel=document.createElement('p');
  unreadLabel.className='complaint-note';
  noticePanel.prepend(unreadLabel);
  desk.append(renderSectionViews([
    ['Notificaciones recibidas','Consulta, registra y marca notificaciones como leídas.',[noticePanel]],
    ['Calendario de vencimientos','Consulta las fechas capturadas y el estado de atención por día.',[calendarContent]],
    ['Guía y documentos del procedimiento','Pasos, documentos, actuaciones ante la autoridad y publicaciones oficiales.',guide],
  ], new URLSearchParams(location.search).get('vista')==='calendario'?1:-1));
  panel.replaceChildren(desk);
  const notices = desk.querySelector('.complaint-notices');
  const dueList = desk.querySelector('.complaint-due');
  const form = desk.querySelector('form');
  const status = desk.querySelector('[role=status]');
  const dateLabel = entry => entry.due ? format(entry.due) + (entry.time ? ' · '+entry.time : '') : 'Sin vencimiento registrado';
  const calendarPanel = desk.querySelector('[data-desk-panel=calendar]');
  const element = (tag,text) => {
    const node = document.createElement(tag);
    if(text) node.textContent = text;
    return node;
  };
  function save(message) {
    try {
      localStorage.setItem(key,JSON.stringify(entries));
      status.textContent = message;
    } catch {
      status.textContent = 'Registro disponible en esta visita. El navegador no permitió guardar los cambios.';
    }
  }
  function row(entry, actions) {
    const item = element('article');
    item.className = 'complaint-entry';
    item.append(element('h4',entry.folio+' · '+entry.subject),element('p','Notificación del '+format(entry.received)));
    item.append(element('p',entry.due ? 'Vencimiento '+dateLabel(entry)+(entry.done ? ' · Atendido' : '') : dateLabel(entry)));
    if(entry.source) item.append(element('p',entry.source));
    if(actions) {
      const buttons = element('div');
      buttons.className = 'complaint-entry-actions';
      const read = element('button',entry.read ? 'Marcar como no leída' : 'Marcar como leída');
      read.type = 'button';
      read.dataset.action = 'read';
      read.dataset.entry = entry.id;
      buttons.append(read);
      if(entry.due){
        const done = element('button',entry.done ? 'Reabrir vencimiento' : 'Marcar vencimiento atendido');
        done.type = 'button';
        done.dataset.action = 'done';
        done.dataset.entry = entry.id;
        buttons.append(done);
      }
      item.append(buttons);
    }
    return item;
  }
  function renderNotices(){
    const unread = entries.filter(entry=>!entry.read).length;
    unreadLabel.textContent = unread ? unread+' sin leer' : 'Bandeja al día';
    notices.replaceChildren();
    for(const entry of [...entries].sort((a,b)=>b.received.localeCompare(a.received))){
      notices.append(row(entry,true));
    }
  }
  function renderCalendar(){
    const year = month.getFullYear(), number = month.getMonth();
    const firstDay = (month.getDay()+6)%7;
    const days = new Date(year,number+1,0).getDate();
    desk.querySelector('.complaint-month-name').textContent = month.toLocaleDateString('es-MX',{month:'long',year:'numeric'});
    const body = desk.querySelector('tbody');
    body.replaceChildren();
    const monthEntries = entries.filter(item=>item.due?.startsWith(iso(month).slice(0,7))).sort((a,b)=>(a.due+a.time).localeCompare(b.due+b.time));
    for(let start=0;start<firstDay+days;start+=7){
      const tr = element('tr');
      for(let offset=0;offset<7;offset++){
        const td = element('td');
        const day = start+offset-firstDay+1;
        if(day>=1&&day<=days){
          const date=iso(new Date(year,number,day));
          const records=monthEntries.filter(item=>item.due===date);
          if(records.length){
            const button=element('button',String(day));
            button.type='button';
            button.dataset.day=date;
            button.setAttribute('aria-label',format(date)+', '+records.length+(records.length===1?' vencimiento':' vencimientos'));
            button.setAttribute('aria-pressed',String(selectedDay===date));
            td.append(button);
          }else td.textContent=day;
          if(date===iso(today))td.setAttribute('aria-current','date');
        }
        tr.append(td);
      }
      body.append(tr);
    }
    desk.querySelector('.complaint-all-days').hidden=!selectedDay;
    const visible=selectedDay ? monthEntries.filter(item=>item.due===selectedDay) : monthEntries;
    dueList.replaceChildren(element('h4',selectedDay ? 'Vencimientos del '+format(selectedDay) : 'Vencimientos del mes'));
    if(!visible.length)dueList.append(element('p','Sin vencimientos registrados para este periodo.'));
    else for(const item of visible) dueList.append(row(item,false));
  }
  form.addEventListener('submit', event=>{
    event.preventDefault();
    const fields = new FormData(form);
    const entry = {id:crypto.randomUUID(),read:false,done:false};
    for(const name of ['folio','subject','received','due','time','source'])entry[name]=String(fields.get(name)??'').trim();
    if(!entry.folio || !entry.subject){
      status.textContent='Escribe un folio y un asunto.';
      return;
    }
    if(entry.time&&!entry.due){status.textContent='Captura la fecha junto con la hora de vencimiento.';return;}
    entries.unshift(entry);
    if(entry.due){
      month=localDate(entry.due);
      month.setDate(1);
      selectedDay='';
    }
    save('Notificación registrada.'+(entry.due?' El vencimiento está en el calendario.':''));
    form.reset();
    form.closest('details').open=false;
    renderNotices();
    renderCalendar();
    desk.querySelector('#complaint-notices-title').focus();
  });
  desk.addEventListener('click', event=>{
    const button=event.target.closest('button');
    if(!button) return;
    if(button.dataset.month){
      month=new Date(month.getFullYear(),month.getMonth()+Number(button.dataset.month),1);
      selectedDay='';
      renderCalendar();
    }
    if(button.dataset.day){
      selectedDay=button.dataset.day;
      renderCalendar();
      dueList.querySelector('h4').tabIndex=-1;
      dueList.querySelector('h4').focus();
    }
    if(button.matches('.complaint-all-days')){
      selectedDay='';
      renderCalendar();
      calendarPanel.querySelector('h3').focus();
    }
    const entry=entries.find(item=>item.id===button.dataset.entry);
    if(entry&&['read','done'].includes(button.dataset.action)){
      const action=button.dataset.action;
      entry[action]=!entry[action];
      save(action==='read'?'Estado de lectura actualizado.':'Estado del vencimiento actualizado.');
      renderNotices();
      renderCalendar();
      notices.querySelectorAll('button[data-entry]').forEach(item=>{
        if(item.dataset.entry===entry.id&&item.dataset.action===action)item.focus();
      });
    }
  });
  renderNotices();
  renderCalendar();
}
