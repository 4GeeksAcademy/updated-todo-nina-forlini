import React, { useState, useEffect } from 'react';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    useEffect(()=>{
        async function getToDo (){
            const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/nforlini")
            const data = await response.json()
            setTodos(data)
        }
        getToDo()
    },[])

    useEffect(()=>{
        async function postToDo(){
            const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/nforlini",{
                method: "PUT", headers: {"Content-Type": "application/json"},
                body: JSON.stringify(todos)
            })
            const data = await response.json()
        }
        postToDo()
    },[todos])

    const addTodo = () => {
      if (inputValue.trim() !== '') {
        let task = {label: inputValue, done: false}
        setTodos([...todos, task]);
        setInputValue('');
      }
    };
    const handleSubmit =(event)=>{
        event.preventDefault()
        addTodo()
    };

    const removeTodo = (index) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    };
  
    return (
      <div className='toDo'>
        <h2>📌</h2>
        <h1>To-Do List</h1>
       
        <form className='form' onSubmit={handleSubmit}>
        <label>
         <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        </form>
  
        {}
        {todos.length === 0 ? (
          <p>No tasks. Add a task!</p>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo.label}
                <button className='x' onClick={() => removeTodo(index)}>X</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ToDoList;