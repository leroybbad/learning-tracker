import React, { useState } from 'react';
import { useLearning } from '../contexts/LearningContext';
import { triggerParticleEffect } from '../utils/particleEffects';

const RecordSheet = ({ isOpen, onClose }) => {
  const { addLearningRecord, learningData } = useLearning();
  const [duration, setDuration] = useState('');
  const [skill, setSkill] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!duration || !skill) return;
    
    addLearningRecord({
      duration: parseInt(duration, 10),
      skill,
      notes
    });
    
    // Reset form
    setDuration('');
    setSkill('');
    setNotes('');
    
    // Close sheet
    onClose();
    
    // Trigger particle effect with custom message
    setTimeout(() => {
      triggerParticleEffect("LEVEL UP!");
    }, 300); // Small delay to let the sheet close first
  };

  return (
    <div className={`sheet-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header">
          <div className="sheet-title">Record Learning Session</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="duration">
              Learning Duration (minutes)
            </label>
            <input
              id="duration"
              type="number"
              className="form-input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="skill">
              What did you learn?
            </label>
            <select
              id="skill"
              className="form-select"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            >
              <option value="">Select a skill...</option>
              {learningData.goals.subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="notes">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              className="form-textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you learn? Any challenges?"
            ></textarea>
          </div>
          
          <div className="button-group">
            <button
              type="button"
              className="button button-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button button-primary"
              disabled={!duration || !skill}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordSheet;