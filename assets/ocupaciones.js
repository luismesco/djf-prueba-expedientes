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
  const assigned = new Set();
  const order = Object.fromEntries(groupIds.map(group=>{
    const saved = stored.order?.[group];
    const ids = (Array.isArray(saved)?saved:[]).filter(id=>{
      if(!cards.has(id)||assigned.has(id))return false;
      assigned.add(id);
      return true;
    });
    return [group,ids];
  }));
  for(const group of groupIds)order[group].push(...defaults[group].filter(id=>!assigned.has(id)));
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
    const handle = document.createElement('span');
    handle.className = 'work-drag-handle';
    handle.dataset.drag = group?'group':'card';
    handle.setAttribute('aria-hidden','true');
    handle.textContent = '⠿';
    controls.append(handle);
    if (!group) {
      const isPinned = pinned.includes(target);
      controls.append(button('pin',(isPinned?'Desanclar ':'Anclar ')+title,isPinned?'Desanclar':'Anclar'));
      const destination = document.createElement('select');
      destination.dataset.workDestination = target;
      destination.setAttribute('aria-label','Mover '+title+' a');
      for(const [value,text] of [['','Mover a…'],['pinned','Anclados'],...groups.map(item=>[item.dataset.group,item.querySelector('h4').textContent])]){
        destination.append(new Option(text,value));
      }
      controls.append(destination);
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
        const destination = controls.querySelector('select');
        destination.value = '';
        destination.querySelectorAll('option').forEach(option=>{option.disabled=option.value===name;});
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
  function insert(items,id,target,after) {
    const from = items.indexOf(id);
    if(from>=0)items.splice(from,1);
    const position = items.indexOf(target);
    items.splice(position<0?items.length:position+Number(after),0,id);
  }
  function placeCard(id,destination,target,after=false) {
    if(destination==='pinned') {
      insert(pinned,id,target,after);
      return;
    }
    const oldGroup=groupIds.find(group=>order[group].includes(id));
    const pinnedAt=pinned.indexOf(id);
    if(pinnedAt>=0)pinned.splice(pinnedAt,1);
    if(oldGroup!==destination)order[oldGroup].splice(order[oldGroup].indexOf(id),1);
    insert(order[destination],id,target,after);
  }
  root.addEventListener('change',event=>{
    const field=event.target.closest('select[data-work-destination]');
    if(!editing||!field||!lists.has(field.value))return;
    placeCard(field.dataset.workDestination,field.value);
    save('Acceso movido.');
    render();
    field.focus();
  });

  let drag = null;
  function clearDrop() {
    root.querySelectorAll('.work-drop,.work-drop-after').forEach(node=>node.classList.remove('work-drop','work-drop-after'));
  }
  function dropTarget(x,y) {
    const hit=document.elementFromPoint(x,y);
    const group=hit?.closest('[data-group]');
    const card=hit?.closest('[data-access]');
    if(drag.kind==='group'){
      if(!group||group===drag.source)return null;
      const bounds=group.getBoundingClientRect();
      return {node:group,id:group.dataset.group,after:y>bounds.top+bounds.height/2};
    }
    if(card===drag.source)return null;
    const list=hit?.closest('[data-list]')??(group?lists.get(group.dataset.group):hit?.closest('#work-pins')?lists.get('pinned'):null);
    if(!list)return null;
    const bounds=card?.getBoundingClientRect();
    return {node:card??list,id:card?.dataset.access,list:list.dataset.list,after:!!bounds&&y>bounds.top+bounds.height/2};
  }
  function showDrop() {
    clearDrop();
    drag.target=dropTarget(drag.x,drag.y);
    if(drag.target)drag.target.node.classList.add(drag.target.after?'work-drop-after':'work-drop');
  }
  function scrollFrame() {
    if(!drag?.active)return;
    const edge=68;
    const speed=drag.y<edge?-12:drag.y>innerHeight-edge?12:0;
    if(speed){window.scrollBy(0,speed);showDrop();}
    drag.frame=requestAnimationFrame(scrollFrame);
  }
  root.addEventListener('pointerdown',event=>{
    const handle=event.target.closest('[data-drag]');
    if(!editing||!handle||!event.isPrimary||event.button!==0)return;
    const kind=handle.dataset.drag;
    const source=handle.closest(kind==='group'?'[data-group]':'[data-access]');
    drag={kind,source,id:kind==='group'?source.dataset.group:source.dataset.access,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,pointer:event.pointerId,active:false};
    handle.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove',event=>{
    if(!drag||event.pointerId!==drag.pointer)return;
    drag.x=event.clientX;
    drag.y=event.clientY;
    if(!drag.active){
      if(Math.hypot(drag.x-drag.startX,drag.y-drag.startY)<5)return;
      drag.active=true;
      drag.source.classList.add('work-dragging');
      drag.frame=requestAnimationFrame(scrollFrame);
    }
    showDrop();
  });
  function finishDrag(event,apply) {
    if(!drag||event.pointerId!==drag.pointer)return;
    const {kind,id,source,target,frame}=drag;
    drag=null;
    cancelAnimationFrame(frame);
    clearDrop();
    source.classList.remove('work-dragging');
    if(!apply||!target)return;
    if(kind==='group')insert(groupOrder,id,target.id,target.after);
    else placeCard(id,target.list,target.id,target.after);
    save('Orden actualizado.');
    render();
  }
  root.addEventListener('pointerup',event=>finishDrag(event,true));
  root.addEventListener('pointercancel',event=>finishDrag(event,false));
  root.addEventListener('lostpointercapture',event=>finishDrag(event,false));

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
