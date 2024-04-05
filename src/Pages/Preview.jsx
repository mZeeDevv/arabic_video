import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import arabic from '../fonts/arabicRR.ttf'
// import * as htmlToImage from 'html-to-image';

function Preview() {
    const location = useLocation();
    const { state } = location;
    const { souratName, offset, limit, translationType, recitationType} = state || {};
    const [previewAyahs, setPreviewAyahs] = useState([]);
   
    useEffect(() => {
        Font.register({ family: 'ArabicFont', src: arabic });
    }, []);

 const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    section: {
      margin: 8,
      padding: 10,
      flexGrow: 1,
      flexDirection: 'column',
      display: 'flex'
    },
    line: {
        maxWidth: '90%', 
        marginBottom: 2, 
    },
    text: {
        margin: 12,
        fontSize: '18px',
        textAlign: 'right',
        fontFamily: 'ArabicFont',
        display: 'flex',
        flexDirection: 'row',
       
        },
   span: {
         backgroundColor: 'black',
         color: 'white',
         padding: '2px 5px',
         borderRadius: '50%',
         marginLeft: 5,
         textAlign: 'start',
   }
   
  });
    
    useEffect(() => {
        fetch(
            `https://api.alquran.cloud/v1/surah/${souratName}?offset=${offset-1}&limit=${limit}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPreviewAyahs(data.data.ayahs);
                console.log(previewAyahs)
            });
   
    }, []);

    // Define the download function

    function downloadImg() {
        // const node = document.getElementById('my-node'); // Get the element
        //      if (node) {
        //     htmlToImage.toPng(node)
        //         .then(function (dataUrl) {
        //             download(dataUrl, 'my-node.png'); // Call download function
        //         })
        //         .catch(function (error) {
        //             console.error('Error generating image:', error);
        //         });
        // }
    }

    function download(dataUrl, filename) {
        var a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    // console.log(previewAyahs)
    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {previewAyahs.map((ayah, index) => (
                        <Text key={index} style={styles.text}>
                           {ayah.text}
                           
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
   
    return (
        <>
       <section className='w-full'>
       <div  className='flex justify-end m-10  max-h-[70vh]  overflow-auto  text-black font bg-white'>
        <p
        id='my-node'
         className="text-3xl  leading-24 spacing-4 text-end p-3  max-w-4xl " style={{lineHeight: '6rem'}}
            >
            {previewAyahs.map((ayah, index) => (
                <p key={index}>{ayah.text} <span className='bg-black text-white rounded-full h-[2px]'>{ayah.numberInSurah}</span></p> 
                
                    ))}
                    </p>
    </div>
    <div className=' bg-gray-700 w-full bottom-0 fixed py-6 flex justify-center'> 
    <div>
            {/* Display a button to download the PDF */}
            <PDFDownloadLink document={MyDocument} fileName="surah" className="bg-green-500 px-5 py-2 rounded-md text-white font-bold">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download '
                }
            </PDFDownloadLink>
        </div>
    </div>
       </section>
        </>
        
    );
}

export default Preview;



