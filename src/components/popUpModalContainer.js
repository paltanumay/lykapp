import React from 'react';
import BlockUSerModal from './modals/blockUserModal';
import HarassmentModal from './modals/harassmentModal';
import HideModal from './modals/hideModal';
import MuteModal from './modals/muteModal';
import NudityModal from './modals/nudityModal';
import ReportPostModal from './modals/reportPostModal';
import UnfriendModal from './modals/unfriendModal';
import ViolentThreatsModal from './modals/violentThreats';
import PopUpModalWrap from './popUpModalWrap';

const PopUpModalContainer = ({popUpOpen, setPopUpOpen}) => {
  return (
    <>
      <UnfriendModal
        modalVisible={popUpOpen === 'unfriend' ? true : false}
        setModalVisible={setPopUpOpen}
      />
      <MuteModal
        modalVisible={popUpOpen === 'mute' ? true : false}
        setModalVisible={setPopUpOpen}
      />
      <HideModal
        modalVisible={popUpOpen === 'hide' ? true : false}
        setModalVisible={setPopUpOpen}
      />
      {/* <UnfriendModal modalVisible={popUpOpen} setModalVisible={setPopUpOpen} /> */}
      <ReportPostModal
        modalVisible={popUpOpen === 'report' ? true : false}
        setModalVisible={setPopUpOpen}
      />
      <BlockUSerModal
        modalVisible={popUpOpen === 'block' ? true : false}
        setModalVisible={setPopUpOpen}
      />

      {/* <HarassmentModal
        modalVisible={popUpOpen}
        setModalVisible={setPopUpOpen}
      /> */}
      <NudityModal modalVisible={popUpOpen} setModalVisible={setPopUpOpen} />

      {/* <ViolentThreatsModal
        modalVisible={popUpOpen}
        setModalVisible={setPopUpOpen}
      /> */}
    </>
  );
};
export default PopUpModalContainer;
