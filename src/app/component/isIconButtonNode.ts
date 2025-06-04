import type { FileNodesResponse } from "./types/figmatypes";

export let matchedIconButtonChild: any | null = null;

export function isIconButtonNode(request:FileNodesResponse): boolean {
    const nodeWrapper = request.nodes[Object.keys(request.nodes)[0]];
  if (!nodeWrapper || !nodeWrapper.document) {
    return false;
  }
 
  const node = nodeWrapper.document;

  if (node.type !== "INSTANCE") {
    return false;
  }

  if (!node.children) {
    return false;
  }

  for (const child of node.children) {
    if (child.name?.toLowerCase().includes("icon button")) {
        matchedIconButtonChild = child; // Exported value set here
        return true;
    }
  }

  return false;
}