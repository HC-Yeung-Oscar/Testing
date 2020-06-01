import React, { useEffect } from 'react';
import vad from 'voice-activity-detection';
import MediaStreamRecorder, { StereoAudioRecorder } from 'msr';

export const VAD = () => {

    let audioContext;

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
        let recordedChunks = [];

        const mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.recorderType = StereoAudioRecorder;

        mediaRecorder.ondataavailable = (e) => {
            recordedChunks.push(e);
        };

        if (audioContext && stream) {
            vad(
                audioContext,
                stream,
                {
                    onVoiceStart: () => {
                        console.log("voice started");
                        mediaRecorder.start(50);
                    },
                    onVoiceStop: () => {
                        console.log("voice stopped");
                        mediaRecorder.stop();
                        console.log(recordedChunks);
                        recordedChunks = [];
                    },
                    onUpdate: (val) => {
                    }
                }
            );
        }
    }

    return (
        <div>
            <button onClick={() => requestMic()}>testing</button>
        </div>
    )
}