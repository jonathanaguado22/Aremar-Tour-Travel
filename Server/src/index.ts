import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv'
dotenv.config()







 const apiKey= process.env.API_KEY;
const apiHost= process.env.API_HOST;


const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlightsMultiCity',
  params: {
    legs: '[{"sourceAirportCode":"DFW","destinationAirportCode":"LON","date":"2023-10-18"},{"sourceAirportCode":"LON","destinationAirportCode":"DFW","date":"2023-10-26"}]',
    classOfService: 'ECONOMY',
    sortOrder: 'ML_BEST_VALUE',
    currencyCode: 'USD'
  },
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': apiHost
    }
  };

const obtener = async () => {
  try {
    const response: AxiosResponse = await axios.request(options);
 //console.log(response.data.data.flights);
  } catch (error) {
    console.error(error);
  }
};

obtener();

