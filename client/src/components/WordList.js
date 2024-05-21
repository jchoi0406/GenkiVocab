import React, { useState, useEffect } from 'react';

function WordList({ words, setWords, selectedLesson}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [shuffledMeanings, setShuffledMeanings] = useState([]);
  const [score, setScore] = useState(0);


  useEffect(() => {
    if (words.length > 0) {
      const currentWord = words[currentWordIndex];
      const shuffled = shuffleArray(
        words.filter((word) => word !== currentWord).map((word) => word.meaning)
      );
      const randomIndex = Math.floor(Math.random() * 4);
      shuffled.splice(randomIndex, 0, currentWord.meaning);
      setShuffledMeanings(shuffled);
    }
  }, [words, currentWordIndex]);

  const shuffleArray = (array) => {
    // Implement Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleAnswerClick = (meaning) => {
    if (words.length > 0) {
      const currentWord = words[currentWordIndex];
      const isCorrect = meaning === currentWord.meaning;
      isCorrect ? setScore(score+1):setScore(score);
  
      // Trigger a new fetch request for a new batch of words based on the selected lesson
      fetch(`/learn/${selectedLesson}`) // Adjusted fetch URL to include selectedLesson
        .then(res => res.json())
        .then(data => {
          setWords(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  };
  
  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  const currentWord = words[currentWordIndex];

  return (
    <div>
      <div className='score'>
        {score}
      </div>
      <div className='japaneseWord'>{currentWord.kana}</div>
      <div>
        {shuffledMeanings.map((meaning, index) => (
          <button key={index} className='answers' onClick={() => handleAnswerClick(meaning)}>
            {meaning}
          </button>
        ))}
      </div>
    </div>
  );
}

export default WordList;
