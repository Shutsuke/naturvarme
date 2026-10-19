(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Savings calculator (fingervisning – inte en offert)
  var PRICE = 1.45; // kr/kWh inkl. nät och skatt
  var CFG = {
    ll:   { cover: 0.65, cop: 2.6 }, // luft/luft täcker ca 65 % av värmebehovet
    lv:   { cover: 1,    cop: 2.9 },
    berg: { cover: 1,    cop: 3.6 }
  };
  var kwh = document.getElementById('kwh');
  var typ = document.getElementById('typ');
  if (!kwh || !typ) return;

  var fmt = function (n) { return n.toLocaleString('sv-SE'); };
  var round = function (n, to) { return Math.round(n / to) * to; };

  function update() {
    var k = Number(kwh.value);
    var c = CFG[typ.value];
    var costNow = round(k * PRICE, 100);
    var saving = round(k * c.cover * (1 - 1 / c.cop) * PRICE, 100);
    document.getElementById('costNow').textContent = fmt(costNow) + ' kr/år';
    document.getElementById('kwhOut').textContent = fmt(k);
    document.getElementById('saving').textContent = fmt(saving) + ' kr';
    document.getElementById('savingMonth').textContent = fmt(round(saving / 12, 10));
  }
  kwh.addEventListener('input', update);
  typ.addEventListener('change', update);
  update();
})();
