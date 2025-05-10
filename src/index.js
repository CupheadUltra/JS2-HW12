class CountdownTimer {
    constructor({ selector, targetDate }) {
      this.selector = selector;
      this.targetDate = targetDate;
      this.timerRef = document.querySelector(selector);
  
      this.daysRef = this.timerRef.querySelector('[data-value="days"]');
      this.hoursRef = this.timerRef.querySelector('[data-value="hours"]');
      this.minsRef = this.timerRef.querySelector('[data-value="mins"]');
      this.secsRef = this.timerRef.querySelector('[data-value="secs"]');
  
      this.start();
    }
  
    start() {
      this.intervalId = setInterval(() => {
        const now = new Date();
        const time = this.targetDate - now;
  
        if (time <= 0) {
          clearInterval(this.intervalId);
          this.updateTimer(0, 0, 0, 0);
          return;
        }
  
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
  
        this.updateTimer(days, hours, mins, secs);
      }, 1000);
    }
  
    updateTimer(days, hours, mins, secs) {
      this.daysRef.textContent = days;
      this.hoursRef.textContent = this.pad(hours);
      this.minsRef.textContent = this.pad(mins);
      this.secsRef.textContent = this.pad(secs);
    }
  
    pad(value) {
      return String(value).padStart(2, '0');
    }
  }
  new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2025 00:00:00'),
  });  