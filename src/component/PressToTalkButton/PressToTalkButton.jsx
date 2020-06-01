import React, {useState} from 'react';
import { ReactMic } from 'react-mic';

export const PressToTalkButton = () => {
    
    const [isRecording, setRecording] = useState(false);

    const startRecording = () => {
        setRecording(true);
    }
    
    const stopRecording = () => {
        setRecording(false);
    }

    const onData = (blob) => {
    }
    
    const onStop = (blob) => {
    }

    return (
        <div>
            <ReactMic
                mimeType="audio/wav"
                record={isRecording}
                onStop={onStop}
                onData={onData}
            />
            <div>
                <button onClick={() => {
                    startRecording();
                }}>start recording</button>
                <button onClick={() => {
                    stopRecording();
                }}>stop recording</button>
            </div>
        </div>
    );
}