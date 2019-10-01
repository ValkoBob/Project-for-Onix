import React from 'react';
import PropTypes from 'prop-types';

const Forecast = ({
  city,
  country,
  temp,
  pressure,
  sunset,
  error
}) => {
  return (
    <section className="container">
      <div className="forecast">
        <div className="title">
          <h3>Weather forecast</h3>
        </div>
        <div>
          {city
          && (
            <div>
              <p>
                Location:
                {city}
                ,
                {country}
              </p>
              <p>
                Temperature:
                {temp}
              </p>
              <p>
                Pressure:
                {pressure}
              </p>
              <p>
                Sunset:
                {sunset}
              </p>
            </div>
          )}
          <p>{error}</p>
        </div>
      </div>
    </section>
  );
};

Forecast.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  temp: PropTypes.number,
  pressure: PropTypes.number,
  sunset: PropTypes.string,
  error: PropTypes.string
};

Forecast.defaultProps = {
  city: '',
  country: '',
  temp: '',
  pressure: '',
  sunset: '',
  error: '',
};

export default Forecast;
