import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as htmlToImage from 'html-to-image';

function Preview() {
    const location = useLocation();
    const { state } = location;
    const { souratName, offset, limit, translationType, recitationType} = state || {};
    const [previewAyahs, setPreviewAyahs] = useState([]);
 console.log(souratName, offset, limit, translationType, recitationType)

    
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
    
    return (

        <>
       <section className='w-full'>
       <div  className='flex justify-end m-10 '>
        <p
        id='my-node'
         className="text-3xl bg-gray-700 text-white leading-24 spacing-4 text-end p-3  max-w-4xl " style={{lineHeight: '3rem'}}
        
            >
            {previewAyahs.map((ayah, index) => (
                <p key={index}>{ayah.text}</p>
                    ))}
                    </p>
    </div>
    <div className=' bg-gray-700 w-full bottom-0 fixed py-6 flex justify-center'> 
    <button className="bg-green-500 px-5 py-2 rounded-md text-white font-bold" onClick={downloadImg}>Download</button>

    </div>
       </section>
        </>
        
    );
}

export default Preview;
