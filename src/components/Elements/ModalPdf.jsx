import React from 'react';
import styled from 'styled-components';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

export default function Modal({ children, onClose }) {
  return (
    <ModalBackdrop>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </CloseButton>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalBackdrop>
  );
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 80%;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  height: 30px;
  width: 30px;
  right: 15px;
  z-index: 10; /* Ensures it’s on top of everything */
  background: rgba(161, 243, 142, 0.9);
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  font-size: 1.5rem;
  color:rgb(162, 72, 72);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    color:rgb(252, 250, 250);
    transform: scale(1.2);
    background: rgba(251, 5, 5, 0.7);
  }

  i {
    font-size: 1.5rem;
  }
`;

const ModalBody = styled.div`
  height: 700px;
  overflow: auto;

  .react-pdf__Page__canvas {
    width: 100% !important;
    height: auto !important;
  }
      @media (max-width: 860px) {
    height: 700px;
  }
`;
