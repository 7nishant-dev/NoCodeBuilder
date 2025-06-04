"use client";
import { useState } from "react";
import { FigmaNodes } from "./getData";
import { extractIconButtonData } from "./extractors/extractIconButton";
import { isIconButtonNode, matchedIconButtonChild } from "./isIconButtonNode";

export default function FigmanToNoCode() {
    const [figmaUrl, setFigmaUrl] = useState("");
    const [figmaJSON, setFigmaJSON] = useState<any>(null);
    const [nocodeJSON, setNocodeJSON] = useState<any>(null);
    const onFetchFigmaFile = async () => {
        const fileId = '4r7C2sI9cktH4T8atJhmrW';
        const nodeId = '407-7014';
        const fetchedData = await FigmaNodes({ fileId, nodeId });
        console.log(figmaUrl);
        fetchedData && setFigmaJSON(fetchedData);
    };
    const onConvertToNocodeJSON = () => {
        if (isIconButtonNode(figmaJSON)) {
            const matchedData = extractIconButtonData(figmaJSON, matchedIconButtonChild);
            console.log(matchedData);
            matchedData && setNocodeJSON(matchedData);
        }
        else
        console.log("error in identifying icon block");
    };
    const onCopyToClipboard = () => {
        navigator.clipboard.writeText(JSON.stringify(nocodeJSON));
    };
    return (
        <div className="flex flex-row gap-4 p-4 w-screen h-screen">
            <div className="flex flex-1 flex-col gap-y-2 w-[45%]">
                <div className="w-full flex flex-row gap-2">
                    <input
                        value={figmaUrl}
                        onChange={(e) => setFigmaUrl(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 flex-1"
                        placeholder="Figma File URL"
                    />
                    <button
                        className="bg-blue-500 text-white rounded-md p-2"
                        onClick={onFetchFigmaFile}
                    >
                        Fetch Figma File
                    </button>
                </div>
                {figmaJSON && (
                    <>
                        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2 ">
                            {JSON.stringify(figmaJSON)}
                        </div>
                        <button
                            className="bg-blue-500 text-white rounded-md p-2 self-end"
                            onClick={onConvertToNocodeJSON}
                        >
                            Convert to Nocode JSON
                        </button>
                    </>
                )}
            </div>
            <div className="mt-[100px] w-[70px] h-[70px] shrink-0rounded-md flex items-center justify-center text-4xl text-gray-500">
                →
            </div>
            <div className="flex-1 flex flex-col gap-y-2 w-[45%]">
                {nocodeJSON ? (
                    <>
                        <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-2">
                            {JSON.stringify(nocodeJSON)}
                        </div>
                        <button
                            className="bg-blue-500 text-white rounded-md p-2 self-end"
                            onClick={onCopyToClipboard}
                        >
                            Copy to Clipboard
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    );
}
