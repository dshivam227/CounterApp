import React, { useState, useEffect } from 'react';

function Counter({ name, value, startValue, onIncrement, onDecrement, onReset, onRemove, onAssign }) {
  const [newValue, setNewValue] = useState('');

  const handleAssignValue = () => {
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      onAssign(parsedValue);
      setNewValue('');
    }
  };

  return (
    <div className="counter card m-2">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <button className="btn btn-primary mr-2" onClick={onIncrement}>+</button>
        <span className='font-weight-bold'>{value}</span>
        <button className="btn btn-primary ml-2" onClick={onDecrement}>-</button>
        <button className="btn btn-secondary mx-2" onClick={onReset}>Reset</button>
        <button className="btn btn-danger mx-2" onClick={onRemove}>Remove</button>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Assign value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAssignValue}>Assign</button>
      </div>
    </div>
  );
}

function CounterApp() {
  const [counters, setCounters] = useState([]);

  // Load counters from local storage on initial render
  useEffect(() => {
    const savedCounters = JSON.parse(localStorage.getItem('counters'));
    if (savedCounters) {
      setCounters(savedCounters);
    }
  }, []);

  // Save counters to local storage whenever counters change
  useEffect(() => {
    localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  const handleIncrement = (index) => {
    const updatedCounters = [...counters];
    updatedCounters[index].value++;
    setCounters(updatedCounters);
  };

  const handleDecrement = (index) => {
    const updatedCounters = [...counters];
    updatedCounters[index].value--;
    setCounters(updatedCounters);
  };

  const handleReset = (index) => {
    const updatedCounters = [...counters];
    updatedCounters[index].value = updatedCounters[index].startValue;
    setCounters(updatedCounters);
  };

  const handleRemove = (index) => {
    const updatedCounters = [...counters];
    updatedCounters.splice(index, 1);
    setCounters(updatedCounters);
  };

  const handleAssignValue = (index, assignedValue) => {
    const updatedCounters = [...counters];
    updatedCounters[index].value = assignedValue;
    setCounters(updatedCounters);
  };

  const handleAddCounter = () => {
    const newCounter = {
      name: 'New Counter',
      value: 0,
      startValue: 0,
    };
    setCounters([...counters, newCounter]);
  };

  return (
    <div className="App container">
      <button className="btn btn-primary my-3" onClick={handleAddCounter}>Add Counter</button>
      <div className="row">
        {counters.map((counter, index) => (
          <div key={index} className="col-md-4">
            <Counter
              name={counter.name}
              value={counter.value}
              startValue={counter.startValue}
              onIncrement={() => handleIncrement(index)}
              onDecrement={() => handleDecrement(index)}
              onReset={() => handleReset(index)}
              onRemove={() => handleRemove(index)}
              onAssign={(assignedValue) => handleAssignValue(index, assignedValue)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CounterApp;
