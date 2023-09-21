import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv'
dotenv.config()
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';




const DB_PASSWORD = process.env.DB_PASSWORD
const DB_USER = process.env.DB_USER
const DB_HOST = process.env.DB_HOST
 const apiKey= process.env.API_KEY;
const apiHost= process.env.API_HOST;

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: 'aremartour',
    logging: false, // Establece a console.log para ver las consultas SQL en bruto
    native: false, // Permite a Sequelize saber que podemos usar pg-native para ~30% más de velocidad
  });


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
 console.log(response.data.data.flights);
  } catch (error) {
    console.error(error);
  }
};

obtener();



// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
const modelDefiners: any[] = [];
const basename: string = path.basename(__filename);

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
// const entries = Object.entries(sequelize.models);
// const capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);
