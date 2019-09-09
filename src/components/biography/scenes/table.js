import React, {Component} from "react"

class Table extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Function sorts the events by the standard function
   */
  sortByFunction = () => {
    const updateEvents = {...this.props.data.events};
    const updateSorting = this.props.data.sortedByFunc;
    let sorted;
    updateSorting ? sorted = Object.values(updateEvents).sort((a, b) => ((+a.date) - (+b.date)))
        : sorted = Object.values(updateEvents).reverse();

    for (let key in Object.keys(updateEvents)) {
      updateEvents[key] = sorted[key];
    }
    /**
     * Update array of events in state
     */
    this.props.data.events = updateEvents;
    this.props.data.sortedByFunc = !updateSorting;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Function sorts the events by the bubble sorting
   */
  sortByBubbleSorting = () => {
    const updateEvents = {...this.props.data.events};
    const updateSorting = this.props.data.sortedByBubble;
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
    /**
     * Update array of events in state
     */
    this.props.data.events = updateEvents;
    this.props.data.sortedByBubble = !updateSorting;
    this.props.onUpdateState(this.props.data);
  };

  rowHandleClick = event => {
    event.preventDefault();
    let {selected} = this.props.data;
    const index = event.currentTarget.id;
    let current = selected[index];
    selected.fill(false);
    selected[index] = !current;
    /**
     * Update temporary array, and add current index
     */
    this.props.data.selected = selected;
    this.props.data.currentIndex = index;
    this.props.onUpdateState(this.props.data);
  };

  /**
   *  Function which make block draggable and move it from one id to another
   * @param e
   */
  dragStart = (e) => {
    const id = e.currentTarget.id;
    e.dataTransfer.setData('id', id);
    e.dataTransfer.effectAllowed = 'move';
    const {selected} = this.props.data;
    selected.fill(false);
    selected[id] = true;
    this.props.data.selected = selected;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Row changes color to grey
   * @param e
   */
  dragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.color = 'grey';
  };

  /**
   * Row changes color to black
   * @param e
   */
  dragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.style.color = 'black';
  };

  /**
   * Function changes places of draggable events
   * @param e
   */
  onDrop = (e) => {
    const {events, selected} = this.props.data;
    const idFrom = e.dataTransfer.getData('id');
    const idTo = e.target.parentNode.id;
    events.splice(idTo, 0, events.splice(idFrom, 1)[0]);
    e.target.parentNode.style.color = 'black';
    selected.fill(false);
    selected[idTo] = true;
    this.props.data.events = events;
    this.props.data.selected = selected;
    this.props.onUpdateState(this.props.data);
  };

  render() {
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
          {console.log(this.props.data)}
          <tbody id="tbody" onDrop={this.onDrop}>
          {Object.entries(this.props.data.events).map(([index, row]) =>
              <tr key={index}
                  id={index}
                  className={this.props.data.selected[index] ? "selected" : ""}
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
}

export default Table

