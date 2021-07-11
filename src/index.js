import './sass/main.scss';
import './js/elems.js';
import refs from './js/refs.js';
import Swal from 'sweetalert2';

refs.clearBtn = document.querySelector('[data-clear]');

refs.startBtn.setAttribute('disabled', true);
refs.input.addEventListener('input', getSelectedDate);
// refs.btn.addEventListener('click', getRemainingTime);

function getSelectedDate() {
  const selectedDate = new Date(refs.input.value);
  const currentDate = Date.now();
  if (selectedDate < currentDate) {
    Swal.fire(
  'Error',
  'Please choose a date in the future',
  'warning'
)
  } else {
    refs.startBtn.removeAttribute('disabled');
  }
}

const timer = {
  intervalId: null,
    
  start() {
    refs.startBtn.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);
    const selectedDate = Date.parse(new Date(refs.input.value)) - (180 * 60 * 1000);
            
    this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedDate - currentTime;
            const time = convertMs(deltaTime);
            
            updateClockface(time);
    }, 1000)  
  },

  stop() {
    clearInterval(this.intervalId);
    const time = convertMs(0);
    updateClockface(time);
    refs.input.value = '';
    refs.input.removeAttribute('disabled', true);
  }
}

refs.startBtn.addEventListener('click', () => {
  timer.start()
});
refs.clearBtn.addEventListener('click', () => {
  timer.stop()
});

// function getRemainingTime() {
//   const selectedDate = Date.parse(new Date(refs.input.value)) - (180 * 60 * 1000);
//   setInterval(() => {
//             const currentTime = Date.now();
//             const deltaTime = selectedDate - currentTime;
//             const time = convertMs(deltaTime);
            
//             updateClockface(time);
//         }, 1000)
// }

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
  
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

 function pad(value) {
    return String(value).padStart(2, '0');
  }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
