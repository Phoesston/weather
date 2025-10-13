import { getWeather, searchLocation } from './fetchWeatherAPI.js';
import { getCitySuggestions } from './autoComplete.js';

const input = document.getElementById('cityInput');
const suggestions = document.getElementById('suggestions');
const weatherInfo = document.getElementById('weatherInfo');

let location = 'Tampa'

input.addEventListener('keypress', async (e) => {
    if(e.key == 'Enter'){
        e.preventDefault();
        location = input.value.trim();
        if(location){
           try{
            const processedData = await getWeather(location);

            const current = processedData.currentConditions;

            weatherInfo.innerHTML = `
                    <p>Resolved Address: ${processedData.resolvedAddress}</p>
                    <p>Temperature: ${current.temp}°F</p>
                    <p>humidity: ${current.humidity}</p>
                    <p>Condition: ${current.icon}</p>
                    <p>Uv Index: ${current.uvindex}</p>
                    <p>description: ${processedData.description}</p>
                 
                `;
           }catch(error){
            weatherInfo.innerHTML = `<p>Error fetching weather: ${error.message}</p>`;
           }
        }
    }
    
});



