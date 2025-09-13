// In your main civic reporting screen
import VoiceToTextComponent from './VoiceToTextComponent';

const CivicReportingScreen = () => {
  const [issueDescription, setIssueDescription] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [inputMethod, setInputMethod] = useState('text');

  const handleVoiceText = (text) => {
    setIssueDescription(text);
    setInputMethod('voice');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Report Civic Issue</Text>
      
      {/* Voice Input Component */}
      <VoiceToTextComponent
        onTextReceived={handleVoiceText}
        onLanguageDetected={setDetectedLanguage}
      />
      
      {/* Show input method indicator for demo appeal */}
      {inputMethod === 'voice' && (
        <View style={styles.inputIndicator}>
          <Text style={styles.indicatorText}>
            📝 Voice input detected ({detectedLanguage})
          </Text>
        </View>
      )}
      
      {/* Your existing form components continue here */}
    </View>
  );
};
