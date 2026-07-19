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
