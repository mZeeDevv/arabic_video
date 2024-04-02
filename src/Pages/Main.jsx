import React, { useState, useEffect } from "react";

export default function Main() {
    const [surahs, setSurahs] = useState([]);
    const [ayahs, setAyahs] = useState([]);
    const [previewAyahs, setPreviewAyahs] = useState([]);

    useEffect(() => {
        fetch("http://api.alquran.cloud/v1/surah")
            .then((res) => res.json())
            .then((data) => {
                setSurahs(data.data);
            });
    }, []);
    // http://api.alquran.cloud/v1/surah/1?offset=1&limit=3
    const getAyah = () => {
        const souratName = document.getElementById("souratName").value;

        fetch(
            `http://api.alquran.cloud/v1/surah/${souratName}`
        )
            .then((res) => res.json())
            .then((data) => {
                const numbersInSurah = data.data.ayahs.map(
                    (ayah) => ayah.numberInSurah
                );
                setAyahs(data.data.ayahs);
                console.log(ayahs)
                
            });
            
    };

    const ayahPreview = () => {
        const souratName = document.getElementById("souratName").value;
        const offset = document.getElementById("ayahStart").value;
        const limit = document.getElementById("ayahEnd").value;

        fetch(
            `http://api.alquran.cloud/v1/surah/${souratName}?offset=${offset-1}&limit=${limit}`
        )
            .then((res) => res.json())
            .then((data) => {
                setPreviewAyahs(data.data.ayahs);
            });
    };

    return (
        <>
            <section className="p-5 md:p-10 w-full overflow-y-auto h-screen" onChange={(e) => getAyah()}>
                <div>
                    <form action="" className="flex flex-col justify-center items-center gap-5 mb-5">
                        <div className="flex flex-wrap gap-5 md:gap-20 md:justify-center">
                            {/* Sourat Picker */}
                            <select
                                name="souratName"
                                id="souratName"
                                className="w-min-[10vw] p-2 border-2 rounded-md border-neutral-500 block"
                            >
                                <option value="">SELECT SOURAT</option>
                                {surahs.map((surah, index) => (
                                    <option key={index} value={surah.number}>
                                        {surah.englishName}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="ayahStart"
                                id="ayahStart"
                                className="w-min-[10vw] p-2 border-2 rounded-md border-neutral-500 block"
                                onChange={(e) => ayahPreview()}
                            >
                                <option value="">AYAH START</option>
                                {ayahs.map((ayah, index) => (
                                    <option
                                        key={index}
                                        value={ayah.numberInSurah}
                                    >
                                        {ayah.numberInSurah}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="ayahEnd"
                                id="ayahEnd"
                                className="w-min-[10vw] p-2 border-2 rounded-md border-neutral-500 block"
                                onChange={(e) => ayahPreview()}
                            >
                                <option value="">AYAH END</option>
                                {ayahs.map((ayah, index) => (
                                    <option
                                        key={index}
                                        value={ayah.numberInSurah}
                                    >
                                        {ayah.numberInSurah}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="translationType"
                                id="translationType"
                                className="w-min-[10vw] p-2 border-2 rounded-md border-neutral-500 block"
                            >
                                <option value="">TRANSLATION</option>
                                <option value="">1</option>
                                <option value="">2</option>
                                <option value="">3</option>
                            </select>
                        </div>
                        <button className="bg-green-500 px-5 py-2 rounded-md text-white font-bold">Preview</button>
                    </form>
                </div>
                {/* Div to display Ayah from Ayah Start and Ayah End */}
                <div>
                    <div className="flex flex-wrap gap-5 md:gap-20 md:justify-center">
                        <div className="w-full md:w-1/2 text-right">
                            <div className="bg-neutral-100 p-5 rounded-md">
                                <h1 className="text-2xl font-bold text-neutral-900 text-center">
                                    Ayah
                                </h1>
                                <p
                                    className="text-lg text-neutral-700"
                                    id="ayahDisplay"
                                >
                                    {previewAyahs.map((ayah, index) => (
                                        <p key={index}>{ayah.text}</p>
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="bg-neutral-100 p-5 rounded-md">
                                <h1 className="text-2xl font-bold text-neutral-900">
                                    Translation
                                </h1>
                                <p className="text-lg text-neutral-700">
                                    {ayahs.map((ayah, index) => (
                                        <p key={index}>{ayah.text}</p>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
