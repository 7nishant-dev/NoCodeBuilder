// "use client";
// import { useState } from "react";
// import { FigmaNodes } from "./getData";
// import { extractIconButtonData } from "./extractors/extractIconButton";
// import { isIconButtonNode, matchedIconButtonChild } from "./isIconButtonNode";

// export default function FigmanToNoCode() {
//     const [figmaUrl, setFigmaUrl] = useState("");
//     const [figmaJSON, setFigmaJSON] = useState<any>(null);
//     const [nocodeJSON, setNocodeJSON] = useState<any>(null);
//     const onFetchFigmaFile = async () => {
//         const fileId = '4r7C2sI9cktH4T8atJhmrW';
//         const nodeId = '407-7014';
//         const fetchedData = await FigmaNodes({ fileId, nodeId });
//         console.log(figmaUrl);
//         fetchedData && setFigmaJSON(fetchedData);
//     };
//     const onConvertToNocodeJSON = () => {
//         if (isIconButtonNode(figmaJSON)) {
//             const matchedData = extractIconButtonData(figmaJSON, matchedIconButtonChild);
//             if (matchedData) {
//                 console.log("this is matched data", matchedData);
//                 const finalJSON = getBaseTemplate(matchedData);
//                 console.log("this is final json", finalJSON);
//                 finalJSON && setNocodeJSON(finalJSON);
//             }
//             else {
//                 console.log("error fetchin data");
//             }
//         }
//         else
//             console.log("error in identifying icon block");
//     };
//     const onCopyToClipboard = () => {
//         navigator.clipboard.writeText(JSON.stringify(nocodeJSON));
//     };
//     return (
//         <div className="flex flex-row gap-4 p-4 w-screen h-screen">
//             <div className="flex flex-1 flex-col gap-y-2 w-[45%]">
//                 <div className="w-full flex flex-row gap-2">
//                     <input
//                         value={figmaUrl}
//                         onChange={(e) => setFigmaUrl(e.target.value)}
//                         className="border border-gray-300 rounded-md p-2 flex-1"
//                         placeholder="Figma File URL"
//                     />
//                     <button
//                         className="bg-blue-500 text-white rounded-md p-2"
//                         onClick={onFetchFigmaFile}
//                     >
//                         Fetch Figma File
//                     </button>
//                 </div>
//                 {figmaJSON && (
//                     <>
//                         <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2 ">
//                             {JSON.stringify(figmaJSON)}
//                         </div>
//                         <button
//                             className="bg-blue-500 text-white rounded-md p-2 self-end"
//                             onClick={onConvertToNocodeJSON}
//                         >
//                             Convert to Nocode JSON
//                         </button>
//                     </>
//                 )}
//             </div>
//             <div className="mt-[100px] w-[70px] h-[70px] shrink-0rounded-md flex items-center justify-center text-4xl text-gray-500">
//                 →
//             </div>
//             <div className="flex-1 flex flex-col gap-y-2 w-[45%]">
//                 {nocodeJSON ? (
//                     <>
//                         <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2">
//                             {JSON.stringify(nocodeJSON)}
//                         </div>
//                         <button
//                             className="bg-blue-500 text-white rounded-md p-2 self-end"
//                             onClick={onCopyToClipboard}
//                         >
//                             Copy to Clipboard
//                         </button>
//                     </>
//                 ) : null}
//             </div>
//         </div>
//     );
// }

"use client";
import { useState } from "react";
import { FigmaNodes } from "./getData";
import { extractIconButtonData } from "./extractors/extractIconButton";
import { isIconButtonNode, matchedIconButtonChild } from "./isIconButtonNode";
import JSONPretty from 'react-json-pretty';
import { getBaseTemplate } from "./jsonMapping";


export default function FigmanToNoCode() {
    const [figmaUrl, setFigmaUrl] = useState("");
    const [figmaJSON, setFigmaJSON] = useState<any>(null);
    const [nocodeJSON, setNocodeJSON] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [converted, setConverted] = useState(false);
    const [copied, setCopied] = useState(false);

    const onFetchFigmaFile = async () => {
        const fileId = "4r7C2sI9cktH4T8atJhmrW";
        const nodeId = "407-7014";
        setLoading(true);
        try {
            const fetchedData = await FigmaNodes({ fileId, nodeId });
            console.log(figmaUrl);
            if (fetchedData) setFigmaJSON(fetchedData);
        } catch (error) {
            console.log("Failed to fetch figma file", error);
        } finally {
            setLoading(false);
        }
    };

    const onConvertToNocodeJSON = () => {
        if (isIconButtonNode(figmaJSON)) {
            const matchedData = extractIconButtonData(figmaJSON, matchedIconButtonChild);
            if (matchedData) {
                console.log("this is matched data", matchedData);
                const finalJSON = getBaseTemplate(matchedData);
                console.log("this is final json", finalJSON);
                finalJSON && setNocodeJSON(finalJSON[0]);
            }
            else {
                console.log("error fetchin data");
            }
        }
        else
            console.log("error in identifying icon block");
    };

    const onCopyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(nocodeJSON));
        setCopied(true);
        setTimeout(() => setCopied(false), 900);
    };

    return (
        <div className="flex flex-row gap-4 p-4 w-screen h-screen">
            <div className="flex flex-1 flex-col gap-y-2 w-[45%]">
                <div className="w-full flex flex-row gap-2">
                    <input
                        autoFocus
                        value={figmaUrl}
                        onChange={(e) => {
                            setFigmaUrl(e.target.value);
                            setConverted(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onFetchFigmaFile();
                                setConverted(false);
                            }
                        }}
                        className="border border-gray-300 rounded-md p-2 flex-1"
                        placeholder="Figma File URL"
                    />
                    <button
                        className="bg-blue-500 text-white rounded-md p-2 transition duration-200 hover:bg-blue-600 cursor-pointer"
                        onClick={() => {
                            onFetchFigmaFile();
                            setConverted(false);
                        }}

                    >
                        Fetch Figma File
                    </button>
                </div>

                {loading ? (
                    <div className="flex bg-gray-200 border-[2px] border-gray-600 rounded-md items-center justify-center h-full text-blue-400 text-5xl">
                        Loading Figma data...
                    </div>
                ) : (
                    figmaJSON && (
                        <>
                            <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2 bg-white text-sm">
                                <JSONPretty data={figmaJSON} />
                            </div>
                            <button
                                className="bg-blue-500 text-white rounded-md p-2 self-end transition duration-200 hover:bg-blue-600 cursor-pointer"
                                onClick={onConvertToNocodeJSON}
                            >
                                Convert to Nocode JSON
                            </button>
                        </>
                    )
                )}
            </div>

            <div className="w-[70px] flex items-center justify-center">
                {converted && (
                    <div className="mt-[100px] h-[70px] shrink-0 rounded-md flex items-center justify-center text-4xl text-gray-500">
                        →
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col gap-y-2 w-[45%]">
                {nocodeJSON && (
                    <>
                        <div className="flex-1 relative overflow-y-auto border-2 border-blue-300 rounded-md p-2">
                            <div className="flex-1 overflow-y-auto rounded-md p-2 bg-white text-sm">
                                <JSONPretty data={nocodeJSON} />
                            </div>
                            {copied && (
                                <div className="absolute inset-0 opacity-25 bg-blue-200 flex items-center justify-center z-10 rounded-md transition duration-300">
                                    <span className="text-blue-800 text-8xl font-semibold">Copied!</span>
                                </div>
                            )}
                        </div>
                        <button
                            className="bg-blue-500 text-white rounded-md p-2 self-end transition duration-200 hover:bg-blue-600 cursor-pointer"
                            onClick={onCopyToClipboard}
                        >
                            Copy to Clipboard
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}