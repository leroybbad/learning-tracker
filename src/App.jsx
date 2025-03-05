import React, { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import TodayGoal from './components/TodayGoal.jsx';
import UpcomingSteps from './components/UpcomingSteps.jsx';
import CompletedSteps from './components/CompletedSteps.jsx';
import RecordButton from './components/RecordButton.jsx';
import RecordSheet from './components/RecordSheet.jsx';
import { LearningProvider } from './contexts/LearningContext.jsx';

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
      <div className="app">
        <div className="container">
          <Header />
          <TodayGoal />
          <UpcomingSteps />
          <CompletedSteps />
        </div>
      </div>
      <RecordButton onClick={openRecordSheet} />
      <RecordSheet isOpen={isRecordSheetOpen} onClose={closeRecordSheet} />
    </LearningProvider>
  );
}

export default App;