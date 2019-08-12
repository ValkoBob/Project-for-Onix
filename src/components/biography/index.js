import React, {Component} from "react";

class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedByFunc: false,
      sortedByBubble: false,
      events: {
        0:
            {
              date: "1994",
              event: "BirthDay"
            }
        ,
        1:
            {
              date: "2000",
              event: "Start to study at school"
            }
        ,
        2:
            {
              date: "2008",
              event: "Start to study in another school"
            }
        ,
        3:
            {
              date: "2010",
              event: "End the school"
            }
        ,
        4:
            {
              date: "2010",
              event: "Start to study in SPI"
            }
        ,
        5:
            {
              date: "2015",
              event: "Graduated from Institute"
            }
        ,
        6:
            {
              date: "2015",
              event: "Start to study in KDPU"
            }
        ,
        7:
            {
              date: "2017",
              event: "Graduated from University"
            }
        ,
        8:
            {
              date: "2018",
              event: "Start to study Programming"
            }
      },
      text: '',
      year: '',
      lastText: '',
      lastYear: ''
    };
  }

  sortByFunction = () => {
    const updateEvents = {...this.state.events};
    const updateSorting = this.state.sortedByFunc;
    let sorted;
    updateSorting ? sorted = Object.values(updateEvents).sort((a, b) => ((+a.date) - (+b.date)))
        : sorted = Object.values(updateEvents).reverse();

    for (let key in Object.keys(updateEvents)) {
      updateEvents[key] = sorted[key];
    }
    this.setState({
      events: updateEvents,
      sortedByFunc: !updateSorting
    })
  };

  sortByBubbleSorting = () => {
    const updateEvents = {...this.state.events};
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
          {}
          {
            Object.entries(data).map(([index, row]) => Bio.createTable(row, index))
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

  addYear = (e) => {
    e.preventDefault();
    this.setState({
      year: e.target.value
    })
  };

  addText = (e) => {
    e.preventDefault();
    this.setState({
      text: e.target.value
    })
  };

  addEvent = () => {
    const updateEvents = {...this.state.events};
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
    })
  };

  deleteLastEvent = () => {
    const updateEvents = {...this.state.events};
    const lastYear = this.state.year;
    const lastText = this.state.text;
    for (let key in updateEvents) {
      if (lastText === updateEvents[key].event && +lastYear === +updateEvents[key].date) {
        delete updateEvents[key];
      }
    }
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
                  <input type="text" onChange={this.addYear} className="inputForAdd" placeholder='year...'/>
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