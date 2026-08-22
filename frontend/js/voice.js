/**
 * NyayaSetu Voice Input Controller
 * Native browser Web Speech API integration with microphone state handling & fallback.
 */

const VoiceInput = {
  recognition: null,
  isListening: false,
  targetElement: null,
  buttonElement: null,

  init(options = {}) {
    this.targetElement = options.target || document.getElementById('hero-query-input');
    this.buttonElement = options.button || document.getElementById('mic-btn');

    if (!this.buttonElement || !this.targetElement) return;

    // Check browser Web Speech API support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log('Web Speech API not supported in this browser.');
      this.buttonElement.title = "Voice input isn't supported in this browser. You can type your problem instead.";
      this.buttonElement.addEventListener('click', () => {
        alert("Voice input isn't supported in this browser. You can type your problem instead.");
      });
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN'; // Multi-lingual default for Indian accent / English

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateUIState(true);
      };

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }

        if (this.targetElement) {
          // Append or set transcript
          const currentVal = this.targetElement.getAttribute('data-base-text') || '';
          this.targetElement.value = currentVal ? `${currentVal} ${transcript}` : transcript;
          
          // Trigger input event for auto-grow & clear button
          this.targetElement.dispatchEvent(new Event('input'));
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        this.stopListening();
      };

      this.recognition.onend = () => {
        this.stopListening();
      };

      this.buttonElement.addEventListener('click', () => {
        if (this.isListening) {
          this.stopListening();
        } else {
          this.startListening();
        }
      });
    } catch (err) {
      console.warn('Failed to initialize Speech Recognition:', err);
    }
  },

  startListening() {
    if (!this.recognition) return;
    try {
      if (this.targetElement) {
        // Save current base text
        this.targetElement.setAttribute('data-base-text', this.targetElement.value.trim());
      }
      this.recognition.start();
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
    this.updateUIState(false);
  },

  updateUIState(listening) {
    if (!this.buttonElement) return;

    const labelSpan = this.buttonElement.querySelector('.mic-label');

    if (listening) {
      this.buttonElement.classList.add('listening');
      this.buttonElement.setAttribute('aria-pressed', 'true');
      if (labelSpan) labelSpan.textContent = 'Listening...';
    } else {
      this.buttonElement.classList.remove('listening');
      this.buttonElement.setAttribute('aria-pressed', 'false');
      if (labelSpan) labelSpan.textContent = 'Speak';
    }
  }
};

window.VoiceInput = VoiceInput;
