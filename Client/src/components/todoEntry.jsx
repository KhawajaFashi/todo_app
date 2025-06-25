import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

const Todos = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const handleAddTodo = async (e) => {
        // e.preventDefault();
        if (todo.trim() === "") {
            alert("Please enter a todo item.");
            return;
        }
        await axios.post("http://localhost:3000/api/todos", { todo })
            .then(response => {
                console.log("Todo added:", response.data);
            })
            .catch(error => {
                console.error("There was an error adding the todo!", error);
            });
        setTodos([...todos, todo]);
        setTodo("");
        console.log(todo);
        triggerRefresh();
    }

    const handleDeleteTodo = async (todo) => { 
        await axios.post(`http://localhost:3000/api/deleteTodo`, { todo })
            .then(response => {
                console.log("Todo deleted:", response.data);
            })
            .catch(error => {
                console.error("There was an error deleting the todo!", error);
            });
        triggerRefresh();
    }
    const handleCompleteTodo = async (todo) => { 
        await axios.post(`http://localhost:3000/api/completeTodo`, { todo })
            .then(response => {
                console.log("Todo Completed:", response.data);
            })
            .catch(error => {
                console.error("There was an error completing the todo!", error);
            });
        triggerRefresh();
    }

    const triggerRefresh = () => setRefresh(prev => prev + 1);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getTodos");
                console.log("Todos fetched:", response.data.data);
                setTodos(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the todos!", error);
            }
        }
        fetchTodos();

    },[refresh]);

    return (
        <div className="flex-col justify-center items-center">
            <input type="text" name="" id="" onChange={(e) => setTodo(
                e.target.value
            )} value={todo} placeholder="Enter your todo here" className="w-2xs pl-3 pr-2 pt-2.5 pb-2.5 rounded-[15px] border-2 border-amber-50" />
            <button className="p-3.5 m-4 rounded-2xl bg-purple-900 cursor-pointer" onClick={handleAddTodo}>Add Note</button>

            <div>
                {todos.map((todo, index) => (
                    <div key={index} className="flex p-3 m-4 gap-5 items-center justify-center">
                        <p className="text-[30px] font-bold">{`Todo ${index + 1}`}</p>
                        <p className="text-[15px] w-xs break-words">{todo.text}</p>
                        <p className="text-[10px] text-gray-500">{new Date(todo.createdAt).toLocaleDateString()}</p>
                        <button className="p-2 rounded-lg bg-red-500 text-white cursor-pointer" onClick={() => {
                            handleDeleteTodo(todo)
                        }}>Delete</button>
                        <button className="p-2 rounded-lg bg-green-800 text-white cursor-pointer" onClick={() => {
                            handleCompleteTodo(todo)
                        }}>Completed</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Todos