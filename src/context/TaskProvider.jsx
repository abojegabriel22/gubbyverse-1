
import { useReducer } from "react";
import { TaskContext, taskReducer, initialState } from "./Task.context.js";
export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};