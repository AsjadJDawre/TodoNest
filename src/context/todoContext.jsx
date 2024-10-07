import { createContext, useContext, useState, useEffect } from "react";

// Function to load todos from local storage
const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
};

// Function to save todos to local storage
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

// Create the TodoContext
export const TodoContext = createContext();

// TodoProvider component that wraps your app
export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(loadTodosFromLocalStorage());

    // Sync todos to local storage whenever they change
    useEffect(() => {
        saveTodosToLocalStorage(todos);
    }, [todos]);

    // Add todo function
    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: Date.now(), ...newTodo }
        ]);
    };

    // Update todo function
    const updateTodo = (id, updatedTodo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, ...updatedTodo } : todo
            )
        );
    };

    // Delete todo function
    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    // Toggle complete status function
    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            {children}
        </TodoContext.Provider>
    );
};

// Custom hook to use the TodoContext
export const useTodo = () => {
    return useContext(TodoContext);
};
