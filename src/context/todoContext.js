import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [{
        id: 1,
        todo: "To do Msg",
        completed: false,
    }],
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
};
