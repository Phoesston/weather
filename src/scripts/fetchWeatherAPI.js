const API_KEY = "UMV8FJHJSU28EEFG8BBPZRAN9";

export async function getWeather(location){   
     try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}`);

        if(!response.ok){
            throw new Error('Location was not found');
        }

      const processedData = await response.json();

      console.log('processed data: ', processedData);

      return processedData;

     } catch(error){
        console.error('Fetching Error: ', error);
        throw error;
     }

}





