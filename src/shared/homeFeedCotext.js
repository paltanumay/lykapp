import React, {useState} from 'react';
import {createContext} from 'react';

export const HomeContext = createContext();

const HomeContextProvider = ({children}) => {
  const [feeds, setFeeds] = useState([]);
  const [userInfo, setUserInfo] = useState(undefined);
  const [muteOpen, setMuteOpen] = useState(false);
  const [hideOpen, setHideOpen] = useState(false);
  const [blockUserOpen, setBlockUserOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [postDetails, setPostDetails] = useState({});

  return (
    <HomeContext.Provider
      value={{
        feeds,
        muteOpen,
        hideOpen,
        reportOpen,
        blockUserOpen,
        userInfo,
        connectOpen,
        postDetails,
        setPostDetails,
        setReportOpen,
        setBlockUserOpen,
        setConnectOpen,
        setHideOpen,
        setMuteOpen,
        setFeeds,
        setUserInfo,
      }}>
      {children}
    </HomeContext.Provider>
  );
};
export default HomeContextProvider;
