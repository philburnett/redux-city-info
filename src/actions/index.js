import axios from 'axios';

const OPEN_WEATHER_API_KEY = '73d351d5decd08bbb8f68bccd376e65b';
const ROOT_WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${OPEN_WEATHER_API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
    const url = `${ROOT_WEATHER_URL}&q=${city},uk`;
    const request = axios.get(url);

    return {
        type: FETCH_WEATHER,
        payload: request,
    };
}