'use strict';

(function() {
  // settings
  const n = 100000;

  // utils
  const displayPerf = (fn, node) => (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    const time = (end - start).toString().slice(0, 5);
    node.innerHTML = time;
    return result;
  }


  // sum with for loop
  const loopSumCount = document.getElementById('loopSumCount');
  const startLoopSumButton = document.getElementById('startLoopSumButton');
  const loopSumResult = document.getElementById('loopSumResult');
  loopSumCount.innerHTML = n;

  const loopSumNCounts = n => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += i
    }
    return sum;
  }

  startLoopSumButton.addEventListener('click',
    displayPerf(() => loopSumNCounts(n), loopSumResult)
  );


  // sum with forEach
  const sumCount = document.getElementById('sumCount');
  const startSumButton = document.getElementById('startSumButton');
  const sumResult = document.getElementById('sumResult');
  sumCount.innerHTML = n;

  const sumNCounts = n => {
    return Array.from({ length: n })
      .reduce((sum, i) => sum + i, 0);
  }

  startSumButton.addEventListener('click',
    displayPerf(() => sumNCounts(n), sumResult)
  );


  // render
  const renderCount = document.getElementById('renderCount');
  const countDisplay = document.getElementById('countDisplay');
  const startCountButton = document.getElementById('startCountButton');
  const countResult = document.getElementById('countResult');
  countDisplay.innerHTML = '-';
  renderCount.innerHTML = n;

  const renderNCounts = n => {
    for (let i = 1; i <= n; i++) {
      countDisplay.innerHTML = i;
    }
  }

  startCountButton.addEventListener('click',
    displayPerf(() => renderNCounts(n), countResult)
  );


  // call API
  const callApiButton = document.getElementById('callApiButton');
  const callApiResult = document.getElementById('callApiResult');

  const callApi = cb => {
    const start = performance.now();
    return fetch('https://api.github.com/users', {
      method: 'head',
      mode: 'cors'
    }).then(() => {
      const end = performance.now();
      const time = (end - start).toString().slice(0, 5);
      callApiResult.innerHTML = time;
    })
  }

  callApiButton.addEventListener('click', callApi);
})();
