import React, {Component} from 'react';
import HomeView from './HomeView';

export default class Home extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
        <HomeView/>
    );
  }
}