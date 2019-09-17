import React, {Fragment} from 'react';
import Biography from './components/Biography';
import Forecast from './components/Forecast';

const HomeView = () => {
  return (
      <Fragment>
        <Biography/>
        <Forecast />
      </Fragment>
  )
};

export default HomeView;