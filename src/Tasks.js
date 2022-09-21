import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { destroyTask, updateTask, createTask } from './store';

const Tasks = ()=> {
  const { tasks } = useSelector(state => state);
  const [name, setName ] = useState('');
  const [complete, setComplete ] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(()=> {
    const task = tasks.find( task => task.id === id);
    setName(task ? task.name : '');
    setComplete(task ? task.complete: false);
  }, [tasks, id]);

  const save = (ev)=> {
    ev.preventDefault();
    if(id){
      const task = { id, name, complete };
      dispatch(updateTask(task));
    }
    else {
      const task = { name, complete };
      dispatch(createTask(task));
    }
  };

  const destroy = ()=> {
    dispatch(destroyTask({ id }));
  };
  return (
    <div>
      <ul>
        {
          tasks.map( task => {
            return (
              <li
                key={ task.id }
                className = { task.complete ? 'complete': ''}
              >
                <Link to={`/tasks/${task.id}`}>
                { task.name }
                </Link>
              </li>
            );
          })
        }
      </ul>
      <form onSubmit={ save }>
        <input
          type='checkbox'
          checked={ complete }
          onChange={ ev => setComplete(ev.target.checked)}
        />
        <input value={ name } onChange={ ev => setName(ev.target.value)}/>
        <button disabled={ !name }>Save</button>
      </form>
      { id ? <button onClick={ destroy }>x</button> : null }
    </div>
  );
}; 

export default Tasks;
