// Грива льва: 36 лучей по кругу, как в логотипе
  (function () {
    var mane = document.getElementById('mane');
    var SVG = 'http://www.w3.org/2000/svg';
    var N = 36;
    for (var i = 0; i < N; i++) {
      var angle = i * (360 / N);
      var len = 62 + (i % 3) * 14;   // лучи трёх разных длин
      var rect = document.createElementNS(SVG, 'rect');
      rect.setAttribute('x', -10);
      rect.setAttribute('y', -(158 + len));
      rect.setAttribute('width', 20);
      rect.setAttribute('height', len);
      rect.setAttribute('rx', 5);
      rect.setAttribute('fill', '#905F2E');
      rect.setAttribute('stroke', '#FFF7EC');
      rect.setAttribute('stroke-width', 3);
      rect.setAttribute('transform', 'rotate(' + angle + ')');
      mane.appendChild(rect);
    }
  })();

  // Бегущая строка: дублируем набор слов дважды для бесшовного цикла
  (function () {
    var words = ['запуск речи', 'логопедические занятия', 'дефектолог', 'нейропсихолог', 'подготовка к школе', 'коррекция заикания', 'раннее развитие с 1 года'];
    var track = document.getElementById('ticker-track');
    for (var pass = 0; pass < 2; pass++) {
      words.forEach(function (w) {
        var el = document.createElement('span');
        el.className = 'ticker__item';
        el.textContent = w;
        track.appendChild(el);
      });
    }
  })();

  // Появление блоков при скролле
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var ticking = false;

  function check() {
    ticking = false;
    var limit = window.innerHeight - 40;
    els = els.filter(function (el) {
      if (el.getBoundingClientRect().top < limit) {
        el.classList.add('is-visible');
        return false;
      }
      return true;
    });
  }

  function onScroll() {
    if (!ticking && els.length) {
      ticking = true;
      requestAnimationFrame(check);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  check();
})();

// «Как проходят занятия»: видео мотается скроллом, плашки шагов сменяются по секундам ролика
(function () {
  var wrap = document.getElementById('format-scrub');
  var video = document.getElementById('format-video');
  if (!wrap || !video) return;

  var steps = wrap.querySelectorAll('.fstep');
  var FALLBACK_DURATION = 8.1;          // длительность ролика, если метаданные ещё не загрузились
  var STEP_STARTS = [0, 4, 6.3];        // секунда видео, с которой активен каждый шаг
  var raf = null;

  function progress() {
    var rect = wrap.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, -rect.top / total));
  }

  function update() {
    raf = null;
    var duration = video.duration || FALLBACK_DURATION;
    var t = progress() * duration;

    if (video.readyState >= 1 && Math.abs(video.currentTime - t) > 0.034) {
      video.currentTime = t;
    }

    var active = t >= STEP_STARTS[2] ? 2 : t >= STEP_STARTS[1] ? 1 : 0;
    for (var i = 0; i < steps.length; i++) {
      steps[i].classList.toggle('is-active', i === active);
      steps[i].classList.toggle('is-passed', i < active);
    }
  }

  function onScroll() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  video.addEventListener('loadedmetadata', onScroll);

  // iOS может не грузить видео до жеста пользователя — подталкиваем
  video.load();
  document.addEventListener('touchstart', function kick() {
    if (video.readyState < 1) video.load();
    document.removeEventListener('touchstart', kick);
  }, { passive: true });

  update();
})();

// Мобильное меню
  (function () {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  })();
