import React, {Component} from 'react'


export default class Forecast extends Component {
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
      error: undefined,
      linkToAPI: `http://api.openweathermap.org/data/2.5/weather?q=Kiev
        &appid=d90ac9c73c6a02a42b4cf0bdfbcd3ae9&units=metric`
    }
  }

  /**
   * Component make mounting in process of downloading API
   */
  componentDidMount() {
    if (this.state.inputCity !== undefined) {
      fetch(this.state.linkToAPI)
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

  /**
   * Function converts milliseconds to seconds, minutes, hours
   * @param duration milliseconds
   * @returns {string} readable date
   */
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
            <div className="title">
              <h3>Weather forecast</h3>
            </div>
            <div>
              {this.state.city &&
              <div>
                <p>Location: {this.state.city}, {this.state.country}</p>
                <p>Temperature: {this.state.temp}</p>
                <p>Pressure: {this.state.pressure}</p>
                <p>Sunset: {this.state.sunset}</p>
              </div>
              }
              <p>{this.state.error}</p>
            </div>
          </div>
        </section>
    )
  }
}