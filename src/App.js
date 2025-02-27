import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodayGoal from './components/TodayGoal';
import UpcomingSteps from './components/UpcomingSteps';
import CompletedSteps from './components/CompletedSteps';
import RecordButton from './components/RecordButton';
import RecordSheet from './components/RecordSheet';
import { LearningProvider } from './contexts/LearningContext';

function App() {
  const [isRecordSheetOpen, setIsRecordSheetOpen] = useState(false);

  const openRecordSheet = () => {
    setIsRecordSheetOpen(true);
  };

  const closeRecordSheet = () => {
    setIsRecordSheetOpen(false);
  };

  return (
    <LearningProvider>
      {/* Main content container */}
      <div className="app">
        <div className="container">
          <Header />
          <TodayGoal />
          <UpcomingSteps />
          <CompletedSteps />
        </div>
      </div>
      
      {/* Button positioned outside the main container */}
      <div className="floating-button-container">
        <RecordButton onClick={openRecordSheet} />
      </div>
      
      <RecordSheet isOpen={isRecordSheetOpen} onClose={closeRecordSheet} />
    </LearningProvider>
  );
}

export default App;