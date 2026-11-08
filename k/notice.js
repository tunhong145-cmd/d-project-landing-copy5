// User-supplied, dated submission records. This is not a live feed or an approval notice.
(() => {
  'use strict';
  const suppliedAt = Date.parse('2026-10-29T03:52:58Z');
  const records = [
    ['臺北市', '陳*華', 50, 2], ['高雄市', '林*豪', 200, 4], ['臺中市', '黃*婷', 80, 5],
    ['新北市', '張*偉', 150, 7], ['桃園市', '李*傑', 30, 8], ['臺南市', '吳*玲', 120, 10],
    ['新竹市', '劉*宇', 45, 12], ['彰化縣', '王*志', 60, 14], ['屏東縣', '楊*雅', 90, 15],
    ['苗栗縣', '蔡*明', 100, 1],
  ];
  const card = document.querySelector('.activity-lane .application-notice');
  const calculator = document.getElementById('calculator');
  if (!card || !calculator) return;
  const city = document.getElementById('notice-city');
  const name = document.getElementById('notice-name');
  const amount = document.getElementById('notice-amount');
  const time = document.getElementById('notice-time');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0, timer, finishFade;

  function ageLabel(createdAt) {
    const minutes = Math.floor((Date.now() - createdAt) / 60000);
    if (minutes <= 0) return '已送件';
    if (minutes < 60) return `${minutes} 分鐘前已送件`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} 小時前已送件`;
    return `${Math.floor(minutes / 1440)} 天前已送件`;
  }

  function render(animate) {
    const [place, alias, value, originalMinutes] = records[index];
    const submittedAt = new Date(suppliedAt - originalMinutes * 60000);
    city.textContent = place;
    name.textContent = alias;
    amount.textContent = String(value);
    time.textContent = ageLabel(submittedAt.getTime());
    time.dateTime = submittedAt.toISOString();
    time.title = submittedAt.toLocaleString('zh-TW', {timeZone: 'Asia/Taipei'});
    if (animate) {
      card.classList.add('is-changing');
      finishFade = setTimeout(() => card.classList.remove('is-changing'), 320);
    }
  }

  function allowed() { return !calculator.hidden && !document.hidden && !reduced.matches; }
  function tick() {
    if (!allowed()) return;
    index = (index + 1) % records.length;
    render(true);
    timer = setTimeout(tick, 5500);
  }
  function stop() {
    clearTimeout(timer);
    clearTimeout(finishFade);
    card.classList.remove('is-changing');
  }
  function restart() {
    stop();
    render(false);
    if (allowed()) timer = setTimeout(tick, 5500);
  }

  document.addEventListener('visibilitychange', restart);
  new MutationObserver(restart).observe(calculator, {attributes: true, attributeFilter: ['hidden']});
  reduced.addEventListener('change', restart);
  window.addEventListener('pagehide', stop);
  window.addEventListener('pageshow', restart);
  restart();
})();
