import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as htmlToImage from 'html-to-image';

function Preview() {
    const location = useLocation();
    const { state } = location;
    const { souratName, offset, limit} = state || {};
    const [previewAyahs, setPreviewAyahs] = useState([]);

    
    useEffect(() => {
        fetch(
            `http://api.alquran.cloud/v1/surah/${souratName}?offset=${offset-1}&limit=${limit}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPreviewAyahs(data.data.ayahs);
                console.log(previewAyahs)
            });
   
    }, []);

    // Define the download function

    function downloadImg() {
        const node = document.getElementById('my-node'); // Get the element
             if (node) {
            node.style.backgroundColor = 'white'; // Background color
            node.style.color = 'white'; // Text color
            htmlToImage.toPng(node)
                .then(function (dataUrl) {
                    download(dataUrl, 'my-node.png'); // Call download function
                })
                .catch(function (error) {
                    console.error('Error generating image:', error);
                });
        }
    }

    function download(dataUrl, filename) {
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // const ayahPreview = () => {
    //     fetch(
    //         `http://api.alquran.cloud/v1/surah/${souratName}?offset=${offset-1}&limit=${limit}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setPreviewAyahs(data.data.ayahs);
    //             console.log(previewAyahs)
    //         });
    // };
    
    return (
        <div id='my-node'>
            <p
             className="text-lg text-neutral-700"
            id="ayahDisplay"
                >
                {previewAyahs.map((ayah, index) => (
                    <p key={index}>{ayah.text}</p>
                        ))}
                        </p>
                        <button type='button' onClick={downloadImg}>Download</button>
        </div>
    );
}

export default Preview;
