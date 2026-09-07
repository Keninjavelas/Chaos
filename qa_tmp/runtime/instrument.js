(() => {
  const KEY = '__qaPhases';
  const push = (obj) => {
    try {
      const arr = JSON.parse(sessionStorage.getItem(KEY) || '[]');
      arr.push(Object.assign({ t: Date.now() }, obj));
      sessionStorage.setItem(KEY, JSON.stringify(arr.slice(-200)));
    } catch (e) {}
  };
  push({ ev: 'page_load' });
  const origLog = console.log.bind(console);
  console.log = (...args) => {
    if (typeof args[0] === 'string' && (args[0].includes('IntroFlow') || args[0].includes('Rendering') || args[0].includes('phase'))) {
      push({ ev: 'log', msg: args.slice(0, 4).map(a => (typeof a === 'string' ? a : JSON.stringify(a))).join(' ') });
    }
    origLog(...args);
  };
  window.addEventListener('error', (e) => push({ ev: 'error', msg: String(e.message).slice(0, 300), src: (e.filename || '').slice(-80), line: e.lineno }));
  window.addEventListener('unhandledrejection', (e) => push({ ev: 'unhandledrejection', msg: String(e.reason && e.reason.message || e.reason).slice(0, 300) }));
  window.addEventListener('beforeunload', () => push({ ev: 'beforeunload' }));
  push({ ev: 'instrumented' });
  return 'instrumented';
})()
