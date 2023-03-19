import React, {useState} from 'react';
import {createContext} from 'react';

export const HomeContext = createContext();

const HomeContextProvider = ({children}) => {
  const [feeds, setFeeds] = useState([]);
  const [userInfo, setUserInfo] = useState(undefined);

  return (
    <HomeContext.Provider value={{feeds, setFeeds, userInfo, setUserInfo}}>
      {children}
    </HomeContext.Provider>
  );
};
export default HomeContextProvider;
