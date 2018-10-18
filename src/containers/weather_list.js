import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';
import _ from 'lodash';
import Map from './../components/map';

class WeatherList extends Component {

    constructor(props) {
        super(props);

        this.renderWeather = this.renderWeather.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    renderWeather(cityData) {

        const temps = cityData.list.map((data) => {
            return data.main.temp;
        });

        const humidity = cityData.list.map((data) => {
            return data.main.humidity;
        });

        const pressure = cityData.list.map((data) => {
            return data.main.pressure;
        });

        return (
            <tr>
                <td>
                    <Map lat={cityData.city.coord.lat} lon={cityData.city.coord.lon} />
                </td>
                <td>
                    {this.renderChart(temps, "red", "K")}
                </td>
                <td>
                    {this.renderChart(humidity, "orange", "hPa")}
                </td>
                <td>
                    {this.renderChart(pressure, "yellow", "%")}
                </td>
            </tr>
        );
    }

    average(data) {
        return _.round(_.sum(data) / data.length);
    }

    renderChart(data, color, unit) {
        return (
            <div>
                <Sparklines data={data} height={100} width={150}>
                    <SparklinesLine color={color} />
                    <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <div>{this.average(data)} {unit}</div>
            </div>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature (K)</th>
                    <th>Pressure (hPa)</th>
                    <th>Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({weather}) {
    return {weather};
}

export default connect(mapStateToProps)(WeatherList);