import { useEffect, useState } from 'react';
import axios from 'axios';

async function audioToBase64(audioFile: Blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(audioFile);
    });
}

const Speaking = () => {
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
        null
    );
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [audioUrl, setAudioUrl] = useState<string>('');
    const [audioFile, setAudioFile] = useState<Blob | null>(null);
    const [transcription, setTranscription] = useState(null);

    useEffect(() => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const chunks: Blob[] = [];
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: 'audio/webm',
                    });

                    mediaRecorder.ondataavailable = (e) => {
                        chunks.push(e.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(chunks, {
                            type: 'audio/webm',
                        });
                        setAudioFile(audioBlob);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        setAudioUrl(audioUrl);
                    };

                    setMediaRecorder(mediaRecorder);
                });
        }
    }, []);

    useEffect(() => {
        if (audioFile) {
            // const formData = new FormData();
            // formData.append('audioFile', audioFile);

            audioToBase64(audioFile)
                .then((base64) => {
                    return axios.post('/api/speak', { base64 });
                })

                .then((response) => {
                    console.log(response.data);
                    setTranscription(response.data.text);
                });
        }
    }, [audioFile]);

    return (
        <div className="bg-blue">
            {isRecording ? (
                <button
                    onClick={() => {
                        if (mediaRecorder) {
                            mediaRecorder.stop();
                            setIsRecording(false);
                        }
                    }}
                >
                    Stop Recording
                </button>
            ) : (
                <button
                    onClick={() => {
                        if (mediaRecorder) {
                            setIsRecording(true);
                            mediaRecorder.start();
                        }
                    }}
                >
                    Start Recording
                </button>
            )}
            {audioUrl && <audio src={audioUrl} controls />}
        </div>
    );
};

export default Speaking;
