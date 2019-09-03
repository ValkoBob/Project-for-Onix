import React, {Component} from 'react'

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
      selected: [],
      text: '',
      year: '',
      lastText: '',
      lastYear: '',
      showImage: true,
      error: false,
      isLoading: false,
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
          <tbody id="tbody" onDrop={this.onDrop}>
          {Object.entries(data).map(([index, row]) =>
              <tr key={index}
                  id={index}
                  className={this.state.selected[index] ? "selected" : ""}
                  onClick={this.rowHandleClick}
                  draggable={true}
                  onDragStart={this.dragStart}
                  onDragOver={this.dragOver}
                  onDragLeave={this.dragLeave}>
                <td className="date">{row.date}</td>
                <td className="event">{row.event}</td>
              </tr>
          )}
          </tbody>
        </table>
    )
  }

  rowHandleClick = event => {
    event.preventDefault();
    let {selected} = this.state;
    const index = event.currentTarget.id;
    let current = selected[index];
    selected.fill(false);
    selected[index] = !current;
    this.setState({
      selected,
      currentIndex: index
    })
  };

  dragStart = (e) => {
    const id = e.currentTarget.id;
    e.dataTransfer.setData('id', id);
    e.dataTransfer.effectAllowed = 'move';
    const {selected} = this.state;
    selected.fill(false);
    selected[id] = true;
    this.setState({
      selected
    })
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
    const {events, selected} = this.state;
    console.log(events);
    console.log(selected);
    const idFrom = e.dataTransfer.getData('id');
    const idTo = e.target.parentNode.id;
    events.splice(idTo, 0, events.splice(idFrom, 1)[0]);
    e.target.parentNode.style.color = 'black';
    selected.fill(false);
    selected[idTo] = true;
    this.setState({
      events,
      selected
    })
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

  handleError = () => {
    alert('error');
    let {error} = this.state;
    error = !error;
    this.setState({
      error
    })
  };

  toggleImage = () => {
    let {showImage} = this.state;
    showImage = !showImage;
    this.setState({
      showImage
    })
  };

  handleDocumentLoad = () => {
    this.toggleImage();
    setTimeout(this.toggleImage, 2000);

  };


  render() {
    return (
        <section className="container">
          <div className="biography">
            <div className='title'>
              <h3>Biography</h3>
              <img alt="load bar" src={require('./table/load.gif')}
                   onLoad={this.handleDocumentLoad}
                   className={this.state.showImage ? 'loadingImage' : 'loadingImage hidden'}/>
              <img alt="food" src={require('./table/error.gif')}
                   onError={this.handleError}
                   className={this.state.error ? 'loadingImage' : 'loadingImage hidden'}/>
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