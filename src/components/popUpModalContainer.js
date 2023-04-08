import React from 'react';
import MuteModal from './modals/muteModal';
import PopUpModalWrap from './popUpModalWrap';

const PopUpModalContainer = ({popUpOpen, setPopUpOpen}) => {
  return (
    <>
      <MuteModal modalVisible={popUpOpen} setModalVisible={setPopUpOpen} />
    </>
  );
};
export default PopUpModalContainer;
