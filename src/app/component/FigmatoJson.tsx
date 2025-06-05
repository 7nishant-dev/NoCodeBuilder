"use client";
import { useState } from "react";
import { FigmaNodes } from "./getData";
import { extractIconButtonData } from "./extractors/extractIconButton";
import { isIconButtonNode, matchedIconButtonChild } from "./isIconButtonNode";
import JSONPretty from 'react-json-pretty';
import { getBaseTemplate } from "./jsonMapping";
import type { FileNodesResponse } from "./types/figmatypes";



export default function FigmanToNoCode() {
    const [figmaUrl, setFigmaUrl] = useState("");
    const [figmaJSON, setFigmaJSON] = useState<FileNodesResponse>(null);
    const [nocodeJSON, setNocodeJSON] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [converted, setConverted] = useState(false);
    const [copied, setCopied] = useState(false);

    function extractFigmaIds(url: string): { fileId: string; nodeId: string | null } {
        const fileIdMatch = url.match(/\/design\/([a-zA-Z0-9]+)/);
        const nodeIdMatch = url.match(/node-id=([\d-]+)/);

        const fileId = fileIdMatch ? fileIdMatch[1] : "";
        const nodeId = nodeIdMatch ? nodeIdMatch[1] : null;

        return { fileId, nodeId };
    }

    const onFetchFigmaFile = async () => {
        setLoading(true);
        try {
            const fetchedData = await FigmaNodes(extractFigmaIds(figmaUrl));
            console.log(figmaUrl);
            if (fetchedData) setFigmaJSON(fetchedData);
        } catch (error) {
            console.log("Failed to fetch figma file", error);
        } finally {
            setLoading(false);
            setConverted(false)
        }
    };

    const onConvertToNocodeJSON = async () => {
        if (isIconButtonNode(figmaJSON)) {
            const matchedData = extractIconButtonData(figmaJSON, matchedIconButtonChild);
            if (matchedData) {
                console.log("this is matched data", matchedData);
                const finalJSON = getBaseTemplate(matchedData);
                setConverted(true)
                console.log("this is final json", finalJSON);
                if (finalJSON) {
                    setNocodeJSON(finalJSON[0]);
                }
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




    //https://www.figma.com/design/4r7C2sI9cktH4T8atJhmrW/Component-Sheet?node-id=1-5756&t=3Dr01wZubuH5Kmxv-4

    //https://www.figma.com/design/4r7C2sI9cktH4T8atJhmrW/Component-Sheet?node-id=1-2&t=E2zpwyr9bkPtqB9t-0

    return (
        <div className="flex flex-row gap-4 p-4 w-screen h-screen">
            <div className="flex flex-1 flex-col gap-y-2 w-[45%]">
                <div className="w-full flex flex-row gap-2">
                    <input
                        autoFocus
                        value={figmaUrl}
                        onChange={(e) => {
                            setFigmaUrl(e.target.value);
                            // setConverted(false);
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
                {converted && nocodeJSON && (
                    <>
                        <div
                            className="flex-1 relative border-2 border-blue-300 rounded-md p-2"
                            style={{ maxHeight: "calc(100vh - 80px)" }}
                        >
                            <div className="h-full overflow-y-auto rounded-md p-2 bg-white text-sm z-0 relative">
                                <JSONPretty data={nocodeJSON} />
                            </div>
                            {copied && (
                                <div className="absolute inset-0 bg-blue-200 opacity-25 flex items-center justify-center z-10 rounded-md pointer-events-none">
                                    <span className="text-blue-800 text-8xl font-semibold">
                                        Copied!
                                    </span>
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
