export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  AED: { symbol: 'AED ', rate: 3.67, label: 'AED (د.إ)' },
};

export function formatPrice(priceUsd, currency = 'USD') {
  const { symbol, rate } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = Math.round(priceUsd * rate);
  
  if (currency === 'AED') {
    return `${symbol}${converted.toLocaleString('en-US')}`;
  }
  return `${symbol}${converted.toLocaleString('en-US')}`;
}

export function calculateMonthlyPayment(
  principalUsd,
  downPaymentPercent = 20,
  termMonths = 36,
  annualInterestRate = 4.8
) {
  const downPayment = (principalUsd * downPaymentPercent) / 100;
  const loanAmount = principalUsd - downPayment;
  const monthlyRate = annualInterestRate / 100 / 12;
  
  if (monthlyRate === 0) {
    return {
      monthlyPayment: Math.round(loanAmount / termMonths),
      downPayment: Math.round(downPayment),
      totalLoan: Math.round(loanAmount),
    };
  }
  
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
    (Math.pow(1 + monthlyRate, termMonths) - 1);
    
  return {
    monthlyPayment: Math.round(monthlyPayment),
    downPayment: Math.round(downPayment),
    totalLoan: Math.round(loanAmount),
  };
}

export function calculateFinancing(
  principalUsd,
  downPaymentPercent = 20,
  termMonths = 36,
  currency = 'USD'
) {
  const res = calculateMonthlyPayment(principalUsd, downPaymentPercent, termMonths);
  return {
    ...res,
    monthlyPaymentFormatted: formatPrice(res.monthlyPayment, currency),
    downPaymentFormatted: formatPrice(res.downPayment, currency),
    totalLoanFormatted: formatPrice(res.totalLoan, currency),
  };
}

/**
 * Web Audio API Engine Rev Synthesizer
 */
class EngineSoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.masterGain = null;
    this.filterNode = null;
    this.isPlaying = false;
    this.currentRpm = 900;
    this.targetRpm = 900;
    this.animFrameId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startEngine(engineType = 'v12-high-rev', baseFreq = 130) {
    this.init();
    if (!this.ctx || this.isPlaying) return;

    this.isPlaying = true;
    this.currentRpm = 900;
    this.targetRpm = 900;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.35, this.ctx.currentTime + 0.3);

    // Filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(4.0, this.ctx.currentTime);

    // Oscillator 1
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(baseFreq * 0.45, this.ctx.currentTime);

    // Oscillator 2
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(baseFreq * 0.9, this.ctx.currentTime);

    // Sub oscillator
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(baseFreq * 0.22, this.ctx.currentTime);

    // Connections
    this.osc1.connect(this.filterNode);
    this.osc2.connect(this.filterNode);
    this.subOsc.connect(this.filterNode);
    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();

    this.loopRpm();
  }

  revEngine(targetRpm = 7500) {
    if (!this.isPlaying || !this.ctx) return;
    this.targetRpm = targetRpm;
  }

  releaseThrottle() {
    if (!this.isPlaying) return;
    this.targetRpm = 900;
  }

  stopEngine() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
        this.subOsc?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
        this.subOsc?.disconnect();
      } catch (e) {
        // ignore
      }
      this.isPlaying = false;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    }, 450);
  }

  loopRpm = () => {
    if (!this.isPlaying || !this.ctx) return;

    const diff = this.targetRpm - this.currentRpm;
    if (Math.abs(diff) > 10) {
      this.currentRpm += diff * 0.12;
    } else {
      this.currentRpm = this.targetRpm;
    }

    const freqFactor = this.currentRpm / 900;
    const base = 50 * freqFactor;

    if (this.osc1 && this.osc2 && this.subOsc && this.filterNode) {
      this.osc1.frequency.setTargetAtTime(base, this.ctx.currentTime, 0.05);
      this.osc2.frequency.setTargetAtTime(base * 1.5, this.ctx.currentTime, 0.05);
      this.subOsc.frequency.setTargetAtTime(base * 0.5, this.ctx.currentTime, 0.05);
      
      const filterFreq = Math.min(2200, 350 + (this.currentRpm / 9000) * 1800);
      this.filterNode.frequency.setTargetAtTime(filterFreq, this.ctx.currentTime, 0.05);
    }

    this.animFrameId = requestAnimationFrame(this.loopRpm);
  };

  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentRpm() {
    return Math.round(this.currentRpm);
  }
}

export const engineSound = new EngineSoundSynthesizer();

