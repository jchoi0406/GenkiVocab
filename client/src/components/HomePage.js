import React from 'react';

function HomePage({ onSelectLesson }) {
  return (
    <div className="lesson-menu">
      <h2>Choose a Lesson:</h2>
      <ul>
        {[1, 2, 3, 4, 5, 6].map(lesson => (
          <li key={lesson}>
            <button onClick={() => onSelectLesson(lesson)}>Lesson {lesson}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;