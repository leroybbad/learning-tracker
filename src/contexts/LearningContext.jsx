import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getToday, isSameDay } from '../utils/dateUtils';

// Create context
const LearningContext = createContext();

// Initial learning plan data
const initialLearningData = {
  goals: {
    hoursPerWeek: 10,
    projectsPerWeek: 1,
    subjects: ['HTML', 'CSS', 'JavaScript', 'React', 'UI Libraries', 'API Integration']
  },
  upcomingSteps: [
    // Step 1: HTML & CSS (1-2 Weeks)
    { id: 1, title: "Review MDN's HTML and CSS guides", completed: false, category: "HTML/CSS" },
    { id: 2, title: "Practice Flexbox & CSS Grid layouts", completed: false, category: "HTML/CSS" },
    { id: 3, title: "Review Forms & Input Types", completed: false, category: "HTML/CSS" },
    { id: 4, title: "Learn CSS Variables & Custom Properties", completed: false, category: "HTML/CSS" },
    { id: 5, title: "Master Responsive Design & Media Queries", completed: false, category: "HTML/CSS" },
    { id: 6, title: "Build a simple landing page from scratch", completed: false, category: "HTML/CSS" },
    
    // Step 2: JavaScript (4-6 Weeks)
    { id: 7, title: "Learn JavaScript Variables (let, const)", completed: false, category: "JavaScript" },
    { id: 8, title: "Master Functions (ES6 arrow functions)", completed: false, category: "JavaScript" },
    { id: 9, title: "Practice DOM Manipulation", completed: false, category: "JavaScript" },
    { id: 10, title: "Understand Promises & Async/Await", completed: false, category: "JavaScript" },
    { id: 11, title: "Learn ES6+ Features (destructuring, spread/rest)", completed: false, category: "JavaScript" },
    { id: 12, title: "Build a simple interactive to-do app using plain JS", completed: false, category: "JavaScript" },
    
    // Step 3: React (6-8 Weeks)
    { id: 13, title: "Learn JSX, Components, Props, and State", completed: false, category: "React" },
    { id: 14, title: "Master useEffect() hook", completed: false, category: "React" },
    { id: 15, title: "Handle forms and user input in React", completed: false, category: "React" },
    { id: 16, title: "Practice fetching APIs and handling async data", completed: false, category: "React" },
    { id: 17, title: "Use a UI library (Chakra UI or Material UI)", completed: false, category: "React" },
    { id: 18, title: "Build a weather app with API integration", completed: false, category: "React" },
    { id: 19, title: "Create a dashboard prototype with reusable UI components", completed: false, category: "React" }
  ],
  completedLearning: []
};

export const LearningProvider = ({ children }) => {
  // Use our custom localStorage hook
  const [learningData, setLearningData] = useLocalStorage('learningData', initialLearningData);

  // Add a new learning record
  const addLearningRecord = (record) => {
    const newRecord = {
      ...record,
      id: Date.now(),
      date: new Date().toISOString()
    };

    setLearningData(prevData => ({
      ...prevData,
      completedLearning: [newRecord, ...prevData.completedLearning]
    }));
  };

  // Get today's goal
  const getTodayGoal = () => {
    // Check if there's a completed entry for today
    const todayEntry = learningData.completedLearning.find(entry => 
      isSameDay(new Date(entry.date), getToday())
    );

    if (todayEntry) {
      return {
        completed: true,
        text: `You've already logged ${todayEntry.duration} minutes of learning today! Great job!`
      };
    }

    // If not completed, show the next uncompleted step
    const nextStep = learningData.upcomingSteps.find(step => !step.completed);
    
    return {
      completed: false,
      text: nextStep 
        ? `Today's goal: ${nextStep.title}`
        : "Set your next learning goal!"
    };
  };

  // Get weekly stats
  const getWeeklyStats = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    
    const thisWeekEntries = learningData.completedLearning.filter(entry => 
      new Date(entry.date) >= oneWeekAgo
    );
    
    const totalMinutes = thisWeekEntries.reduce((sum, entry) => sum + parseInt(entry.duration), 0);
    const uniqueSkills = [...new Set(thisWeekEntries.map(entry => entry.skill))].length;
    
    return {
      hoursLogged: (totalMinutes / 60).toFixed(1),
      sessionsCompleted: thisWeekEntries.length,
      skillsCovered: uniqueSkills,
      targetHours: learningData.goals.hoursPerWeek,
      targetProjects: learningData.goals.projectsPerWeek
    };
  };

  // Complete a step
  const completeStep = (stepId) => {
    setLearningData(prevData => ({
      ...prevData,
      upcomingSteps: prevData.upcomingSteps.map(step => 
        step.id === stepId ? { ...step, completed: true } : step
      )
    }));
  };

  // Add a new step
  const addStep = (stepTitle, category = "Other") => {
    const newStep = {
      id: Date.now(),
      title: stepTitle,
      category: category,
      completed: false
    };

    setLearningData(prevData => ({
      ...prevData,
      upcomingSteps: [...prevData.upcomingSteps, newStep]
    }));
  };

  // Reset steps to initial data
  const resetSteps = () => {
    setLearningData(prevData => ({
      ...prevData,
      upcomingSteps: initialLearningData.upcomingSteps,
      goals: initialLearningData.goals
    }));
  };

  // Value object to be provided to consumers
  const value = {
    learningData,
    addLearningRecord,
    getTodayGoal,
    getWeeklyStats,
    completeStep,
    addStep,
    resetSteps
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

// Custom hook for using the context
export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};