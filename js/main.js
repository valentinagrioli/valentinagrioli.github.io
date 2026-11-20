// Portfolio Valentina Grioli · animaciones
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) Título del hero: cada palabra sube desde abajo, una tras otra
  var title = document.querySelector('[data-split]');
  if (title) {
    var i = 0;
    title.querySelectorAll('.l1, .l2').forEach(function (line) {
      var words = line.textContent.trim().split(/\s+/);
      line.innerHTML = words.map(function (w) {
        var delay = (0.25 + i++ * 0.09).toFixed(2);
        return '<span class="w"><span style="animation-delay:' + delay + 's">' + w + '</span></span>';
      }).join(' ');
    });
  }

  // 2) Navegación: cambia un poco al scrollear
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3) Aparición de bloques al entrar en pantalla
  var items = document.querySelectorAll('.rv, .kicker');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // 4) Collage del hero: se inclina siguiendo el mouse
  var box = document.getElementById('collage');
  var tilt = document.getElementById('collageTilt');
  if (box && tilt && !reduce && window.matchMedia('(pointer: fine)').matches) {
    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (ev) {
      var r = box.getBoundingClientRect();
      var x = (ev.clientX - (r.left + r.width / 2)) / window.innerWidth;
      var y = (ev.clientY - (r.top + r.height / 2)) / window.innerHeight;
      tilt.style.transform = 'rotateY(' + (x * 14).toFixed(2) + 'deg) rotateX(' + (-y * 12).toFixed(2) + 'deg)';
    });
    hero.addEventListener('mouseleave', function () { tilt.style.transform = ''; });
  }
})();
