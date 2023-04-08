import React from 'react';
import HideModal from './modals/hideModal';
import MuteModal from './modals/muteModal';
import ReportPostModal from './modals/reportPostModal';
import UnfriendModal from './modals/unfriendModal';
import PopUpModalWrap from './popUpModalWrap';

const PopUpModalContainer = ({popUpOpen, setPopUpOpen}) => {
  return (
    <>
      {/* <MuteModal modalVisible={popUpOpen} setModalVisible={setPopUpOpen} /> */}
      {/* <HideModal modalVisible={popUpOpen} setModalVisible={setPopUpOpen} /> */}
      {/* <UnfriendModal modalVisible={popUpOpen} setModalVisible={setPopUpOpen} /> */}
      <ReportPostModal
        modalVisible={popUpOpen}
        setModalVisible={setPopUpOpen}
      />
    </>
  );
};
export default PopUpModalContainer;
