(() => {
  if(window.parent!==window)return;
  const djf='https://analisiseyodjf.up.railway.app';
  const iconPaths={
    close:'M6 6l12 12M18 6 6 18',
    toolbox:'M4 8h16v12H4z M9 8V5h6v3 M4 13h16m-11 0v3m6-3v3',
    morenai:'M4 5h16v11H8l-4 4z M9 10h6m-6 3h4',
    audio:'M4 10v4m4-8v12m4-15v18m4-15v12m4-8v4',
    oficio:'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6m-6 4h6',
    comparar:'M4 4h6v16H4z M14 4h6v16h-6z M7 9h1m-1 4h1m9-4h1m-1 4h1',
    pruebas:'M5 4h14v16H5z M8 8h8m-8 4h8m-8 4h8m-5-8v8',
    plazos:'M6 5h12v16H6z M9 3v4m6-4v4M6 10h12 M12 12v4l2 1',
    jurisprudencia:'M15 15l4 4m-9-3a6 6 0 1 1 0-12 6 6 0 0 1 0 12z',
    fuentes:'M4 5h10l4 4v11H4zM14 5v4h4M8 12h6m-6 4h6',
    normas:'M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1zm0 0v14',
  };
  const icon=key=>'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="'+iconPaths[key]+'" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const catalog=[
    ['morenai','MorenAI'],
    ['audio','Transcripción de audio'],
    ['oficio','Generar oficio'],
    ['comparar','Comparar versiones'],
    ['pruebas','Matriz probatoria'],
    ['plazos','Notificaciones y plazos'],
    ['jurisprudencia','Sentencias y jurisprudencia'],
    ['normas','Normativa y OPLE'],
    ['fuentes','Fuentes oficiales y formatos'],
  ];
  const dialog=document.createElement('dialog');
  dialog.className='djf-tools-dialog';
  dialog.setAttribute('aria-labelledby','djf-tools-title');
  dialog.innerHTML='<div class="djf-tools-head"><h2 id="djf-tools-title">Herramientas</h2><button type="button" data-close aria-label="Cerrar herramientas">'+icon('close')+'</button></div><p class="djf-tool-state"></p><section class="djf-tools-context" hidden><h3>Para este apartado</h3><div class="djf-tools-grid"></div></section><details class="djf-tools-list"><summary>Más herramientas</summary><div class="djf-tools-grid"></div></details><section class="djf-tool-pane" hidden></section>';
  const launch=document.createElement('button');
  launch.type='button';
  launch.className='djf-tools-launch';
  launch.setAttribute('aria-haspopup','dialog');
  launch.innerHTML=icon('toolbox')+'<span>Herramientas</span>';
  document.body.append(launch,dialog);
  const related=dialog.querySelector('.djf-tools-context');
  const recommended=related.querySelector('.djf-tools-grid');
  const list=dialog.querySelector('.djf-tools-list');
  const grid=list.querySelector('.djf-tools-grid');
  const toolButtons=new Map();
  const contextByTopic={
    defensa:['jurisprudencia','pruebas','plazos'],
    sancionadores:['plazos','pruebas','jurisprudencia'],
    anual:['comparar','pruebas','fuentes'],
    fiscalizacion:['comparar','normas','fuentes'],
    oficios:['fuentes','comparar','pruebas','plazos'],
    organizacion:['normas','fuentes'],
    extraordinaria:['normas','fuentes'],
    judicial:['normas','jurisprudencia','fuentes'],
    participacion:['normas','fuentes'],
    partido:['normas','oficio','fuentes'],
    dictamen:['jurisprudencia','comparar','pruebas'],
  };
  const contextByPhase={
    anual:{
      informe:['comparar','pruebas','fuentes'],
      primera:['comparar','pruebas','plazos'],
      segunda:['comparar','pruebas','plazos'],
      dictamen:['comparar','jurisprudencia','pruebas'],
      defensa:['jurisprudencia','pruebas','plazos'],
    },
    fiscalizacion:{
      preparacion:['normas','fuentes'],
      precampana:['normas','pruebas','fuentes'],
      campana:['normas','comparar','fuentes'],
      revision:['comparar','pruebas','plazos'],
      dictamen:['jurisprudencia','comparar','pruebas'],
      defensa:['jurisprudencia','pruebas','plazos'],
    },
    organizacion:{
      registro:['normas','fuentes','pruebas'],
      jornada:['pruebas','fuentes'],
      computos:['fuentes','normas','pruebas'],
      cierre:['jurisprudencia','fuentes','plazos'],
    },
    defensa:{
      acto:['plazos','jurisprudencia','pruebas'],
      promocion:['jurisprudencia','pruebas','oficio'],
      sentencia:['jurisprudencia','comparar','pruebas'],
      cumplimiento:['jurisprudencia','pruebas','plazos'],
    },
    sancionadores:{
      emplazamiento:['plazos','pruebas','oficio'],
      instruccion:['pruebas','audio','jurisprudencia'],
      resolucion:['jurisprudencia','comparar','plazos'],
    },
  };
  let context={topic:'',phase:''};
  let referenceFrame=null;
  const pane=dialog.querySelector('.djf-tool-pane');
  const state=()=>new URLSearchParams(location.search).get('entidad')||'';
  const legalUrl=kind=>djfUrl('index',{entidad:state(),seccion:state()?kind:null});
  const action=(label,href,remote=true)=>{
    const link=document.createElement('a');
    link.className='tool-action';
    link.textContent=label;
    link.href=href;
    if(remote){link.target='_blank';link.rel='noopener';}
    return link;
  };
  const el=(tag,text)=>{
    const node=document.createElement(tag);
    if(text)node.textContent=text;
    return node;
  };
  function refreshContext(){
    const sectionTitle=context.title||document.querySelector('#work-section:not([hidden]) #work-section-title')?.textContent
      || (context.topic?document.querySelector('.bloque:not([hidden])>h2')?.textContent:'');
    const entity=(document.getElementById('demo-entity')??document.getElementById('fNombre'))?.textContent;
    const parts=[entity,sectionTitle,context.phase].filter(Boolean);
    dialog.querySelector('.djf-tool-state').textContent=parts.join(' · ')||'Expedientes DJF';
    const phases=Object.hasOwn(contextByPhase,context.topic)?contextByPhase[context.topic]:{};
    const preferred=Object.hasOwn(phases,context.phaseKey)?phases[context.phaseKey]:
      Object.hasOwn(contextByTopic,context.topic)?contextByTopic[context.topic]:['morenai','jurisprudencia','normas'];
    const keys=preferred.slice(0,3);
    for(const [key,button] of toolButtons)if(!keys.includes(key))grid.append(button);
    for(const key of keys)recommended.append(toolButtons.get(key));
    related.hidden=!keys.length||!pane.hidden;
  }
  function updateContext(detail){
    if(typeof detail?.topic!=='string'||typeof detail.phase!=='string')return;
    context={
      topic:detail.topic,phase:detail.phase,
      phaseKey:typeof detail.phaseKey==='string'?detail.phaseKey:'',
      title:typeof detail.title==='string'?detail.title:'',
    };
    refreshContext();
  }
  function mountReference(topic){
    referenceFrame=el('iframe');
    referenceFrame.className='djf-tool-reference';
    referenceFrame.title=topic==='exp'?'Sentencias y jurisprudencia de la entidad':'Consulta documental de la entidad';
    referenceFrame.src=djfUrl('consulta',{entidad:state(),tema:topic,panel:'1',herramienta:'1'});
    pane.querySelector('.djf-reference-content')?.remove();
    const target=el('div');
    target.className='djf-reference-content';
    target.append(referenceFrame);
    pane.append(target);
  }
  const forms={
    audio:'<p>Usa un audio de prueba. El archivo se reproduce en este navegador y puedes editar la transcripción con marcas de tiempo.</p><div class="djf-tool-form"><label>Audio de prueba<input type="file" accept="audio/*"></label><audio controls preload="metadata" hidden></audio><label>Transcripción<textarea rows="6"></textarea></label></div>',
    oficio:'<p>Prepara un borrador de muestra y verifica el contenido antes de usar un formato institucional.</p><form class="djf-tool-form"><label>Lugar y fecha<input name="fecha" required></label><label>Destinatario y cargo<input name="destino" required></label><label>Asunto<input name="asunto" required></label><label>Referencia o expediente<input name="referencia"></label><label>Texto del oficio<textarea name="cuerpo" rows="4" required></textarea></label><label>Nombre y cargo de quien suscribe<input name="firma" required></label><button type="submit">Generar borrador</button><label>Borrador editable<textarea name="borrador" rows="8"></textarea></label></form>',
    comparar:'<p>Compara dos textos de muestra por línea. Conserva los originales para cotejo.</p><form class="djf-tool-form"><label>Texto anterior<textarea name="anterior" rows="5" required></textarea></label><label>Texto nuevo<textarea name="nuevo" rows="5" required></textarea></label><button type="submit">Comparar textos</button></form><ul class="tool-differences" aria-live="polite"></ul>',
    pruebas:'<p>Usa datos de muestra para vincular lo que se afirma con su soporte.</p><form class="djf-tool-form"><label>Hecho u observación<input name="hecho" required></label><label>Documento o evidencia<input name="evidencia" required></label><label>Localizador<input name="localizador"></label><label>Qué acredita y qué queda pendiente<textarea name="alcance" rows="3"></textarea></label><button type="submit">Agregar a la matriz</button></form><ol class="tool-matrix"></ol>',
  };
  let audioUrl='';
  function releaseAudio(){if(audioUrl){URL.revokeObjectURL(audioUrl);audioUrl='';}}
  function download(text,name){
    if(!text.trim())return;
    const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');
    link.href=url;link.download=name;link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function control(label,run){
    const button=el('button',label);
    button.type='button';
    button.addEventListener('click',run);
    return button;
  }
  function back(){
    releaseAudio();
    referenceFrame=null;
    list.hidden=false;
    pane.hidden=true;
    pane.replaceChildren();
    refreshContext();
    (related.hidden?grid:recommended).querySelector('button')?.focus();
  }
  function open(key,name){
    related.hidden=true;
    list.hidden=true;
    pane.hidden=false;
    const title=el('h3',name);
    title.tabIndex=-1;
    pane.replaceChildren(control('Volver a herramientas',back),title);
    if(key==='morenai')pane.append(el('p','Abre MorenAI en el sistema DJF con tu sesión. Desde ahí puedes consultar normativa, criterios y sentencias.'),action('Abrir MorenAI',djf+'/atlas/sentencias'));
    if(key==='plazos')pane.append(el('p',state()?'Abrir el seguimiento de la entidad seleccionada.':'Elige una entidad en Expedientes para abrir su bandeja.'),action('Notificaciones',legalUrl('sancionadores'),false),action('Calendario de vencimientos',legalUrl('calendario'),false));
    if(key==='jurisprudencia'){
      if(state())mountReference('exp');
      else pane.append(el('p','Selecciona una entidad para abrir los índices y expedientes del acervo.'));
      pane.append(action('Consultar TEPJF','https://www.te.gob.mx/'),action('Consultar MorenAI',djf+'/atlas/sentencias'));
    }
    if(key==='normas'){
      if(state()){
        const tabs=el('div');tabs.className='djf-tool-actions';
        const scopes=[['Normatividad local','norm'],['OPLE y estrados','ople'],['Planes electorales','planes']];
        for(const [label,topic] of scopes)tabs.append(control(label,()=>mountReference(topic)));
        pane.append(tabs);
        mountReference('norm');
      } else pane.append(el('p','Elige una entidad para consultar su marco electoral y sus publicaciones.'));
      pane.append(action('Consulta legislativa del TEPJF','https://www.te.gob.mx/legislacion/'));
    }
    if(key==='fuentes'){
      const topic=context.topic==='oficios'
        ? (context.phase==='Anual'?'anual':'fiscalizacion')
        : context.topic;
      const sources=new Map();
      for(const [label,description,href] of inePublications(topic,state())){
        if(href&&!sources.has(href))sources.set(href,[label,description]);
      }
      const links=el('ul');
      for(const [href,[label,description]] of sources){
        const row=el('li');
        row.append(action(label,href),el('p',description));
        links.append(row);
      }
      pane.append(links,action('Banco de formatos DJF',djf+'/atlas/banco-formatos'),action('Catálogo de procesos',legalUrl('catalogo'),false));
    }
    if(forms[key]){
      const holder=el('div');
      holder.innerHTML=forms[key];
      pane.append(holder);
      if(key==='audio'){
        const player=holder.querySelector('audio');
        const transcript=holder.querySelector('textarea');
        holder.querySelector('input').addEventListener('change',event=>{
          releaseAudio();
          const file=event.target.files[0];
          player.hidden=!file;
          if(file){audioUrl=URL.createObjectURL(file);player.src=audioUrl;}
          else player.removeAttribute('src');
        });
        const actions=el('div');actions.className='djf-tool-actions';
        actions.append(control('Insertar marca de tiempo',()=>{
          const seconds=Math.floor(player.currentTime||0);
          const pad=value=>String(value).padStart(2,'0');
          transcript.value+='\n['+pad(Math.floor(seconds/3600))+':'+pad(Math.floor(seconds/60)%60)+':'+pad(seconds%60)+'] ';
          transcript.focus();
        }),control('Usar texto de muestra',()=>{
          transcript.value='[00:00:04] Secretaría: se abre la sesión.\n[00:00:18] Secretaría: se da cuenta del orden del día.';
        }),control('Descargar transcripción',()=>download(transcript.value,'transcripcion-de-muestra.txt')));
        pane.append(actions);
      }
      if(key==='oficio'){
        const form=holder.querySelector('form'),draft=form.elements.borrador;
        form.addEventListener('submit',event=>{
          event.preventDefault();
          const {fecha,destino,asunto,referencia,cuerpo,firma}=Object.fromEntries(new FormData(form));
          draft.value=[fecha,'Asunto: '+asunto,referencia&&'Referencia: '+referencia,'',destino,'Presente.','',cuerpo,'','Atentamente',firma].filter(line=>line!==false).join('\n');
          draft.focus();
        });
        pane.append(control('Descargar borrador',()=>download(draft.value,'borrador-de-oficio.txt')));
      }
      if(key==='comparar'){
        const form=holder.querySelector('form'),result=holder.querySelector('ul');
        form.addEventListener('submit',event=>{
          event.preventDefault();
          const before=form.elements.anterior.value.trim().split('\n');
          const after=form.elements.nuevo.value.trim().split('\n');
          const oldLines=new Set(before),newLines=new Set(after);
          const removed=before.filter(line=>!newLines.has(line)).map(line=>'Sólo en texto anterior: '+line);
          const added=after.filter(line=>!oldLines.has(line)).map(line=>'Sólo en texto nuevo: '+line);
          const changes=[...removed,...added];
          if(!changes.length)changes.push(before.join('\n')===after.join('\n')?'Los textos coinciden.':'Coincide el conjunto de líneas. Revisa el orden y las repeticiones.');
          result.replaceChildren(...changes.map(line=>el('li',line)));
        });
      }
      if(key==='pruebas'){
        const form=holder.querySelector('form'),matrix=holder.querySelector('ol');
        form.addEventListener('submit',event=>{
          event.preventDefault();
          const item=Object.fromEntries(new FormData(form));
          matrix.append(el('li',[item.hecho,item.evidencia,item.localizador,item.alcance].filter(Boolean).join(' · ')));
          form.reset();
          form.elements.hecho.focus();
        });
        pane.append(control('Descargar matriz',()=>download([...matrix.children].map(x=>x.textContent).join('\n'),'matriz-probatoria-de-muestra.txt')));
      }
    }
    title.focus();
  }
  for(const [key,title] of catalog){
    const button=control(title,()=>open(key,title));
    button.innerHTML=icon(key)+'<span>'+title+'</span>';
    toolButtons.set(key,button);
    grid.append(button);
  }
  document.addEventListener('djf:tool-context',event=>updateContext(event.detail));
  window.addEventListener('message',event=>{
    if(event.origin!==(location.protocol==='file:'?'null':location.origin))return;
    if(event.source===document.getElementById('work-section-frame')?.contentWindow&&event.data?.type==='djf-tool-context'){
      updateContext(event.data);
    }
    if(referenceFrame&&event.source===referenceFrame.contentWindow&&event.data?.type==='djf-section-height'&&Number.isFinite(event.data.height)){
      referenceFrame.style.height=Math.max(300,Math.min(15000,event.data.height+4))+'px';
    }
  });
  launch.addEventListener('click',()=>{
    refreshContext();
    if(dialog.open){dialog.querySelector('[data-close]').focus();return;}
    const docked=matchMedia('(min-width: 1120px)').matches;
    dialog.classList.toggle('djf-tools-docked',docked);
    if(docked){
      document.body.classList.add('djf-tools-dock-open');
      dialog.show();
    }else dialog.showModal();
  });
  dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('djf-tools-dock-open');
    list.open=false;
    back();
    launch.focus();
  });

})();
