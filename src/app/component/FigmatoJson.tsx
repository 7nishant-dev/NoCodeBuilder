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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    function extractFigmaIds(url: string): { fileId: string; nodeId: string | null } {
        const fileIdMatch = url.match(/\/design\/([a-zA-Z0-9]+)/);
        const nodeIdMatch = url.match(/node-id=([\d-]+)/);

        const fileId = fileIdMatch ? fileIdMatch[1] : "";
        const nodeId = nodeIdMatch ? nodeIdMatch[1] : null;

        return { fileId, nodeId };
    }

    const onFetchFigmaFile = async () => {
        setLoading(true);
        setErrorMessage(null);
        setFigmaJSON(null);
        setNocodeJSON(null);
        try {
            const { fileId, nodeId } = extractFigmaIds(figmaUrl);
            if (!fileId) {
                setErrorMessage("Invalid Figma URL. Please check the link format.");
                return;
            }

            const fetchedData = await FigmaNodes({ fileId, nodeId });
            if (fetchedData) {
                setFigmaJSON(fetchedData);
            } else {
                setErrorMessage("Could not fetch Figma data. Please try again.");
            }
        } catch (error) {
            console.log("Failed to fetch figma file", error);
            setErrorMessage("Failed to fetch Figma file. Please check the URL or try again later.");
        } finally {
            setLoading(false);
            setConverted(false);
        }
    };

    const onConvertToNocodeJSON = async () => {
        setErrorMessage(null);
        if (isIconButtonNode(figmaJSON)) {
            const matchedData = extractIconButtonData(figmaJSON, matchedIconButtonChild);
            if (matchedData) {
                const finalJSON = getBaseTemplate(matchedData);
                setConverted(true);
                if (finalJSON) {
                    setNocodeJSON(finalJSON[0]);
                }
            } else {
                setErrorMessage("Icon Button not found in this Figma node");
            }
        } else {
            setErrorMessage("This Figma file does not contain an Icon-Button");
        }
    };


    const onCopyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(nocodeJSON));
        setCopied(true);
        setTimeout(() => setCopied(false), 800);
    };

 // changes
    return (
        <>
            <div className="w-screen h-screen flex flex-col">
                <div className="bg-white shadow-md border-b border-blue-200 py-4 px-6">
                    <h1 className="text-4xl font-thin text-gray-500 text-center">
                        Fetch No-Code JSON from Figma URL for Icon Button
                    </h1>
                </div>


                <div className="flex flex-row gap-4 p-4 flex-1 overflow-hidden">
                    <div className="flex flex-1 flex-col gap-y-2 w-[45%]">
                        <div className="w-full flex flex-row gap-2">
                            <input
                                autoFocus
                                value={figmaUrl}
                                onChange={(e) => {
                                    setFigmaUrl(e.target.value);
                                    setErrorMessage(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
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

                        {errorMessage && (
                            <div className="text-red-500 bg-red-100 border border-red-300 rounded-md p-2">
                                {errorMessage}
                            </div>
                        )}

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
                                    style={{ maxHeight: "calc(100vh - 155px)" }}
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
            </div>
        </>

    );
}