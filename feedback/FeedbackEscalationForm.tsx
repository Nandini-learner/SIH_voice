// src/components/FeedbackEscalationForm.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

interface Props {
  reportId: string;
  dateReported: string;
  location: string;
  category: string;
  onSubmit: (data: any) => void;
}

const FeedbackEscalationForm: React.FC<Props> = ({
  reportId,
  dateReported,
  location,
  category,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [dateReceived, setDateReceived] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Feedback Escalation Form</Text>

      <Text style={styles.label}>Issue Reference ID</Text>
      <Text style={styles.value}>{reportId}</Text>

      <Text style={styles.label}>Date Reported</Text>
      <Text style={styles.value}>{dateReported}</Text>

      <Text style={styles.label}>Location</Text>
      <Text style={styles.value}>{location}</Text>

      <Text style={styles.label}>Category</Text>
      <Text style={styles.value}>{category}</Text>

      <Text style={styles.sectionHeader}>Higher Authority Acknowledgment</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Position</Text>
      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
        placeholder="Enter your position"
      />

      <Text style={styles.label}>Department</Text>
      <TextInput
        style={styles.input}
        value={department}
        onChangeText={setDepartment}
        placeholder="Enter department"
      />

      <Text style={styles.label}>Date Received</Text>
      <TextInput
        style={styles.input}
        value={dateReceived}
        onChangeText={setDateReceived}
        placeholder="DD/MM/YYYY"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmit({ name, position, department, dateReceived });
        }}
      >
        <Text style={styles.buttonText}>Submit Escalation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 15
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default FeedbackEscalationForm;