import React from 'react';
import { useNavigate } from 'react-router-dom';
import CandidateOnboarding from '../components/Onboarding/CandidateOnboarding';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleOnboardingComplete = (formData) => {
    // TODO: Save onboarding data to user profile
    console.log('Onboarding completed with data:', formData);
    
    // Show success message and redirect
    alert('Profile setup completed successfully! Welcome to Germany Assist.');
    navigate('/');
  };

  return (
    <CandidateOnboarding 
      onComplete={handleOnboardingComplete}
      isStandalone={true}
    />
  );
};

export default OnboardingPage;
