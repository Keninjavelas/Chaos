(() => {
  const KEY = '__qaPhases';
  const push = (obj) => {
    try {
      const arr = JSON.parse(sessionStorage.getItem(KEY) || '[]');
      arr.push(Object.assign({ t: Date.now() }, obj));
      sessionStorage.setItem(KEY, JSON.stringify(arr.slice(-400)));
    } catch (e) {}
  };
  push({ ev: 'page_load' });
  // neutralize dev-client full reloads
  try { window.location.reload = function () { push({ ev: 'reload_blocked' }); }; } catch (e) { push({ ev: 'reload_patch_err', msg: String(e) }); }
  const origLog = console.log.bind(console);
  console.log = (...args) => {
    if (typeof args[0] === 'string' && /IntroFlow|Rendering|phase/.test(args[0])) {
      push({ ev: 'log', msg: args.slice(0, 5).map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ').slice(0, 300) });
    }
    origLog(...args);
  };
  window.addEventListener('error', (e) => push({ ev: 'error', msg: String(e.message).slice(0, 300), src: (e.filename || '').slice(-80), line: e.lineno }));
  window.addEventListener('unhandledrejection', (e) => push({ ev: 'unhandledrejection', msg: String(e.reason && e.reason.message || e.reason).slice(0, 300) }));
  window.addEventListener('beforeunload', () => push({ ev: 'beforeunload' }));
  // watch interval drift to confirm no throttle
  const t0 = performance.now(); let fired = 0;
  const iv = setInterval(() => { fired++; if (fired === 3) { clearInterval(iv); push({ ev: 'timercheck', ms: Math.round(performance.now() - t0) }); } }, 100);
  push({ ev: 'stabilized' });
  return 'stabilized';
})()
