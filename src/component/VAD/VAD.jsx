import React, { useState, useEffect } from 'react';
import vad from 'voice-activity-detection';
import MediaStreamRecorder, { StereoAudioRecorder } from 'msr';

export const VAD = () => {

    let audioContext;
    const [mediaStream, setMediaStream] = useState(undefined);

    const requestMic = () => {
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            navigator.getUserMedia({audio: true}, startUserMedia, handleMicConnectError);
            console.log("the microphone permission has been successfully requested.");
        } catch (e) {
            handleUserMediaError();
        }
    }

    const handleUserMediaError = () => {
        console.warn("handle user media error.");
    }

    const handleMicConnectError = () => {
        console.warn("handle mic connect error.");
    }

    const startUserMedia = (stream) => {
        setMediaStream(stream);

        let recordedChunks = [];
        const mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.mimeType = "audio/wav";
        mediaRecorder.recorderType = StereoAudioRecorder;
        mediaRecorder.ondataavailable = (e) => recordedChunks.push(e);

        vad(
            audioContext,
            stream,
            {
                onVoiceStart: () => {
                    console.log(mediaStream);
                    mediaRecorder.start(50);
                },
                onVoiceStop: () => {
                    mediaRecorder.stop();
                    try {
                        mediaRecorder.save();
                        recordedChunks = [];
                    } catch (e) {
                        console.warn("failed to save file from blob.");
                    }
                },
            }
        );
    }

    const handleStop = () => {
        mediaStream.stop();
        setMediaStream(undefined);
    }

    return (
        <div>
            {
                mediaStream === undefined ? (
                    <button onClick={() => requestMic()}>press to start voice activity detection.</button>
                ) : (
                    <button onClick={() => handleStop()}>press to stop voice activity detection.</button>
                )
            }
        </div>
    )
}