import type { FileNodesResponse } from "./types/figmatypes";

export async function FigmaNodes({
  fileId,
  nodeId,
}: {
  fileId: string;
  nodeId: string;
}) {
  try {
    console.log("this fnc was called");
    const rawData = await fetch(
      "https://api.qa.unifyapps.com/api-endpoint/figma/node-details",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FileId: fileId,
          NodeId: nodeId,
        }),
      }
    );

    const data = await rawData.json();
    // console.log(data);
    return data.Result as FileNodesResponse;
  } catch (error) {
    console.log("found this error", error);
  }
}