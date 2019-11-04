import React, { useState, useEffect } from 'react';
import HomeView from './HomeView';

const Home = () => {
  const [sortedByFunc, setSortedByFunc] = useState(false);
  const [sortedByBubble, setSortedByBubble] = useState(false);
  const [events, setEvents] = useState([
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
  ]);
  const [selected, setSelected] = useState([]);
  const [year, setYear] = useState('');
  const [text, setText] = useState('');
  const [inputCity] = useState('Kiev');
  const [temp, setTemp] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [pressure, setPressure] = useState(undefined);
  const [sunset, setSunset] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [linkToAPI] = useState(`http://api.openweathermap.org/data/2.5/weather?q=Kiev
        &appid=d90ac9c73c6a02a42b4cf0bdfbcd3ae9&units=metric`);
  const [scrollVisibility, setScrollVisibility] = useState(false);
  const [scrolled, setScrolled] = useState(window.pageYOffset);
  const [coords] = useState(document.documentElement.clientHeight);
  /**
   * Forecast part
   */

  /**
   * Function converts milliseconds to seconds, minutes, hours
   * @param duration milliseconds
   * @returns {string} readable date
   */
  const msToTime = (duration) => {
    const date = new Date();
    date.setTime(duration);
    const hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
    const minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds();

    return `${hours}:${minutes}:${seconds}`;
  };

  const makeFetchingApi = () => {
    if (inputCity !== undefined) {
      fetch(linkToAPI)
        .then((response) => response.json())
        .then((data) => {
          // eslint-disable-next-line no-shadow
          const { sunset } = data.sys;
          const date = msToTime(sunset);
          setTemp(data.main.temp);
          setCity(data.name);
          setCountry(data.sys.country);
          setPressure(data.main.pressure);
          setSunset(date);
          setError(undefined);
        })
        .catch((errorMessage) => {
          // eslint-disable-next-line no-console
          console.log(errorMessage);
        });
    }
  };

  const scroll = () => {
    setScrollVisibility(scrolled > coords);
    setScrolled(window.pageYOffset);
  };

  useEffect(() => {
    makeFetchingApi();
    window.addEventListener('scroll', scroll);
  });

  /**
   * Biography part
   */

  const sortByFunction = () => {
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
    setEvents(updateEvents);
    setSortedByFunc(!updateSorting);
  };

  const sortByBubbleSorting = () => {
    const updateEvents = { ...events };
    const updateSorting = sortedByBubble;
    for (let i = Object.keys(updateEvents).length - 1; i >= 0; i -= 1) {
      for (let j = 0; j < i; j += 1) {
        const current = updateEvents[j];
        const previous = updateEvents[j + 1];
        if (updateSorting) {
          if (current.event.toLowerCase() > previous.event.toLowerCase()) {
            const temporary = updateEvents[j];
            updateEvents[j] = updateEvents[j + 1];
            updateEvents[j + 1] = temporary;
          }
        } else if (current.event.toLowerCase() < previous.event.toLowerCase()) {
          const temporary = updateEvents[j];
          updateEvents[j] = updateEvents[j + 1];
          updateEvents[j + 1] = temporary;
        }
      }
    }
    setEvents(updateEvents);
    setSortedByBubble(!updateSorting);
  };


  const rowHandleClick = (event) => {
    event.preventDefault();
    const index = event.currentTarget.id;
    const current = selected[index];
    selected.fill(false);
    selected[index] = !current;
    setSelected(selected);
  };

  const dragStart = (e) => {
    const { id } = e.currentTarget;
    e.dataTransfer.setData('id', id);
    e.dataTransfer.effectAllowed = 'move';
    selected.fill(false);
    selected[id] = true;
    setSelected(selected);
  };

  const dragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.color = 'grey';
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.color = 'black';
  };

  const onDrop = (e) => {
    const idFrom = e.dataTransfer.getData('id');
    const idTo = e.target.parentNode.id;
    events.splice(idTo, 0, events.splice(idFrom, 1)[0]);
    e.target.parentNode.style.color = 'black';
    selected.fill(false);
    selected[idTo] = true;
    setEvents(events);
    setSelected(selected);
  };

  const addYear = (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };

  const addText = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const addEvent = () => {
    const updateEvents = { ...events };
    const yearEvent = +year;
    if (!yearEvent || !text) {
      return;
    }
    if (yearEvent <= 0 || yearEvent >= 3000) {
      return;
    }
    updateEvents[Object.keys(updateEvents).length] = {
      date: year,
      event: text
    };
    setEvents(updateEvents);
  };

  const deleteLastEvent = () => {
    const updateEvents = { ...events };
    const lastYear = year;
    const lastText = text;
    Object.keys(updateEvents).forEach((key) => {
      if (lastText === updateEvents[key].event && +lastYear === +updateEvents[key].date) {
        delete updateEvents[key];
      }
    });
    setEvents(updateEvents);
  };

  const handleScrollToUp = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(handleScrollToUp, 0);
    }
  };
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
      onDrop={onDrop}
      addYear={addYear}
      addText={addText}
      deleteLastEvent={deleteLastEvent}
      addEvent={addEvent}
      rowHandleClick={rowHandleClick}
      dragStart={dragStart}
      dragOver={dragOver}
      dragLeave={dragLeave}
      sortByFunction={sortByFunction}
      sortByBubbleSorting={sortByBubbleSorting}
      handleScrollToUp={handleScrollToUp}
      scrollVisibility={scrollVisibility}
    />
  );
};

export default Home;
