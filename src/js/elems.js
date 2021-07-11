import refs from './refs.js';
refs.field[0].insertAdjacentHTML('afterend', '<div class="timer-delimiter">:</div>');
refs.field[1].insertAdjacentHTML('afterend', '<div class="timer-delimiter">:</div>');
refs.field[2].insertAdjacentHTML('afterend', '<div class="timer-delimiter">:</div>');
refs.timer.insertAdjacentHTML('afterend', '<button type="button" data-clear>Clear countdown</button>');