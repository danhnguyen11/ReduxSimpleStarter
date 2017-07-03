import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Chart from '../components/chart'

class WeatherList extends Component {
    renderWeather(cityData){
        const name = cityData.city.name;
        const temps =_.map(cityData.list.map(weather => weather.main.temp), (temp) => (temp-273)*1.8+32);
        const pressures =cityData.list.map(weather => weather.main.pressure)
        const humidities =cityData.list.map(weather => weather.main.humidity)
        return (
            
            <tr key={name}>
                <td className="col-md-3"><em>{name}</em></td>
                <td className="col-md-3"><Chart data={temps} color="yellow" units="F" /></td>
                <td className="col-md-3"><Chart data={pressures} color="green" units="hPa" /></td>
                <td className="col-md-3"><Chart data={humidities} color="black" units="%" /></td>
            </tr>
        )
    } 
    render () {
        return(
            <div className="row">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-md-3">City</th>
                        <th className="col-md-3">Temperature (K)</th>
                        <th className="col-md-3">Pressure (hPa)</th>
                        <th className="col-md-3">Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>   
                    {this.props.weather.map(this.renderWeather)}              
                </tbody>
            </table>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {weather : state.weather};
}

export default connect(mapStateToProps)(WeatherList);