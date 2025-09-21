import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import WaitlistModal from "../components/common/WaitlistModal";
import VoiceCallButton from "../components/common/VoiceCallButton";
import { useModal } from "../context/ModalContext";

const MainLayout = ({ children, page }) => {
  const { isModalOpen, closeModal } = useModal();

  return (
    <>
      <Navbar page={page} />
      <main>{children}</main>
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
      <VoiceCallButton />
    </>
  );
};

export default MainLayout;
