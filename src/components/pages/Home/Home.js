import React, { Component } from 'react';
import HomeView from './HomeView';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedByFunc: false,
      sortedByBubble: false,
      events: [
        {
          date: '1994',
          event: 'BirthDay'
        },
        {
          date: '2000',
          event: 'Start to study at school'

        },
        {
          date: '2008',
          event: 'Start to study in another school'

        },
        {
          date: '2010',
          event: 'End the school'

        },
        {
          date: '2010',
          event: 'Start to study in SPI'

        },
        {
          date: '2015',
          event: 'Graduated from Institute'
        },
        {
          date: '2015',
          event: 'Start to study in KDPU'
        },
        {
          date: '2017',
          event: 'Graduated from University'
        },
        {
          date: '2018',
          event: 'Start to study Programming'

        }
      ],
      selected: [],
      text: '',
      year: '',
      lastText: '',
      lastYear: '',
      API_KEY: 'd90ac9c73c6a02a42b4cf0bdfbcd3ae9',
      data: undefined,
      inputCity: 'Kiev',
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined,
      linkToAPI: `http://api.openweathermap.org/data/2.5/weather?q=Kiev
        &appid=d90ac9c73c6a02a42b4cf0bdfbcd3ae9&units=metric`
    };
  }

  /**
   * Forecast part
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
          });
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
    let seconds,
      minutes,
      hours,
      date = new Date();
    date.setTime(duration);
    hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    seconds = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();

    return hours + ':' + minutes + ':' + seconds;
  }

  /**
   * Biography part
   */

  sortByFunction = () => {
    const updateEvents = { ...this.state.events };
    const updateSorting = this.state.sortedByFunc;
    let sorted;
    updateSorting ? sorted = Object.values(updateEvents)
        .sort((a, b) => ((+a.date) - (+b.date)))
      : sorted = Object.values(updateEvents)
        .reverse();

    for (let key in Object.keys(updateEvents)) {
      updateEvents[key] = sorted[key];
    }
    this.setState({
      events: updateEvents,
      sortedByFunc: !updateSorting
    });
  };

  sortByBubbleSorting = () => {
    const updateEvents = { ...this.state.events };
    const updateSorting = this.state.sortedByBubble;
    for (let i = Object.keys(updateEvents).length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        let current = updateEvents[j];
        let previous = updateEvents[j + 1];
        if (updateSorting) {
          if (current.event.toLowerCase() > previous.event.toLowerCase()) {
            let temp = updateEvents[j];
            updateEvents[j] = updateEvents[j + 1];
            updateEvents[j + 1] = temp;
          }
        } else {
          if (current.event.toLowerCase() < previous.event.toLowerCase()) {
            let temp = updateEvents[j];
            updateEvents[j] = updateEvents[j + 1];
            updateEvents[j + 1] = temp;
          }
        }
      }
    }
    this.setState({
      events: updateEvents,
      sortedByBubble: !updateSorting
    });
  };


  rowHandleClick = event => {
    event.preventDefault();
    let { selected } = this.state;
    const index = event.currentTarget.id;
    let current = selected[index];
    selected.fill(false);
    selected[index] = !current;
    this.setState({
      selected,
      currentIndex: index
    });
  };

  dragStart = (e) => {
    const id = e.currentTarget.id;
    e.dataTransfer.setData('id', id);
    e.dataTransfer.effectAllowed = 'move';
    const { selected } = this.state;
    selected.fill(false);
    selected[id] = true;
    this.setState({
      selected
    });
  };

  dragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.color = 'grey';
  };

  dragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.color = 'black';
  };

  onDrop = (e) => {
    const { events, selected } = this.state;
    const idFrom = e.dataTransfer.getData('id');
    const idTo = e.target.parentNode.id;
    events.splice(idTo, 0, events.splice(idFrom, 1)[0]);
    e.target.parentNode.style.color = 'black';
    selected.fill(false);
    selected[idTo] = true;
    this.setState({
      events,
      selected
    });
  };

  addYear = (e) => {
    e.preventDefault();
    this.setState({
      year: e.target.value
    });
  };

  addText = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value
    });
  };

  addEvent = () => {
    const updateEvents = { ...this.state.events };
    const year = +this.state.year;
    const text = this.state.text;
    if (!year || !text) {
      return;
    }
    if (isNaN(year)) {
      return;
    }
    if (year <= 0 || year >= 3000) {
      return;
    }
    updateEvents[Object.keys(updateEvents).length] = {
      date: year,
      event: text
    };
    this.setState({
      events: updateEvents
    });
  };

  deleteLastEvent = () => {
    const updateEvents = { ...this.state.events };
    const lastYear = this.state.year;
    const lastText = this.state.text;
    for (let key in updateEvents) {
      if (lastText === updateEvents[key].event && +lastYear === +updateEvents[key].date) {
        delete updateEvents[key];
      }
    }
    this.setState({
      events: updateEvents,
    });
  };


  render() {
    return (
      <HomeView
        /*Forecast*/
        city={this.state.city}
        country={this.state.country}
        temp={this.state.temp}
        pressure={this.state.pressure}
        sunset={this.state.sunset}
        error={this.state.error}
        /*Biography*/
        events={this.state.events}
        selected={this.state.selected}
        onDrop={this.onDrop}
        addYear={this.addYear}
        addText={this.addText}
        deleteLastEvent={this.deleteLastEvent}
        addEvent={this.addEvent}
        rowHandleClick={this.rowHandleClick}
        dragStart={this.dragStart}
        dragOver={this.dragOver}
        dragLeave={this.dragLeave}
        sortByFunction={this.sortByFunction}
        sortByBubbleSorting={this.sortByBubbleSorting}
      />
    );
  }
}
