
import { createContext } from "react";

export const TaskContext = createContext()

export const initialState = {
  completedTasks: [],
  verified: false,
}

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE_TASK":
      return {
        ...state,
        completedTasks: [...new Set([...state.completedTasks, action.payload])]
      };

    case "VERIFY_SUCCESS":
      return {
        ...state,
        verified: true
      };

    default:
      return state;
  }
}
