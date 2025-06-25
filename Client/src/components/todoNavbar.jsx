import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Todos from './todoEntry';
import CompletedTodos from './completedTodos';
import DeletedTodos from './deletedTodos';

const TodoNavbar = () => {
    return (
        <div>
            <Router>
                <nav>
                    <h1>Todo App</h1>
                    <ul className='flex justify-between gap-12 p-8 text-2xl font-bold'>
                        <li><Link to="/" className='hover:text-gray-400 underline'>Add Todo</Link></li>
                        <li><Link to="/complete" className='hover:text-gray-400 underline'>Completed</Link></li>
                        <li><Link to="/delete" className='hover:text-gray-400 underline'>Deleted Todo</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Todos />} />
                    <Route path="/complete" element={<CompletedTodos />} />
                    <Route path="/delete" element={<DeletedTodos />} />
                </Routes>
            </Router>
        </div>
    )
}

export default TodoNavbar