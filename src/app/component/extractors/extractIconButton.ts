// import type { FileNodesResponse } from '../types/figmatypes';
const DEFAULT_SIZE = "md";


export function extractIconButtonData(figmaResponse: any, iconButtonBlock: any) {
  const nodes = figmaResponse?.nodes;

  //Using node
  const firstNodeId = Object.keys(nodes)[0];
  const figmaNode = nodes[firstNodeId];
  const figmaDocument = figmaNode?.document;


  const iconName = iconButtonBlock?.children[0]?.name;

  // All the extractor functions *****************
  const getSize = () => {
    const componentProps = figmaDocument?.componentProperties;
    const size = componentProps?.Size?.value ?? DEFAULT_SIZE;
    return size;
  }

  const extractColor = () => {
    const componentName = figmaDocument?.name;
    if (!componentName || typeof componentName !== "string") return "neutral";

    //extracting color name 
    const parts = componentName.split(/[/\s]+/);
    const lastWord = parts[parts.length - 1].toLowerCase();

    //conditional to return color
    switch (lastWord) {
      case "neutral":
        return "neutral";
      case "error":
        return "danger";
      case "brand":
        return "brand";
      default:
        return "neutral"; // default fallback
    }
  }

  const pxToTokenMap: any = {
    0: 'none',
    2: 'xxs',
    4: 'xs',
    6: 'sm',
    8: 'md',
    12: 'lg' //keep it upper
  };

  const extractPadding = () => {
    const getToken = (value: any) => {
      if (value === undefined || value === null) return 'md'; // default to md
      return pxToTokenMap[value] || value;
    };

    return {
      top: `pe-${getToken(iconButtonBlock.paddingTop)}`,
      right: `pb-${getToken(iconButtonBlock.paddingRight)}`,
      bottom: `pt-${getToken(iconButtonBlock.paddingBottom)}`,
      left: `ps-${getToken(iconButtonBlock.paddingLeft)}`,
    };
  };

  const variant = iconButtonBlock?.background?.[0]?.type.toLowerCase(); 

  return {
    iconName,
    size: getSize(),
    color: extractColor(),
    variant,
    padding: extractPadding(),
  };
}
