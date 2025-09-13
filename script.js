// VoiceToTextComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceToTextComponent = ({ onTextReceived, onLanguageDetected }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');

  const supportedLanguages = [
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn-IN', name: 'Bengali', flag: '🇧🇩' },
    { code: 'te-IN', name: 'Telugu', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'Tamil', flag: '🇮🇳' },
    { code: 'mr-IN', name: 'Marathi', flag: '🇮🇳' },
    { code: 'en-IN', name: 'English', flag: '🇬🇧' }
  ];

  useEffect(() => {
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechResults = (event) => {
      const text = event.value[0];
      setRecognizedText(text);
      onTextReceived(text);
      onLanguageDetected(selectedLanguage);
    };
    Voice.onSpeechError = (error) => {
      console.log('Speech Error:', error);
      setIsListening(false);
      Alert.alert('Voice Recognition Error', 'Please try again');
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    try {
      await Voice.start(selectedLanguage);
    } catch (error) {
      console.log('Start Listening Error:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log('Stop Listening Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Language Selection */}
      <View style={styles.languageSelector}>
        {supportedLanguages.slice(0, 4).map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              selectedLanguage === lang.code && styles.selectedLanguage
            ]}
            onPress={() => setSelectedLanguage(lang.code)}
          >
            <Text style={styles.languageText}>
              {lang.flag} {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Voice Recording Button */}
      <TouchableOpacity
        style={[styles.voiceButton, isListening && styles.listeningButton]}
        onPress={isListening ? stopListening : startListening}
      >
        <Text style={styles.voiceButtonText}>
          {isListening ? '🎙️ Listening...' : '🎤 Tap to Speak'}
        </Text>
      </TouchableOpacity>

      {/* Real-time Status */}
      {isListening && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            🔴 Recording in {supportedLanguages.find(l => l.code === selectedLanguage)?.name}
          </Text>
        </View>
      )}

      {/* Recognized Text Preview */}
      {recognizedText ? (
        <View style={styles.textPreview}>
          <Text style={styles.previewLabel}>Recognized Text:</Text>
          <Text style={styles.previewText}>{recognizedText}</Text>
        </View>
      ) : null}
    </View>
  );
};
