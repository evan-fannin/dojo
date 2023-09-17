import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';

const Reading = () => {
    const [imageURL, setImageURL] = useState<string | null>(null);
    const [recognizedText, setRecognizedText] = useState<string | null>(null);
    const [highlightedText, setHighlightedText] = useState('');
    const [botResponse, setBotResponse] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (imageURL) {
            Tesseract.recognize(imageURL, 'chi_sim', {
                logger: (m) => console.log(m),
            }).then(({ data: { text } }) => {
                setRecognizedText(text);
            });
        }
    }, [imageURL]);

    useEffect(() => {
        try {
            const response = axios
                .post('/api/chat', { message: { content: highlightedText } })
                .then((response) => {
                    setBotResponse(response.data.message);
                });
        } catch (error) {
            console.error('Error:', error);
        }
    }, [highlightedText]);

    const handleTextHightlight = () => {
        const selection = window.getSelection() || '';
        const selectedText = selection.toString();
        setHighlightedText(selectedText);
    };

    return (
        <div className="w-full overflow-auto bg-gray-800 text-white h-screen flex flex-col items-center">
            <h1>Upload and Display Image using React Hooks</h1>

            {imageURL && (
                <div>
                    <div>
                        <Image
                            alt="not found"
                            width={250}
                            height={250}
                            src={imageURL}
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (imageURL) {
                                URL.revokeObjectURL(imageURL);
                                setImageURL(null);
                                setRecognizedText(null);
                            }
                            if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                            }
                        }}
                    >
                        Remove
                    </button>
                </div>
            )}

            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                        setImageURL(URL.createObjectURL(event.target.files[0]));
                    }
                }}
                ref={fileInputRef}
            />

            {recognizedText ? (
                <div className="pt-5" onMouseUp={handleTextHightlight}>
                    {recognizedText}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full">
                    <div className="border-t-4 border-dojo-purple rounded-full animate-spin w-12 h-12"></div>
                </div>
            )}

            <div className="pt-5 flex">{highlightedText}</div>
            <div className="pt-5 flex">{botResponse}</div>
        </div>
    );
};

export default Reading;
