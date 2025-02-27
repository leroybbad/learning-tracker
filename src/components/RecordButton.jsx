import React from 'react';

const RecordButton = ({ onClick }) => {
  return (
    <button className="record-button" onClick={onClick}>
      Record My Learning
    </button>
  );
};

export default RecordButton;