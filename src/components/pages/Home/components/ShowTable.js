import React from 'react';
import PropTypes from 'prop-types';

const ShowTable = ({
  events,
  selected,
  onDrop,
  rowHandleClick,
  dragStart,
  dragOver,
  dragLeave,
  sortByFunction,
  sortByBubbleSorting
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <div role="button" aria-hidden id="date" onClick={sortByFunction}>
            Date
              <i className="fa fa-sort" />
            </div>
          </th>
          <th>
            <div role="button" aria-hidden id="date" onClick={sortByBubbleSorting}>
            Event
              <i className="fa fa-sort" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody id="tbody" onDrop={onDrop}>
        {Object.entries(events)
          .map(([index, row]) => (
            <tr
              key={index}
              id={index}
              className={selected[index] ? 'selected' : ''}
              onClick={rowHandleClick}
              draggable
              onDragStart={dragStart}
              onDragOver={dragOver}
              onDragLeave={dragLeave}
            >
              <td className="date">{row.date}</td>
              <td className="event">{row.event}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

ShowTable.propTypes = {
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
  rowHandleClick: PropTypes.func,
  dragStart: PropTypes.func,
  dragOver: PropTypes.func,
  dragLeave: PropTypes.func,
  sortByFunction: PropTypes.func,
  sortByBubbleSorting: PropTypes.func
};

ShowTable.defaultProps = {
  onDrop: undefined,
  rowHandleClick: undefined,
  dragStart: undefined,
  dragOver: undefined,
  dragLeave: undefined,
  sortByFunction: undefined,
  sortByBubbleSorting: undefined,
};

export default ShowTable;
