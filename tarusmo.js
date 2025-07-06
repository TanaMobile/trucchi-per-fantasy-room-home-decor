// idleDetector.js
// Monitora l'inattività dell'utente e attiva un callback dopo un certo tempo

class IdleDetector {
  constructor(timeoutMs = 30000, onIdle = null) {
    this.timeout = timeoutMs;
    this.onIdle = typeof onIdle === 'function' ? onIdle : () => console.log('[IdleDetector] User is idle');
    this._idleTimer = null;
    this._events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
  }

  _resetTimer() {
    clearTimeout(this._idleTimer);
    this._idleTimer = setTimeout(this.onIdle, this.timeout);
  }

  _attachListeners() {
    this._events.forEach(evt => window.addEventListener(evt, this._resetTimerBound, true));
  }

  _detachListeners() {
    this._events.forEach(evt => window.removeEventListener(evt, this._resetTimerBound, true));
  }

  start() {
    this._resetTimerBound = this._resetTimer.bind(this);
    this._attachListeners();
    this._resetTimer();
  }

  stop() {
    clearTimeout(this._idleTimer);
    this._detachListeners();
  }
}

// Esempio:
// const idle = new IdleDetector(10000, () => alert('Sei inattivo da 10 secondi!'));
// idle.start();

export default IdleDetector;
