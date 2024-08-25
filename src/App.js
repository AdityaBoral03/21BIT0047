import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const options = [
  { value: "Alphabets", label: "Alphabets" },
  { value: "Numbers", label: "Numbers" },
  { value: "Highest lowercase alphabet", label: "Highest lowercase alphabet" }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post('YOUR_API_ENDPOINT', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON or API Error');
      setResponse(null);
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected || []);
  };

  const renderResponse = () => {
    if (!response) return null;

    let filteredResponse = response.data;

    // Filter for Alphabets
    if (selectedOptions.some(option => option.value === 'Alphabets')) {
      filteredResponse = filteredResponse.filter(item => /[a-zA-Z]/.test(item));
    }

    // Filter for Numbers
    if (selectedOptions.some(option => option.value === 'Numbers')) {
      filteredResponse = filteredResponse.filter(item => /[0-9]/.test(item));
    }

    // Filter for Highest Lowercase Alphabet
    if (selectedOptions.some(option => option.value === 'Highest lowercase alphabet')) {
      const lowercaseAlphabets = filteredResponse.filter(item => /[a-z]/.test(item));
      const highestLowercase = lowercaseAlphabets.length > 0
        ? String.fromCharCode(Math.max(...lowercaseAlphabets.map(char => char.charCodeAt(0))))
        : null;
      filteredResponse = highestLowercase ? [highestLowercase] : [];
    }

    return (
      <div className="response-container">
        <h3>Filtered Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="app-container">
      <h1>JSON Input</h1>
      <form onSubmit={handleJsonSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON { "data": ["A", "1", "z", "B"] }'
          className="json-input"
        />
        <h1>Filtering Options</h1>
        <Select
          options={options}
          onChange={handleSelectChange}
          value={selectedOptions}
          isMulti
          className="multi-select"
        /><br></br>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {renderResponse()}
    </div>
  );
}

export default App;
