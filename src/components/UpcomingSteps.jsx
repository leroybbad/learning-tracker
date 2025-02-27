import React, { useState } from 'react';
import { useLearning } from '../contexts/LearningContext';

const UpcomingSteps = () => {
  const { learningData, completeStep, addStep, resetSteps } = useLearning();
  const [isExpanded, setIsExpanded] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepCategory, setNewStepCategory] = useState('Other');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Define category colors
  const categoryColors = {
    'HTML/CSS': '#2196F3', // Blue
    'JavaScript': '#FFC107', // Amber
    'React': '#4CAF50', // Green
    'Other': '#9E9E9E' // Gray
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    if (newStepTitle.trim()) {
      addStep(newStepTitle, newStepCategory);
      setNewStepTitle('');
    }
  };

  const handleReset = () => {
    if (showResetConfirm) {
      resetSteps();
      setShowResetConfirm(false);
    } else {
      setShowResetConfirm(true);
    }
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  // Group steps by category
  const getGroupedSteps = () => {
    const uncompleted = learningData.upcomingSteps.filter(step => !step.completed);
    
    // Get unique categories
    const categories = [...new Set(uncompleted.map(step => step.category))];
    
    // Create the grouped object
    return categories.map(category => ({
      category,
      steps: uncompleted.filter(step => step.category === category)
    }));
  };

  return (
    <div className="section">
      <div className="accordion">
        <div className="accordion-header" onClick={handleToggle}>
          <span>Upcoming Steps</span>
          <span>{isExpanded ? '▲' : '▼'}</span>
        </div>
        {isExpanded && (
          <div className="accordion-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <h3 style={{ margin: 0 }}>Learning Path</h3>
              {showResetConfirm ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={cancelReset}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#f5f5f5',
                      color: '#333',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Confirm Reset
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleReset}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#f5f5f5',
                    color: '#333',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Reset Steps
                </button>
              )}
            </div>
            
            {/* Category legend */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              {Object.entries(categoryColors).map(([category, color]) => (
                <div 
                  key={category} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '5px',
                    marginRight: '10px'
                  }}
                >
                  <div 
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      backgroundColor: color,
                      borderRadius: '50%'
                    }}
                  ></div>
                  <span style={{ fontSize: '12px' }}>{category}</span>
                </div>
              ))}
            </div>
            
            {learningData.upcomingSteps.filter(step => !step.completed).length > 0 ? (
              <>
                {getGroupedSteps().map(group => (
                  <div key={group.category} style={{ marginBottom: '20px' }}>
                    <h4 style={{ 
                      margin: '10px 0', 
                      color: categoryColors[group.category] || '#333'
                    }}>
                      {group.category}
                    </h4>
                    <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
                      {group.steps.map(step => (
                        <li key={step.id} style={{ 
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'flex-start',
                          position: 'relative'
                        }}>
                          <div style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: categoryColors[step.category] || '#9E9E9E',
                            marginTop: '6px',
                            marginRight: '8px',
                            flexShrink: 0
                          }}></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: '4px' }}>{step.title}</div>
                            <button 
                              onClick={() => completeStep(step.id)}
                              style={{
                                padding: '4px 8px',
                                backgroundColor: '#4caf50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              Complete
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <form onSubmit={handleAddStep} style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="text"
                      value={newStepTitle}
                      onChange={(e) => setNewStepTitle(e.target.value)}
                      placeholder="Add a new step..."
                      className="form-input"
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <select
                        value={newStepCategory}
                        onChange={(e) => setNewStepCategory(e.target.value)}
                        className="form-select"
                        style={{ flex: 1 }}
                      >
                        {Object.keys(categoryColors).map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <button 
                        type="submit" 
                        className="button button-primary"
                        disabled={!newStepTitle.trim()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <p>No upcoming steps. Add some or click "Reset Steps" to restore the default learning path.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSteps;