import React, {useState} from 'react';
import {createContext} from 'react';

export const HomeContext = createContext();

const HomeContextProvider = ({children}) => {
  const [feeds, setFeeds] = useState([]);
  return (
    <HomeContext.Provider value={{feeds, setFeeds}}>
      {children}
    </HomeContext.Provider>
  );
};
export default HomeContextProvider;
