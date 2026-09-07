(() => {
  const out = { roots: [], marks: {} };
  // find candidates for react root container
  const cands = [document.body, document.getElementById('root'), document.getElementById('__next'), document.querySelector('#__next')];
  out.roots = cands.filter(Boolean).map(el => el.tagName + '.' + (el.className || ''));
  // attach bubble listeners on all ancestors of the skip button up to body
  const b = Array.from(document.querySelectorAll('button')).find(x => x.textContent.includes('Skip'));
  const path = [];
  let el = b;
  while (el) { path.push(el); el = el.parentElement; }
  out.pathTags = path.map(p => p.tagName + (p.id ? '#' + p.id : '') + (p.className ? '.' + p.className : ''));
  path.forEach((node, i) => {
    node.addEventListener('click', (e) => { out.marks['bubble_' + i + '_' + (node.tagName || '')] = (out.marks['bubble_' + i + '_' + (node.tagName || '')] || 0) + 1; });
  });
  window.__probe2 = out;
  b.click();
  return JSON.stringify(out);
})()
