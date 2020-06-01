import React from 'react';
import { FileUploadButton } from './component/FileUploadButton/FileUploadButton';
import { PictureTaker } from './component/PictureTaker/PictureTaker';
import './App.css';
import { VAD } from './component/VAD/VAD';
import { PressToTalkButton } from './component/PressToTalkButton/PressToTalkButton';

function App() {
  return (
    <div className="App">
      <FileUploadButton></FileUploadButton>
      <PictureTaker></PictureTaker>
      <VAD></VAD>
      <PressToTalkButton></PressToTalkButton>
    </div>
  );
}

export default App;
