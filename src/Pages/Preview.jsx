import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import arabic from '../fonts/arabicRR.ttf'
import * as htmlToImage from 'html-to-image';


function Preview() {
    const location = useLocation();
    const { state } = location;
    const { souratName, offset, limit, translationType, recitationType} = state || {};
    const [previewAyahs, setPreviewAyahs] = useState([]);
    const [surahs, setSurahs] = useState([]);
   
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
        text: {
            width: '100%',  
            margin: 12,
            fontSize: 18,
            textAlign: 'right',
            fontFamily: 'ArabicFont',
            flexDirection: 'row',
            alignItems: 'center', 
               },
        translition: {
            textAlign: 'start',
            alignItems: 'start',
        },
        juz: {
            width: '100%',
            backgroundColor: 'lightgrey',
            textDecoration: 'underline',
            borderBottom: '1px solid black',
            padding: 12,
        },
       
    
    });
  function convertToArabic(num) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(number => arabicNumbers[number]).join('');
}

const MyDocument = (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                {previewAyahs.map((ayah, index) => (
                    <View key={index}>
                        {index === 0 && (
                           <Text style={styles.juz}>
                               Juz -{ayah.juz}
                           </Text>
                          
                        )}
                        <Text style={styles.text}>
                            {ayah.text}
                            {/* <Text style={styles.span}>{convertToArabic(ayah.numberInSurah)}</Text> */}
                        </Text>
                        <Text style={styles.translition}>
                            {surahs[index] ? surahs[index].text : ''}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);
    useEffect(() => {
        fetch(
            `https://api.alquran.cloud/v1/surah/${souratName}?offset=${offset-1}&limit=${limit}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPreviewAyahs(data.data.ayahs);
                console.log(data)
            });
   
    }, []);

    useEffect(() => {
        fetch(
            `https://api.alquran.cloud/v1/surah/${souratName}/en.asad`
        )
            .then((res) => res.json())
            .then((data) => {
                setSurahs(data.data.ayahs);
                console.log(data)
            });
      }, []);

    function downloadImg() {
        previewAyahs.forEach((ayah, index) => {
            const nodeId = `my-node-${index}`;
            const node = document.getElementById(nodeId);
            if (node) {
                htmlToImage.toPng(node)
                    .then(function (dataUrl) {
                        download(dataUrl, `${index}.png`);
                    })
                    .catch(function (error) {
                        console.error('Error generating image:', error);
                    });
            }
        });
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
       <div  className='flex justify-end m-10  max-h-[70vh]  overflow-auto  text-black font bg-white'>
        <p
        
         className="text-3xl  leading-24 spacing-4 text-end p-3  max-w-4xl " style={{lineHeight: '6rem'}}
            >
            {previewAyahs.map((ayah, index) => (
                <p key={index}>{ayah.text} <span className='bg-black text-white rounded-full h-[2px]'>{ayah.numberInSurah}</span></p> 
                    ))}
                    </p>
    </div>
   <div className='my-[4000px]'>
   {previewAyahs.map((ayah, index) => (
             <div  key={index} id={`my-node-${index}`} className=' bg-white text-center text-4xl h-[50vh] flex flex-col space-y-6 justify-center items-center'>
                <p className='flex items-center text-center'>
                    <span className='bg-black text-white rounded-full text-2xl mx-2 p-1'>
                    { convertToArabic(ayah.numberInSurah)}</span> 
                    {ayah.text}</p>
                    <p>
                    {surahs[index] && surahs[index].text}
                    <span className='bg-black text-white rounded-full text-2xl mx-2 p-1'>
                    { ayah.numberInSurah}</span> 
                    </p>
             </div>
                
                ))}
   </div>
    
    <div className=' bg-gray-700 w-full bottom-0 fixed py-6 flex justify-center items-center space-x-8'> 
    <div>
           <button className="bg-green-500 px-2 py-1 rounded-md text-white font-bold">
             <PDFDownloadLink document={MyDocument} fileName="surah" >
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download PDF '
                }
            </PDFDownloadLink>
           </button>
        </div>
        <button className="bg-green-500 px-2 py-1 rounded-md text-white font-bold" onClick={downloadImg}>Download PNG</button>
    </div>
       </section>
        </>
        
    );
}
export default Preview;



