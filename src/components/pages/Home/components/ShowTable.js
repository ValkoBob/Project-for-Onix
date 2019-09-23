import React from 'react';

const ShowTable = ({
  events, selected, onDrop, rowHandleClick, dragStart,
  dragOver, dragLeave, sortByFunction, sortByBubbleSorting
}) => {
  return (
    <table>
      <thead>
      <tr>
        <th>Date <i id="date" className="fa fa-sort" onClick={sortByFunction}/>
        </th>
        <th>Event <i id="event" className="fa fa-sort" onClick={sortByBubbleSorting}/>
        </th>
      </tr>
      </thead>
      <tbody id="tbody" onDrop={onDrop}>
      {Object.entries(events)
        .map(([index, row]) =>
          <tr key={index}
              id={index}
              className={selected[index] ? 'selected' : ''}
              onClick={rowHandleClick}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={dragOver}
              onDragLeave={dragLeave}>
            <td className="date">{row.date}</td>
            <td className="event">{row.event}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ShowTable;
