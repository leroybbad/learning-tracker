import React from 'react';
import { useLearning } from '../contexts/LearningContext.jsx';

const TodayGoal = () => {
  const { getTodayGoal, getWeeklyStats } = useLearning();
  const todayGoal = getTodayGoal();
  const stats = getWeeklyStats();

  return (
    <div className="section">
      <div className="today-goal">
        <h2>Today</h2>
        <p>{todayGoal.text}</p>
      </div>

      <div className="metrics-dashboard">
        <div className="metric-card">
          <div className="metric-label">Hours This Week</div>
          <div className="metric-value">{stats.hoursLogged}</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${Math.min(100, (stats.hoursLogged / stats.targetHours) * 100)}%` }}
            ></div>
          </div>
          <div className="metric-label">Target: {stats.targetHours}h</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Sessions</div>
          <div className="metric-value">{stats.sessionsCompleted}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Skills</div>
          <div className="metric-value">{stats.skillsCovered}</div>
        </div>
      </div>
    </div>
  );
};

export default TodayGoal;