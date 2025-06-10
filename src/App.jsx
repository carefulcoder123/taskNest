import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/navbar'
import { RiEdit2Fill } from "react-icons/ri";
import { useState, useEffect, useRef } from 'react';
import { RiDeleteBin7Fill } from "react-icons/ri";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showfinished, setShowFinished] = useState(true)

  const hasMounted = useRef(false); // Track first render

  // 🔹 Load todos and todo input from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedTodoInput = localStorage.getItem("todoInput");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    if (savedTodoInput) {
      setTodo(savedTodoInput);
    }
  }, []);

  // 🔹 Save todos after first mount only
  useEffect(() => {
    if (hasMounted.current) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      hasMounted.current = true;
    }
  }, [todos]);

  // 🔹 Save the input box value (optional)
  useEffect(() => {
    localStorage.setItem("todoInput", todo);
  }, [todo]);



  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleEdit = async (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    })
    setTodo(t[0].todo)

    // Delete the todo from the list as it's getting edited
    let NewTodos = todos.filter(item => {
      return item.id !== id
    });

    setTodos(NewTodos)

  }

  const handleDelete = (e, id) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this?");
    if (isConfirmed) {
      let id_new = id;

      let NewTodos = todos.filter(item => {
        return item.id !== id
      });

      setTodos(NewTodos)

    }
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);

    setTodo("")

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id
    })
    let NewTodos = [...todos];

    NewTodos[index].isCompleted = !NewTodos[index].isCompleted
    setTodos(NewTodos)

    // todos.filter((item)=>{
    //   if (item.id === id) {
    //    item.isCompleted= !item.isCompleted;
    //    console.log(item); 
    //   }

    // })

  }

  const toggleFinished = (e) => {
    setShowFinished(!showfinished)
    console.log(showfinished);

  }



  return (
    <>
      <Navbar />
      <div className="container mx-2 md:mx-auto my-6 md:w-1/2 w-auto p-4 bg-slate-200 rounded-xl min-h-[80vh] ">
        <h1 className='font-bold text-3xl text-center my-2 mb-6'>TaskNest - All your tasks, in one place.</h1>

        <div className="addTodo ">
          <h2 className="text-2xl font-bold">Add a todo</h2>
          <div className="flex flex-col justify-center items-center gap-3">

            <input onChange={handleChange} value={todo} type="text" className="bg-white w-full p-2 rounded-lg my-2" />
            <button onClick={handleAdd} disabled={todo.length <= 2} className="bg-slate-700 w-1/2 mx-4 rounded-full hover:bg-slate-800 disabled:bg-slate-400 p-4 py-2 text-sm font-bold text-white cursor-pointer" >Save</button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-3">Your todos</h1>

        <input type="checkbox" id='show' onChange={toggleFinished} checked={showfinished} className='my-2 cursor-pointer' /> <label htmlFor="show" className='cursor-pointer mx-2'>Show Finished tasks</label>
        <div className="h-[1px] bg-black opacity-40 w-[90%] my-3 mx-auto"></div>

        <div className="todos">

          {todos.length === 0 && <div className='p-4'> No Todos to display </div>}

          {todos.map((item) => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex   justify-between items-center my-6">
              <div className="flex items-center gap-5">

                <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="btns flex ">
                <button onClick={(e) => handleEdit(e, item.id)} className="bg-slate-700 mx-2 rounded-full hover:bg-slate-800 disabled:bg-slate-500 p-4 py-2 text-sm font-bold text-white cursor-pointer" ><RiEdit2Fill /></button>

                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-slate-700 mx-2 rounded-full hover:bg-slate-800 disabled:bg-slate-500 p-4 py-2 text-sm font-bold text-white cursor-pointer" ><RiDeleteBin7Fill /></button>
              </div>
            </div>

          })}
        </div>

      </div>
    </>
  )
}

export default App
