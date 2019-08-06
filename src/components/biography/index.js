import React, {Component} from "react";

class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedByFunc: false,
      sortedByBubble: false,
      events: [
        {
          date: "1994",
          event: "BirthDay"
        },
        {
          date: "2000",
          event: "Start to study at school"
        },
        {
          date: "2008",
          event: "Start to study in another school"
        },
        {
          date: "2010",
          event: "End the school"
        },
        {
          date: "2010",
          event: "Start to study in SPI"
        },
        {
          date: "2015",
          event: "Graduated from Institute"
        },
        {
          date: "2015",
          event: "Start to study in KDPU"
        },
        {
          date: "2017",
          event: "Graduated from University"
        },
        {
          date: "2018",
          event: "Start to study Programming"
        }
      ],
      text: '',
      year: '',
      lastText: '',
      lastYear: ''
    };
  }

  sortByFunction = () => {
    const updateEvents = this.state.events.slice(0);
    const updateSorting = this.state.sortedByFunc;
    updateSorting ? updateEvents.sort((a, b) => ((+a.date) - (+b.date))) : updateEvents.reverse();
    this.setState({
      events: updateEvents,
      sortedByFunc: !updateSorting
    })
  };

  sortByBubbleSorting = () => {
    const updateEvents = this.state.events.slice(0);
    const updateSorting = this.state.sortedByBubble;
    for (let i = updateEvents.length - 1; i >= 0; i--) {
      for (let j = 0; j < i; j++) {
        let current = updateEvents[j];
        let previous = updateEvents[j + 1];
        if(updateSorting){
          if (current.event.toLowerCase() > previous.event.toLowerCase()) {
            let temp = updateEvents[j];
            updateEvents[j] = updateEvents[j + 1];
            updateEvents[j + 1] = temp;
          }
        }
        else{
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
    })
  };

  showTable(data) {
    return (
        <table>
          <thead>
          <tr>
            <th>Date <i id="date" className="fa fa-sort" onClick={this.sortByFunction}/>
            </th>
            <th>Event <i id="event" className="fa fa-sort" onClick={this.sortByBubbleSorting}/>
            </th>
          </tr>
          </thead>
          <tbody id="tbody">
          {
            data.map((row, index) => Bio.createTable(row, index))
          }
          </tbody>
        </table>
    )
  }


  static createTable(row, index) {
    return (
        <tr key={index}>
          <td className="date">{row.date}</td>
          <td className="event">{row.event}</td>
        </tr>
    )
  };

  addYear = (e) =>{
    e.preventDefault();
    this.setState({
      year: e.target.value
    })
  };

  addText = (e) =>{
    e.preventDefault();
    this.setState({
      text: e.target.value
    })
  };

  addEvent = () => {
    const updateEvents = this.state.events.slice(0);
    const year = +this.state.year;
    const text = this.state.text;
    if(!year || !text){
      return;
    }
    if(isNaN(year)){
      return;
    }
    if(year <= 0 || year >= 3000){
      return;
    }
    updateEvents.push({
      date: year,
      event: text
    });
    this.setState({
      events: updateEvents
    })
  };

  deleteLastEvent = () => {
    const updateEvents = this.state.events.slice(0);
    const data = this.state.events;
    const lastYear = this.state.year;
    const lastText = this.state.text;
    let makeSplice = true;
    data.map((item, index) => {
      if(+item.date === +lastYear && item.event === lastText && makeSplice){
        updateEvents.splice(index, 1);
        makeSplice = false;
      }
    });
    this.setState({
      events: updateEvents,
    })
  };


  render() {
    return (
        <section className="container">
          <div className="biography">
            <div className='title'>
              <h3>Biography</h3>
            </div>
            {this.showTable(this.state.events)}
            <div className="addToTable">
              <form>
                <div className="inputTag">
                  <label className="labelForInput"> Add event:</label>
                  <input type="text" onChange={this.addYear} className="inputForAdd" placeholder='year...' />
                  <textarea onChange={this.addText} className="textArea" placeholder='text...'/>
                </div>
                <div className="buttonTag">
                  <input type="button" value="Reset" className='btn' onClick={this.deleteLastEvent}/>
                  <input type="button" value="Add new event" className='btn' onClick={this.addEvent}/>
                </div>
              </form>
            </div>
          </div>
        </section>
    )
  }
}

export default Bio