import React from "react";
import { useState } from "react";

import './App.css';

const api = {
  key: "1e23aeb8adc1f1fe8ca598dbaa1dc5b9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
// ye usestate input store krne ke liye
  const [query, setQuery] = useState("");

  const [input, setInput] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    // iss response se hmara result json m create ho jayega
      .then(res => res.json())
      // uss api ka response se humne setInput update kr diya
      .then(result => {
        setInput(result);
      // ye setquery null isliye define kri h kyuki humne return m setquery ko target value assign krwa di h
        setQuery('');
      // console.log(result);
      });
    }
   
  }



  
  const dateBuilder = (d) => {

// ye month ki list isliye bnayi taki ye string me month or day ki value de sake
// getDay() fun se only wo integers m value dega like Mon h to 1, Tue h to 2 and soon
// getMonth() fun se bhi only integers m value aayegi like june h to wo 6 integer value dega naa ki june

    let months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December']

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
  'Thursday', 'Friday', 'Saturday']

    let date = d.getDate();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof input.main != "undefined") 
    ? ((input.main.temp > 15 && input.main.temp < 27) 
    ? 'app cloudy' 
    : (input.main.temp > 30 && input.main.temp < 40) 
    ? 'app rainy' 
    : 'app night')
    : 'app'}>

      <main>
        {/* // this div is for controlling search box */}
        <div className='search-box'> 
          <input type="text"
          placeholder='Search...'
          className='user-input' 
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={search} />
        </div>
        {(typeof input.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{input.name}, {input.sys.country}</div>
              <div className='dates'>{dateBuilder(new Date())}</div>
            </div>
              <div className='weather-box'>
                <div className='temp'>
                  {Math.round(input.main.temp)}<span>&#8451;</span></div>
      {/* ye span temp ko degree ke symbol m likhega
      and for css  - span {
        content: "\2103";
      } */}

                <div className='weather-day'>{input.weather[0].main}</div>
        </div>
        </div>
        ) : ('') }
      </main>
    </div>
    
    
  );
}

export default App;
