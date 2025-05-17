class CountdownTimer {
  constructor({ selector }) {
    this.timer = document.querySelector(selector);
    this.refs = {
      days: this.timer.querySelector('[data-value="days"]'),
      hours: this.timer.querySelector('[data-value="hours"]'),
      mins: this.timer.querySelector('[data-value="mins"]'),
      secs: this.timer.querySelector('[data-value="secs"]'),
    };
    this.intervalId = null;
  }

  start(targetDate) {
    clearInterval(this.intervalId);

    this.intervalId = setInterval(() => {
      const now = new Date();
      const time = targetDate - now;

      if (time <= 0) {
        clearInterval(this.intervalId);
        this.updateClock(0, 0, 0, 0);
        return;
      }

      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((time % (1000 * 60)) / 1000);

      this.updateClock(days, hours, mins, secs);
    }, 1000);
  }

  updateClock(d, h, m, s) {
    this.refs.days.textContent = d;
    this.refs.hours.textContent = String(h).padStart(2, '0');
    this.refs.mins.textContent = String(m).padStart(2, '0');
    this.refs.secs.textContent = String(s).padStart(2, '0');
  }
}

const timer = new CountdownTimer({ selector: '#timer-1' });

document.querySelector('#start-timer').addEventListener('click', () => {
  const inputValue = document.querySelector('#datetime-picker').value;
  if (!inputValue) {
    alert('Введіть дату і час');
    return;
  }

  const targetDate = new Date(inputValue);
  if (targetDate <= new Date()) {
    alert('Дата має бути в майбутньому!');
    return;
  }

  timer.start(targetDate);
});
