import React from 'react';
import ShowTable from './ShowTable';

const Biography = ({
  events, selected, onDrop, addYear, addText, deleteLastEvent, addEvent,
  rowHandleClick, dragStart, dragOver, dragLeave, sortByFunction, sortByBubbleSorting
}) => {
  return (
    <section className="container">
      <div className="biography">
        <div className='title'>
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
              <label className="labelForInput"> Add event:</label>
              <input type="text" onChange={addYear} className="inputForAdd" placeholder='year...'/>
              <textarea onChange={addText} className="textArea" placeholder='text...'/>
            </div>
            <div className="buttonTag">
              <input type="button" value="Reset" className='btn' onClick={deleteLastEvent}/>
              <input type="button" value="Add new event" className='btn' onClick={addEvent}/>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Biography;
