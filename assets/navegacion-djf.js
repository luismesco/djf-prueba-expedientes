function djfUrl(page, parameters = {}) {
  const query = new URLSearchParams({v:'dry-1'});
  for (const [key, value] of Object.entries(parameters)) {
    if (value !== null && value !== undefined && value !== '') query.set(key,value);
  }
  return './' + page + '.html?' + query;
}
