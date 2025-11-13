import { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoList from "./assets/TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todosapp.todos";

function App() {
  const [toDo, setToDo] = useState([]);
  const toDoNameRef = useRef();
  const isInitialMount = useRef(true);

  useEffect(() => {
    const storedToDo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    console.log(storedToDo);
    if (storedToDo) setToDo(storedToDo);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      // intial mount don ioverwrite, skip
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDo));
  }, [toDo]);

  function handleAddToDo(e) {
    const name = toDoNameRef.current.value;
    if (name === "") return;
    setToDo((prev) => {
      return [...prev, { id: uuidv4(), name: name, complete: false }];
    });
    toDoNameRef.current.value = null;
  }

  function toggleToDo(id) {
    setToDo((prevToDo) => {
      return prevToDo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    });
  }

  function handleClearToDo() {
    setToDo((prevToDo) => {
      return prevToDo.filter((todo) => !todo.complete);
    });
  }

  return (
    <>
      <TodoList toDo={toDo} toggleToDo={toggleToDo} />
      <input ref={toDoNameRef} type="text" />
      <button onClick={handleAddToDo}>Add</button>
      <button onClick={handleClearToDo}>Clear</button>
      <div>{toDo.filter((todo) => !todo.complete).length} task left to do</div>
    </>
  );
}

export default App;
