import React from 'react';
import PropTypes from 'prop-types';

import Scroll from './components/Scroll';
import Biography from './components/Biography';
import Forecast from './components/Forecast';
import Switcher from './components/Switcher';
import { ThemeContext } from '../../context/ThemeContext';

const HomeView = ({
  city,
  country,
  temp,
  pressure,
  sunset,
  error,
  events,
  selected,
  onDrop,
  addYear,
  addText,
  deleteLastEvent,
  addEvent,
  rowHandleClick,
  dragStart,
  dragOver,
  dragLeave,
  sortByFunction,
  sortByBubbleSorting,
  handleScrollToUp,
  scrollVisibility
}) => {
  return (
    <>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <section className="container" style={{ backgroundColor: theme.background }}>
            <Scroll
              handleScrollToUp={handleScrollToUp}
              scrollVisibility={scrollVisibility}
            />
            <Biography
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
            />
            <Forecast
              city={city}
              country={country}
              temp={temp}
              pressure={pressure}
              sunset={sunset}
              error={error}
            />
            <Switcher />
          </section>
        )}
      </ThemeContext.Consumer>
    </>
  );
};

HomeView.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  temp: PropTypes.number,
  pressure: PropTypes.number,
  sunset: PropTypes.string,
  error: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      event: PropTypes.string
    })
  ).isRequired,
  selected: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.bool
    )
  ).isRequired,
  onDrop: PropTypes.func,
  addYear: PropTypes.func,
  addText: PropTypes.func,
  deleteLastEvent: PropTypes.func,
  addEvent: PropTypes.func,
  rowHandleClick: PropTypes.func,
  dragStart: PropTypes.func,
  dragOver: PropTypes.func,
  dragLeave: PropTypes.func,
  sortByFunction: PropTypes.func,
  sortByBubbleSorting: PropTypes.func,
  scrollVisibility: PropTypes.bool.isRequired,
  handleScrollToUp: PropTypes.func.isRequired
};

HomeView.defaultProps = {
  city: '',
  country: '',
  temp: 0,
  pressure: 0,
  sunset: '',
  error: '',
  onDrop: undefined,
  addYear: undefined,
  addText: undefined,
  deleteLastEvent: undefined,
  addEvent: undefined,
  rowHandleClick: undefined,
  dragStart: undefined,
  dragOver: undefined,
  dragLeave: undefined,
  sortByFunction: undefined,
  sortByBubbleSorting: undefined,
};

export default HomeView;
