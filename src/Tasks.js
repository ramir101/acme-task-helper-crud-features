import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { destroyTask, updateTask, createTask } from './store';

const Tasks = ()=> {
  let { tasks } = useSelector(state => state);
  const [name, setName ] = useState('');
  const [description, setDescription] = useState('');
  const [complete, setComplete ] = useState(false);
  const [difficulty, setDifficulty ] = useState('easy');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id, hardness } = useParams();
  useEffect(()=> {
    const task = tasks.find( task => task.id === id);
    setName(task ? task.name : '');
    setDescription(task ? task.description : '');
    setDifficulty(task ? task.difficulty : 'easy');
    setComplete(task ? task.complete: false);
  }, [tasks, id]);

  const save = (ev)=> {
    ev.preventDefault();
    if(id){
      const task = { id, name, complete, description, difficulty };
      dispatch(updateTask(task,navigate));
    }
    else {
      const task = { name, complete, description, difficulty };
      dispatch(createTask(task,navigate));
    }
  };
  const destroy = ()=> {
    dispatch(destroyTask({ id },navigate));
  };

 if(pathname === `/tasks/filter/easy` || pathname === `/tasks/filter/medium` || pathname === `/tasks/filter/difficult`){
   tasks = tasks.filter(task => task.difficulty === hardness);
 }

  return (
    <div>
      <nav id='nav'>
        <Link to={`/tasks/filter/easy`}>Easy</Link>
        <Link to={`/tasks/filter/medium`}>Medium</Link>
        <Link to={`/tasks/filter/difficult`}>Difficult</Link>
      </nav>
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
                <ul>
                  <li>Description: {task.description}</li>
                  <li>Difficulty: {task.difficulty}</li>
                </ul>
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
        <input placeholder='name of task' value={ name } onChange={ ev => setName(ev.target.value)}/>
        <input placeholder='description' value={ description } onChange={ ev => setDescription(ev.target.value)}></input>
        <select name={ difficulty } value={difficulty} onChange={ ev => setDifficulty(ev.target.value)}>
          <option value='easy'>easy</option>
          <option value='medium'>medium</option>
          <option value='difficult'>difficult</option>
        </select>
        <button disabled={ !name }>Save</button>
      </form>
      { id ? <button onClick={ destroy }>x</button> : null }
    </div>
  );
}; 

export default Tasks;
