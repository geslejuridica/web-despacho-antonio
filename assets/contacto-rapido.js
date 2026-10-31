/* Botón flotante de WhatsApp — Gestió Legal Jurídica */
(function () {
  var NUM = '34645877276';
  var path = location.pathname || '/';
  var lang = path.indexOf('/ca/') === 0 ? 'ca' : path.indexOf('/ru/') === 0 ? 'ru' : path.indexOf('/en/') === 0 ? 'en' : 'es';
  var T = {
    es: { msg: 'Hola, he visto su web y quería hacer una consulta.', label: 'Escríbeme por WhatsApp', tip: 'WhatsApp' },
    ca: { msg: 'Hola, he vist el vostre web i voldria fer una consulta.', label: 'Escriu-me per WhatsApp', tip: 'WhatsApp' },
    en: { msg: 'Hello, I have seen your website and would like to make an enquiry.', label: 'Message me on WhatsApp', tip: 'WhatsApp' },
    ru: { msg: 'Здравствуйте! Я увидел(а) ваш сайт и хотел(а) бы получить консультацию.', label: 'Написать в WhatsApp', tip: 'WhatsApp' }
  }[lang];

  function crear() {
    if (document.getElementById('glj-wa')) return;
    var st = document.createElement('style');
    st.textContent =
      '#glj-wa{position:fixed;right:18px;bottom:18px;z-index:900;display:flex;align-items:center;gap:10px;' +
      'background:#1F8A4C;color:#fff;text-decoration:none;border-radius:999px;padding:0;height:56px;min-width:56px;' +
      'box-shadow:0 6px 20px rgba(16,49,63,.28);font:500 15px/1 system-ui,-apple-system,"Segoe UI",sans-serif;transition:transform .15s ease,background .15s ease}' +
      '#glj-wa:hover,#glj-wa:focus-visible{background:#176E3C;transform:translateY(-2px)}' +
      '#glj-wa:focus-visible{outline:3px solid #1F6E8C;outline-offset:3px}' +
      '#glj-wa svg{width:30px;height:30px;flex:none;margin:0 13px}' +
      '#glj-wa span{display:none;padding-right:20px;margin-left:-6px;white-space:nowrap}' +
      '@media (min-width:900px){#glj-wa span{display:inline}}' +
      '@media print{#glj-wa{display:none}}';
    document.head.appendChild(st);
    var a = document.createElement('a');
    a.id = 'glj-wa';
    a.href = 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(T.msg);
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', T.label);
    a.innerHTML =
      '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="#fff" d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.6l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.7C5.1 10 10 5.3 16 5.3S26.9 10 26.9 15.8 22 26.4 16 26.4zm6-7.8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>' +
      '<span>' + T.label + '</span>';
    document.body.appendChild(a);
  }

  // Si hay una barra fija abajo (por ejemplo, el aviso de cookies), el botón se coloca encima.
  function ajustar() {
    var a = document.getElementById('glj-wa');
    if (!a) return;
    var base = 18, h = window.innerHeight;
    a.style.visibility = 'hidden';
    var el = document.elementFromPoint(8, h - 4);
    a.style.visibility = '';
    var tope = null;
    while (el && el !== document.body && el !== document.documentElement) {
      var pos = getComputedStyle(el).position;
      if (pos === 'fixed' || pos === 'sticky') { tope = el.getBoundingClientRect().top; break; }
      el = el.parentElement;
    }
    var bottom = tope !== null && tope > h * 0.3 ? Math.round(h - tope + 12) : base;
    if (a.style.bottom !== bottom + 'px') a.style.bottom = bottom + 'px';
  }

  function iniciar() {
    crear();
    ajustar();
    setInterval(ajustar, 800);
    window.addEventListener('resize', ajustar);
    // Si la página se vuelve a pintar y el botón desaparece, se vuelve a añadir.
    try {
      new MutationObserver(function () { if (!document.getElementById('glj-wa')) crear(); })
        .observe(document.body, { childList: true });
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
