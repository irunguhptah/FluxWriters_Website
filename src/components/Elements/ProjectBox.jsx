import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom'; // Import the zoom plugin
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import Modal from './ModalPdf'; // Assuming Modal component is imported here

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
`;

export default function ProjectBox({ pdf, title, text, action }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize the zoom plugin
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <PdfWrapper onClick={openModal}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdf} plugins={[zoomPluginInstance]} />
          </Worker>
        </PdfWrapper>
        <h3 className="font20 extraBold">{title}</h3>
        <p className="font13">{text}</p>

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <ZoomControls>
                <ZoomInButton />
                <ZoomOutButton />
                <ZoomPopover />
              </ZoomControls>
              <Viewer fileUrl={pdf} plugins={[zoomPluginInstance]} />
            </Worker>
          </Modal>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  color: #333;
  background: linear-gradient(135deg, #65ef87 0%, #71bfec 100%);
  font-family: 'Roboto', sans-serif;

  h3 {
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    color: #2c3e50;
    padding-left: 10px;
    padding-right: 10px;
  }

  p {
    font-size: 13px;
    color: #34495e;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const PdfWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin: 5px 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  background-color: #f7f7f7;
  border-radius: 10px;

  * {
    overflow: hidden !important;
  }

  .react-pdf__Document {
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-pdf__Page {
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-pdf__Page__canvas {
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain;
    display: block;
  }
`;

const ZoomControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  button {
    margin: 0 5px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }
  }
`;
