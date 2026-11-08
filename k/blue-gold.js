(() => {
  'use strict';
  const amount = document.querySelector('#amount');
  const amountValue = document.querySelector('#amount-value');
  const resultAmount = document.querySelector('#result-amount');
  const resultTerm = document.querySelector('#result-term');
  const termOptions = Array.from(document.querySelectorAll('[data-term]'));
  const moreTerms = document.querySelector('#more-terms');
  const moreSummary = moreTerms.querySelector('summary');
  const menu = document.querySelector('.mobile-menu');
  const calculator = document.querySelector('#calculator');

  // Reflect the existing K calculator values, after its own handlers run.
  function mirrorEstimate() {
    const selected = termOptions.find(option => option.classList.contains('selected'));
    resultAmount.textContent = amountValue.textContent;
    amount.setAttribute('aria-valuetext', amountValue.textContent);
    if (selected) {
      resultTerm.textContent = `${selected.dataset.term} 期`;
      moreSummary.textContent = moreTerms.contains(selected) ? `更多期數 · ${selected.dataset.term}期` : '更多期數';
    }
  }

  amount.addEventListener('input', mirrorEstimate);
  termOptions.forEach(option => option.addEventListener('click', mirrorEstimate));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  document.querySelector('.brand-wordmark').addEventListener('click', event => {
    if (calculator.hidden) {
      event.preventDefault();
      if (document.querySelector('#success').hidden) document.querySelector('#back').click();
    }
  });
  mirrorEstimate();
})();
