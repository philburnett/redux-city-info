import { combineReducers } from 'redux';
import WeatherReducer from './weather.js';

const rootReducer = combineReducers({
    weather: WeatherReducer
});

export default rootReducer;