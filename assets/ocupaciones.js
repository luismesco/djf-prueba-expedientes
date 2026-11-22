(() => {
  const root = document.getElementById('work-access');
  const customize = document.getElementById('work-customize');
  const groupsRoot = document.getElementById('work-groups');
  const pinsRoot = document.getElementById('work-pins');
  const emptyPins = document.getElementById('work-no-pins');
  const editHint = document.getElementById('work-edit-hint');
  const feedback = document.getElementById('work-feedback');
  const groups = [...groupsRoot.querySelectorAll('[data-group]')];
  const groupIds = groups.map(group => group.dataset.group);
  const lists = new Map([...root.querySelectorAll('[data-list]')].map(list=>[list.dataset.list,list]));
  const cards = new Map([...root.querySelectorAll('[data-access]')].map(card=>[card.dataset.access,card]));
  const defaults = Object.fromEntries(groupIds.map(group=>[group,[...lists.get(group).children].map(card=>card.dataset.access)]));
  const storageKey = 'djf-accesos-ocupaciones-v1';
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(storageKey)) ?? {}; } catch {}
  const ordered = (saved, allowed) => {
    const valid = Array.isArray(saved) ? saved.filter(id=>allowed.includes(id)) : [];
    return [...new Set([...valid,...allowed])];
  };
  const groupOrder = ordered(stored.groups,groupIds);
  const order = Object.fromEntries(groupIds.map(group=>[group,ordered(stored.order?.[group],defaults[group])]));
  const pinned = Array.isArray(stored.pinned) ? [...new Set(stored.pinned.filter(id=>cards.has(id)))] : [];
  let editing = false;

  function button(action, label, text) {
    const control = document.createElement('button');
    control.type = 'button';
    control.textContent = text;
    control.dataset.workAction = action;
    control.setAttribute('aria-label',label);
    return control;
  }
  function actions(host, target, title, group = false) {
    const controls = document.createElement('div');
    controls.className = 'work-actions';
    controls.dataset.target = target;
    if (!group) {
      const isPinned = pinned.includes(target);
      controls.append(button('pin',(isPinned?'Desanclar ':'Anclar ')+title,isPinned?'Desanclar':'Anclar'));
    }
    controls.append(button('up','Subir '+title,'↑'),button('down','Bajar '+title,'↓'));
    host.append(controls);
  }
  groups.forEach(group=>actions(group.querySelector('.work-group-head'),group.dataset.group,group.querySelector('h4').textContent,true));
  cards.forEach((card,id)=>actions(card,id,card.querySelector('strong').textContent));

  function updateMoves(controls, index, count) {
    // Keep boundary controls focusable so reordering preserves the user's focus.
    controls.querySelector('[data-work-action=up]').setAttribute('aria-disabled',String(index===0));
    controls.querySelector('[data-work-action=down]').setAttribute('aria-disabled',String(index===count-1));
  }
  function render() {
    root.classList.toggle('work-editing',editing);
    customize.setAttribute('aria-pressed',String(editing));
    customize.textContent = editing?'Listo':'Personalizar';
    editHint.hidden=!editing;
    pinsRoot.hidden=!pinned.length&&!editing;
    emptyPins.hidden=pinned.length>0;
    const visible = {pinned};
    for (const group of groupIds) visible[group]=order[group].filter(id=>!pinned.includes(id));
    for (const [name,list] of lists) {
      visible[name].forEach((id,index)=>{
        const card=cards.get(id);
        list.append(card);
        const controls=card.querySelector('.work-actions');
        const pin=controls.querySelector('[data-work-action=pin]');
        pin.textContent=name==='pinned'?'Desanclar':'Anclar';
        pin.setAttribute('aria-label',pin.textContent+' '+card.querySelector('strong').textContent);
        updateMoves(controls,index,visible[name].length);
      });
    }
    for (const [index,id] of groupOrder.entries()) {
      const group=groups.find(item=>item.dataset.group===id);
      groupsRoot.append(group);
      group.hidden=!editing&&!visible[id].length;
      updateMoves(group.querySelector('.work-actions'),index,groupOrder.length);
    }
  }
  function save(message) {
    try {
      localStorage.setItem(storageKey,JSON.stringify({groups:groupOrder,order,pinned}));
      feedback.textContent=message;
    } catch {
      feedback.textContent='Los cambios se aplicaron en esta visita. El navegador no permitió guardarlos.';
    }
  }
  function move(items,id,action) {
    const index=items.indexOf(id);
    const next=index+(action==='up'?-1:1);
    if(index<0||next<0||next>=items.length)return;
    [items[index],items[next]]=[items[next],items[index]];
  }
  customize.addEventListener('click',()=>{
    editing=!editing;
    render();
  });
  root.addEventListener('click',event=>{
    const control=event.target.closest('button[data-work-action]');
    if(!editing||!control||control.getAttribute('aria-disabled')==='true')return;
    const action=control.dataset.workAction;
    const id=control.closest('[data-target]').dataset.target;
    const card=control.closest('[data-access]');
    if(action==='pin'){
      const index=pinned.indexOf(id);
      if(index>=0)pinned.splice(index,1);
      else pinned.push(id);
      save((index>=0?'Desanclado: ':'Anclado: ')+card.querySelector('strong').textContent);
    }else{
      if(!card)move(groupOrder,id,action);
      else if(pinned.includes(id))move(pinned,id,action);
      else {
        const group=card.parentElement.dataset.list;
        const items=order[group].filter(item=>!pinned.includes(item));
        move(items,id,action);
        order[group]=order[group].map(item=>pinned.includes(item)?item:items.shift());
      }
      save('Orden actualizado.');
    }
    render();
    control.focus();
  });
  render();
})();
