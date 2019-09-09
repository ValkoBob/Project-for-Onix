import React, {Component} from 'react'

class Form extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Function add years to state.
   * @param e
   */
  addYear = (e) => {
    e.preventDefault();
    this.props.data.year = e.target.value;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Function add text of event to state.
   * @param e
   */
  addText = (e) => {
    e.preventDefault();
    this.props.data.text = e.target.value;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Add event with year and text to array
   */
  addEvent = () => {
    const updateEvents = {...this.props.data.events};
    const year = +this.props.data.year;
    const text = this.props.data.text;
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
    this.props.data.events = updateEvents;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Delete last event, which was added by user
   */
  deleteLastEvent = () => {
    const updateEvents = {...this.props.data.events};
    const lastYear = this.props.data.year;
    const lastText = this.props.data.text;
    for (let key in updateEvents) {
      if (lastText === updateEvents[key].event && +lastYear === +updateEvents[key].date) {
        delete updateEvents[key];
      }
    }
    this.props.data.events = updateEvents;
    this.props.onUpdateState(this.props.data);
  };

  render() {
    return (
        <div className="addToTable">
          <form>
            <div className="inputTag">
              <label className="labelForInput"> Add event:</label>
              <input type="text" onChange={this.addYear} className="inputForAdd" placeholder='year...'/>
              <textarea onChange={this.addText} className="textArea" placeholder='text...'/>
            </div>
            <div className="buttonTag">
              <input type="button" value="Reset" className='btn' onClick={this.deleteLastEvent}/>
              <input type="button" value="Add new event" className='btn' onClick={this.addEvent}/>
            </div>
          </form>
        </div>
    )
  }

}

export default Form