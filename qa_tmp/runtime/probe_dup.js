(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const b = btns.find(x => x.textContent.includes('Skip'));
  if (!b) return { err: 'no skip btn' };
  const marks = {};
  const tag = (name, el, phase) => {
    if (!el) return;
    el.addEventListener('click', (e) => {
      marks[name] = (marks[name] || 0) + 1;
      marks[name + '_target'] = (e.target && e.target.tagName) || '';
    }, !!phase);
  };
  tag('windowCap', window, true);
  tag('documentCap', document, true);
  tag('bodyCap', document.body, true);
  tag('rootCap', (document.getElementById('root') || document.querySelector('#__next')), true);
  tag('btnBubble', b, false);
  b.click();
  return JSON.stringify(marks);
})()
