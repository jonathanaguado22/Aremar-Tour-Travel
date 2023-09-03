import axios, { AxiosResponse } from 'axios';

const options = {
    method: 'GET',
    url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlightsMultiCity',
  params: {
    legs: '[{"sourceAirportCode":"DFW","destinationAirportCode":"LON","date":"2023-10-18"},{"sourceAirportCode":"LON","destinationAirportCode":"BOS","date":"2023-10-26"}]',
    classOfService: 'ECONOMY',
    sortOrder: 'ML_BEST_VALUE',
    currencyCode: 'USD'
  },
  headers: {
    'X-RapidAPI-Key': '72df4f33f4msh406ce806b046728p10f4b9jsn5ccb5588aa58',
    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
    }
  };

const obtener = async () => {
  try {
    const response: AxiosResponse = await axios.request(options);
    console.log(response.data.data);
  } catch (error) {
    console.error(error);
  }
};

obtener();

