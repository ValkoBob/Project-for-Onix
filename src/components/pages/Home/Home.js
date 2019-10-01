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
      inputCity: 'Kiev',
      temp: undefined,
      city: undefined,
      country: undefined,
      pressure: undefined,
      sunset: undefined,
      error: undefined,
      linkToAPI: `http://api.openweathermap.org/data/2.5/weather?q=Kiev
        &appid=d90ac9c73c6a02a42b4cf0bdfbcd3ae9&units=metric`,
      scrollVisibility: false,
      scrolled: window.pageYOffset,
      coords: document.documentElement.clientHeight
    };
  }

  /**
   * Forecast part
   */

  componentDidMount() {
    this.makeFetchingApi();
    window.addEventListener('scroll', this.scroll);
  }

  /**
   * Biography part
   */

  sortByFunction = () => {
    const { events, sortedByFunc } = this.state;
    const updateEvents = { ...events };
    const updateSorting = sortedByFunc;
    let sorted;
    if (updateSorting) {
      sorted = Object.values(updateEvents)
        .sort((a, b) => ((+a.date) - (+b.date)));
    } else {
      sorted = Object.values(updateEvents)
        .reverse();
    }
    Object.keys(updateEvents).forEach((key) => {
      updateEvents[key] = sorted[key];
    });
    this.setState({
      events: updateEvents,
      sortedByFunc: !updateSorting
    });
  };

  sortByBubbleSorting = () => {
    const { events, sortedByBubble } = this.state;
    const updateEvents = { ...events };
    const updateSorting = sortedByBubble;
    for (let i = Object.keys(updateEvents).length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < i; j += 1) {
        const current = updateEvents[j];
        const previous = updateEvents[j + 1];
        if (updateSorting) {
          if (current.event.toLowerCase() > previous.event.toLowerCase()) {
            const temp = updateEvents[j];
            updateEvents[j] = updateEvents[j + 1];
            updateEvents[j + 1] = temp;
          }
        } else if (current.event.toLowerCase() < previous.event.toLowerCase()) {
          const temp = updateEvents[j];
          updateEvents[j] = updateEvents[j + 1];
          updateEvents[j + 1] = temp;
        }
      }
    }
    this.setState({
      events: updateEvents,
      sortedByBubble: !updateSorting
    });
  };


  rowHandleClick = (event) => {
    event.preventDefault();
    const { selected } = this.state;
    const index = event.currentTarget.id;
    const current = selected[index];
    selected.fill(false);
    selected[index] = !current;
    this.setState({
      selected
    });
  };

  dragStart = (e) => {
    const { id } = e.currentTarget;
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
    const { events, yearEvent, text } = this.state;
    const updateEvents = { ...events };
    const year = +yearEvent;
    if (!year || !text) {
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
    const { events, year, text } = this.state;
    const updateEvents = { ...events };
    const lastYear = year;
    const lastText = text;
    Object.keys(updateEvents).forEach((key) => {
      if (lastText === updateEvents[key].event && +lastYear === +updateEvents[key].date) {
        delete updateEvents[key];
      }
    });
    this.setState({
      events: updateEvents,
    });
  };

  scroll = () => {
    const { scrolled, coords } = this.state;
    this.setState({
      scrollVisibility: scrolled > coords,
      scrolled: window.pageYOffset
    });
  };

  handleScrollToUp = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(this.handleScrollToUp, 0);
    }
  };

  makeFetchingApi() {
    const { inputCity, linkToAPI } = this.state;
    if (inputCity !== undefined) {
      fetch(linkToAPI)
        .then((response) => response.json())
        .then((data) => {
          const { sunset } = data.sys;
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
    const date = new Date();
    date.setTime(duration);
    const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  }


  render() {
    const {
      city,
      country,
      temp,
      pressure,
      sunset,
      error,
      events,
      selected,
      scrollVisibility
    } = this.state;
    return (
      <HomeView
        /* Forecast */
        city={city}
        country={country}
        temp={temp}
        pressure={pressure}
        sunset={sunset}
        error={error}
        /* Biography */
        events={events}
        selected={selected}
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
        handleScrollToUp={this.handleScrollToUp}
        scrollVisibility={scrollVisibility}
      />
    );
  }
}
