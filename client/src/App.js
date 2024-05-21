import React, {useState, useEffect} from 'react'
import './App.css'; // Import the CSS file
import WordList from './components/WordList';
import HomePage from './components/HomePage';
function App() {
  const [data, setData] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  useEffect(() => {
    if (selectedLesson !== null) {
      fetch(`/learn/${selectedLesson}`)
        .then(res => res.json())
        .then(data => {
          setData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedLesson]);
const handleSelectLesson = (lesson) => {
  setSelectedLesson(lesson);
};
return (
  <div className="App">
    {selectedLesson === null ? (
      <HomePage onSelectLesson={handleSelectLesson} /> // Render HomePage component
    ) : (
      <WordList words={data} setWords={setData} selectedLesson={selectedLesson}/>
    )}
  </div>
);
}

export default App;