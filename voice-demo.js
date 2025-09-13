class VoiceToTextDemo {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
            return;
        }
        this.setupSpeechRecognition();
        this.setupEventListeners();
    }

    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'hi-IN';

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI();
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.updateUI();
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (transcript.trim()) {
                this.handleRecognizedText(transcript);
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;
            this.updateUI();
            alert('Speech recognition error. Please try again.');
        };
    }

    setupEventListeners() {
        document.getElementById('voiceBtn').addEventListener('click', () => {
            if (this.isListening) {
                this.stopListening();
            } else {
                this.startListening();
            }
        });

        document.querySelector('.submit-btn').addEventListener('click', () => {
            const text = document.getElementById('issueDescription').value;
            if (text.trim()) {
                alert('Demo: Report submitted successfully!\n\nText: ' + text);
            } else {
                alert('Please describe the issue first.');
            }
        });
    }

    startListening() {
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Error starting recognition:', error);
        }
    }

    stopListening() {
        try {
            this.recognition.stop();
        } catch (error) {
            console.error('Error stopping recognition:', error);
        }
    }

    async handleRecognizedText(text) {
        const englishText = await this.translateToEnglish(text);
        
        document.getElementById('recognizedText').textContent = englishText;
        document.getElementById('textPreview').classList.remove('hidden');
        document.getElementById('issueDescription').value = englishText;
        document.getElementById('inputIndicator').classList.remove('hidden');
    }

    async translateToEnglish(text) {
        try {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
            const data = await response.json();
            return data[0][0][0] || text;
        } catch (error) {
            console.log('Translation failed:', error);
            return text;
        }
    }

    updateUI() {
        const voiceBtn = document.getElementById('voiceBtn');
        const status = document.getElementById('status');

        if (this.isListening) {
            voiceBtn.textContent = '🎙️ Listening...';
            voiceBtn.classList.add('listening');
            status.classList.remove('hidden');
        } else {
            voiceBtn.textContent = '🎤 Tap to Speak';
            voiceBtn.classList.remove('listening');
            status.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VoiceToTextDemo();
});