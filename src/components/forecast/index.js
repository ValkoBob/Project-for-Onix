import React, {Component} from "react";
import Info from "./scenes/info";
import Form from "./scenes/form";
import Weather from "./scenes/weather";


class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      API_KEY: "d90ac9c73c6a02a42b4cf0bdfbcd3ae9",
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined
    }
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    try {
      if (city) {
        const api_url =
            await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}
        &appid=${this.state.API_KEY}&units=metric`);
        const data = await api_url.json();
        let sunset = data.sys.sunset;
        const date = Forecast.msToTime(sunset);
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          pressure: data.main.pressure,
          sunset: date,
          error: undefined
        })
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunset: undefined,
          error: "Enter name of city!"
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  static msToTime(duration) {
    let seconds, minutes, hours, date = new Date();
    date.setTime(duration);
    hours = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
    minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
    seconds = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();

    return hours + ":" + minutes + ":" + seconds;
  }

  render() {
    return (
        <section className="container">
          <div className="forecast">
            <Info/>
            <Form weatherMethod={this.getWeather}/>
            <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                eror={this.state.error}
            />
          </div>
        </section>
    )
  }
}

export default Forecast