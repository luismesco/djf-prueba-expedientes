const picker = document.getElementById('demo-state');
const mapView = document.getElementById('demo-mapa');
const optionsView = document.getElementById('demo-options');
const entity = document.getElementById('demo-entity');
const entries = new Map(Array.from(picker.options).filter(option => option.value).map(option => [option.value, option.textContent]));

function render(focus = false) {
  const code = new URLSearchParams(location.search).get('entidad');
  const name = entries.get(code);
  mapView.hidden = Boolean(name);
  optionsView.hidden = !name;
  if (name) {
    picker.value = code;
    entity.textContent = name;
    for (const link of document.querySelectorAll('[data-topic]')) {
      const params = new URLSearchParams({entidad: code, tema: link.dataset.topic, v: 'mesa-juridica-1'});
      if (link.dataset.view) params.set('vista', link.dataset.view);
      link.href = './consulta.html?' + params;
    }
  }
  if (focus) (name ? entity : document.getElementById('demo-map-title')).focus();
  document.dispatchEvent(new Event('djf:entidad'));
}

function select(code) {
  if (!entries.has(code)) return;
  const url = new URL(location.href);
  url.searchParams.set('entidad', code);
  url.searchParams.delete('seccion');
  history.pushState(null, '', url);
  render(true);
}

document.getElementById('demo-state-form').addEventListener('submit', event => {
  event.preventDefault();
  select(picker.value);
});

document.querySelector('.demo-map-graphic').addEventListener('click', event => {
  const shape = event.target.closest('[data-map-state]');
  if (shape) select(shape.dataset.mapState);
});

document.getElementById('demo-back-map').addEventListener('click', event => {
  event.preventDefault();
  const url = new URL(location.href);
  url.searchParams.delete('entidad');
  url.searchParams.delete('seccion');
  history.pushState(null, '', url);
  render(true);
});

window.addEventListener('popstate', () => render(true));
render();
