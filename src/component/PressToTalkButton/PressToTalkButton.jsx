import React, {useState} from 'react';
import { ReactMic } from 'react-mic';
import './PressToTalkButton.css';

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
    
    const saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            const url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());
    
    const onStop = (blob) => {
        console.log(blob);
        saveData(blob.blob, "testing.wav");
    }

    return (
        <div>
            {/* hidden button */}
            <ReactMic
                className="react-mic"
                mimeType="audio/wav"
                record={isRecording}
                onStop={onStop}
                onData={onData}
            />
            {
                isRecording ? (
                    <button onClick={() => {
                        stopRecording();
                    }}>press to stop recording</button>
                ) : (
                    <button onClick={() => {
                        startRecording();
                    }}>press to start recording</button>
                )
            }
        </div>
    );
}