/* ============================================================
   +100 MAPAS MENTAIS DE ASTROLOGIA — LANDING PAGE SCRIPTS
   ============================================================ */

// 1. Variáveis Globais de Checkout
const CHECKOUT_URL = "#checkout"; // Fallback universal
const CHECKOUT_BASICO_URL = "#checkout-basico";
const CHECKOUT_COMPLETO_URL = "#checkout-completo";

// 2. Atualizar data da oferta dinamicamente
(function () {
  'use strict';
  function updateOfferDate() {
    var dateEl = document.querySelector('[data-current-date]');
    if (!dateEl) return;

    var now = new Date();
    var day = String(now.getDate()).padStart(2, '0');
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var year = now.getFullYear();
    dateEl.textContent = day + '/' + month + '/' + year;
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateOfferDate);
  } else {
    updateOfferDate();
  }
})();

// 3. Interações Principais (Marquees, Carrossel de Depoimentos, FAQ Accordion, Scroll Reveal)
(function () {
  'use strict';

  /* ---------- Controles do Marquee de Materiais e Fotos ---------- */
  document.querySelectorAll('[data-marquee-control]').forEach(function (group) {
    var sec = group.closest('.sec') || group.parentElement;
    var tracks = sec ? sec.querySelectorAll('.marquee-track') : [];
    if (!tracks.length) return;
    var timer;
    function speedUp() {
      tracks.forEach(function (track) { track.classList.add('is-fast'); });
      clearTimeout(timer);
      timer = setTimeout(function () {
        tracks.forEach(function (track) { track.classList.remove('is-fast'); });
      }, 1800);
    }
    var prev = group.querySelector('[data-marquee-prev]');
    var next = group.querySelector('[data-marquee-next]');
    if (prev) prev.addEventListener('click', speedUp);
    if (next) next.addEventListener('click', speedUp);
  });

  /* ---------- Carrossel de Depoimentos ---------- */
  var tTrack = document.querySelector('[data-testi-track]');
  if (tTrack) {
    var slides = tTrack.children.length;
    var idx = 0;
    var dotsWrap = document.querySelector('[data-testi-dots]');
    var tPrev = document.querySelector('[data-testi-prev]');
    var tNext = document.querySelector('[data-testi-next]');
    var dots = [];
    
    if (dotsWrap) {
      for (var i = 0; i < slides; i++) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Depoimento ' + (i + 1));
        (function (n) { b.addEventListener('click', function () { go(n); }); })(i);
        dotsWrap.appendChild(b);
        dots.push(b);
      }
    }
    
    function go(n) {
      idx = (n + slides) % slides;
      tTrack.style.transform = 'translateX(' + (-idx * 100) + '%)';
      dots.forEach(function (d, j) { d.classList.toggle('on', j === idx); });
    }
    
    if (tPrev) tPrev.addEventListener('click', function () { go(idx - 1); auto(); });
    if (tNext) tNext.addEventListener('click', function () { go(idx + 1); auto(); });
    
    var timer;
    function auto() {
      clearInterval(timer);
      timer = setInterval(function () { go(idx + 1); }, 6500);
    }
    go(0);
    auto();
  }

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (other) {
        if (other !== item) {
          other.classList.remove('open');
          var otherA = other.querySelector('.faq-a');
          if (otherA) otherA.style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Reveal on Scroll ---------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();

// 4. Rastreamento e Injeção de Parâmetros UTM nos Botões de Checkout
(function () {
  'use strict';
  var UTM_STORAGE_KEY = '__astrology_utm_params__';

  function getUtmParams() {
    var search = window.location.search;
    if (search && search.length > 1) {
      try { sessionStorage.setItem(UTM_STORAGE_KEY, search); } catch (e) {}
      return new URLSearchParams(search);
    }
    try {
      var stored = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (stored) return new URLSearchParams(stored);
    } catch (e) {}
    return null;
  }

  function appendUtmsToLinks() {
    var params = getUtmParams();
    if (!params) return;

    document.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      try {
        var url = new URL(href, window.location.origin);
        params.forEach(function (val, key) {
          if (!url.searchParams.has(key)) {
            url.searchParams.set(key, val);
          }
        });
        link.setAttribute('href', url.toString());
      } catch (e) {}
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendUtmsToLinks);
  } else {
    appendUtmsToLinks();
  }
})();
