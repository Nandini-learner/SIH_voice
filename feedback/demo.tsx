import React from 'react';
import FeedbackEscalationForm from './FeedbackEscalationForm';

const Demo = () => {
  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <FeedbackEscalationForm
      reportId="REP-2024-001"
      dateReported="15/01/2024"
      location="Main Street, City Center"
      category="Infrastructure"
      onSubmit={handleSubmit}
    />
  );
};

export default Demo;