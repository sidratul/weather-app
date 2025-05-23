import express from 'express';
import axios, { AxiosError } from 'axios';
import { OpenWeather, Weather } from '../app/weather';

export const weaterRouter = express.Router();

weaterRouter.get('/:city', (req, res) => {
  const apiUrl = process.env['WEATHER_API_URL'] || 'https://api.openweathermap.org/data/2.5/weather';
  const apiKey = process.env['WEATHER_API_KEY'];
  const city = req.params.city;

  const url = `${apiUrl}?q=${city}&APPID=${apiKey}&units=metric`
  axios.get<OpenWeather>(url)
    .then(data => {
      const openWeatherData = data.data;
      const weather: Weather = {
        ...openWeatherData.main,
        ...openWeatherData.weather[0],
        wind: openWeatherData.wind,
      }

      weather.icon = `https://openweathermap.org/img/wn/${weather.icon}.png`;
      res.json(weather);
    })
    .catch(err => {
      let errorMessage = 'Internal server error.'
      if(err instanceof AxiosError) {
        console.log(err.response?.data?.message);
        if(err.status === 404) {
          errorMessage = "City not found";
        }
      } else {
        console.log(err.message);
      }

      res.status(500).json({"message": errorMessage})
    })
});
