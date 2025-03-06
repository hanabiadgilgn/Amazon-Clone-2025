
import React, {createContext, useReducer} from 'react'

export const DataContext = createContext()


export const DataProvider = ({ children, reducer, initialState}) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};



// by passing (reducer & initialState) useReducer return the state and the dispatcher
// const [state, dispatch] = useReducer(reducer, initialState);