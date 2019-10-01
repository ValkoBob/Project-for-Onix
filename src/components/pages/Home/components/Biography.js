import React from 'react';
import PropTypes from 'prop-types';
import ShowTable from './ShowTable';

const Biography = ({
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
  sortByBubbleSorting
}) => {
  return (
    <section className="container">
      <div className="biography">
        <div className="title">
          <h3>Biography</h3>
        </div>
        <ShowTable
          events={events}
          selected={selected}
          onDrop={onDrop}
          rowHandleClick={rowHandleClick}
          dragStart={dragStart}
          dragOver={dragOver}
          dragLeave={dragLeave}
          sortByFunction={sortByFunction}
          sortByBubbleSorting={sortByBubbleSorting}
        />
        <div className="addToTable">
          <form>
            <div className="inputTag">
              <div className="labelForInput"> Add event:</div>
              <input type="text" onChange={addYear} className="inputForAdd" placeholder="year..." />
              <textarea onChange={addText} className="textArea" placeholder="text..." />
            </div>
            <div className="buttonTag">
              <input type="button" value="Reset" className="btn" onClick={deleteLastEvent} />
              <input type="button" value="Add new event" className="btn" onClick={addEvent} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

Biography.propTypes = {
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
};

Biography.defaultProps = {
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

export default Biography;
