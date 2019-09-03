import React, {Component} from "react";
import Info from "./scenes/info";
import Weather from "./scenes/weather";


class Forecast extends Component {
  constructor(props) {
    super(props);

    this.state = {
      API_KEY: "d90ac9c73c6a02a42b4cf0bdfbcd3ae9",
      data: undefined,
      inputCity: "Kiev",
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined
    }
  }

  componentDidMount() {
    if (this.state.inputCity !== undefined) {
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}
        &appid=${this.state.API_KEY}&units=metric`)
          .then(response => response.json())
          .then(data => {
            let sunset = data.sys.sunset;
            const date = this.msToTime(sunset);
            this.setState({
              temp: data.main.temp,
              city: data.name,
              country: data.sys.country,
              pressure: data.main.pressure,
              sunset: date,
              error: undefined
            })
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }

  msToTime(duration) {
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
            <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                error={this.state.error}
            />
          </div>
        </section>
    )
  }
}

export default Forecast