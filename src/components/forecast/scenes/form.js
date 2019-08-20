import React, {Component} from "react";

const Form = props => (
    <form onSubmit={props.weatherMethod}>
      <div className="inputForm">
        <input className="weather" type="text" name="city" placeholder="City"/>
        <button className="btn-weather">Receive weather</button>
      </div>
    </form>
);

export default Form;