import { useState } from "react";
import axios from 'axios';
import { useEffect } from "react";

const CompletedTodos = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/getCompletedTodos");
                console.log("Todos fetched:", response.data.data);
                setTodos(response.data.data);
            } catch (error) {
                console.error("There was an error fetching the todos!", error);
            }
        }
        fetchTodos();

    },[]);

    return (
        <div className="flex-col justify-center items-center">
            <div>
                {todos.map((todo, index) => (
                    <div key={index} className="flex p-3 m-4 gap-5 items-center justify-center bg-green-500">
                        <p className="text-[30px] font-bold">{`Todo ${index + 1}`}</p>
                        <p className="text-[15px] w-xs break-words">{todo.text}</p>
                        <p className="text-[10px] text-gray-500">{new Date(todo.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CompletedTodos