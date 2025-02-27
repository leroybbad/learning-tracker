import React, { useState } from 'react';
import { useLearning } from '../contexts/LearningContext.jsx';
import { formatDate } from '../utils/dateUtils';

const CompletedSteps = () => {
  const { learningData } = useLearning();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="section">
      <div className="accordion">
        <div className="accordion-header" onClick={handleToggle}>
          <span>Completed Learning</span>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </div>
        {isExpanded && (
          <div className="accordion-content">
            {learningData.completedLearning.length > 0 ? (
              <div>
                {learningData.completedLearning.map((item) => (
                  <div key={item.id} className="completed-item">
                    <div className="completed-date">
                      {formatDate(item.date)}
                    </div>
                    <div>
                      Learned <span className="completed-skill">{item.skill}</span> for 
                      <span className="completed-time"> {item.duration} minutes</span>
                    </div>
                    {item.notes && <div className="completed-notes">{item.notes}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <p>No completed learning sessions yet. Start learning!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedSteps;