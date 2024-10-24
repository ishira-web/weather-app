import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  const [city, setCity] = useState("Galle");
  const [inputCity, setInputCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '27f895820b481b07bbe412d5bb344f47';

  // Weather Data Function
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch data on city change
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  // Update the input field value as user types
  const handleInputChange = (event) => {
    setInputCity(event.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();  // Prevent page refresh
    setCity(inputCity);      // Update city state with the input value
    setInputCity("");        // Clear the input field after submission
  };

  // Function to get weather image based on weather condition
  const getWeatherImage = () => {
    if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
      return './default.png';  // Default image in case weather data is unavailable
    }

    const weatherCondition = weatherData.weather[0].main;  // Get the main weather condition

    // Map weather conditions to images
    const weatherImages = {
      Clear: './supersun.png',
      Rain: './rain_with_cloud.png',
      Clouds: './cloude.png',
      Snow : './snow',
      Drizzle: './drizzle.png',
      Thunderstorm: './thunder.png',
      Mist: './mist.png',
    };

    return weatherImages[weatherCondition] || './default.png';  // Return corresponding image or a default one
  };

  return (
    <div className="App">
      <div className='container'>
        <h1 className='container_date'>{formattedDate}</h1>
        <div className='weather_data'>
          <h2 className='container_city'>{city}</h2>  {/* Display the city name */}
          <img className='container_image' src={getWeatherImage()} width={180} alt="weather-icon" />  {/* Dynamically change the image */}
          <div className='container_degree'>{weatherData?.main?.temp ? (weatherData.main.temp - 273.15).toFixed(2) : 'Loading...'}</div>
          <h2 className='country_per'>{weatherData?.weather?.[0]?.description || 'Loading...'}</h2>
          <form className='form' onSubmit={handleFormSubmit}> {/* Form submission */}
            <input
              type='text'
              className='input'
              placeholder='Enter city name'
              value={inputCity}  // Bind the input field to inputCity state
              onChange={handleInputChange}
            />
            <button type='submit'>Get</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
