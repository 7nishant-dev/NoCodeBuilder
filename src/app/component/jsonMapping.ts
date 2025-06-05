
// const component = figmaProperties.component;
// const appearance = component.appearance;
// const styles = appearance.styles;

// const componentType = component.componentType;

export function getBaseTemplate(figmaProperties : any): any[] {

const color = figmaProperties.color;
const size = figmaProperties.size;
const variant = figmaProperties.variant;
const layout = "self-center";
// const padding = figmaProperties.padding;
const paddingLeft = figmaProperties.padding.left;
const paddingRight = figmaProperties.padding.right;
const paddingBottom = figmaProperties.padding.bottom;
const paddingTop = figmaProperties.padding.top;
const rotation = "0deg";


const icon = figmaProperties.iconName;

const visibility = true;
const displayName = "IconButton_1";

const id = "b_LBbk7"; //isko dekhte h , kya karna h

  return [
    [
      {
        createdTime: Date.now(),
        deleted: false,
        entityType: "e_i18n_namespace",
        id: "e_683d8104cc7c5b7dc342157c",
        lastModifiedBy: 522,
        modifiedTime: Date.now(),
        ownerUserId: 522,
        properties: {
          translations: {
            "b_LBbk7['component']['content']['addOns']['tooltip']['content']": {
              value: "this is tooltip",
            },
          },
          interfaceComponentId: "e_683d80eecc7c5b7dc3421572",
          interfaceId: "iconbutton",
          locale: "en-US",
        },
        standard: false,
        version: 28,
      },
      {
        createdTime: Date.now(),
        deleted: false,
        entityType: "e_i18n_namespace",
        id: "e_683d8104cc7c5b7dc342157b",
        lastModifiedBy: 522,
        modifiedTime: Date.now(),
        ownerUserId: 522,
        properties: {
          translations: {
            "navigation['primary']['4']['name']": {
              value: "Page 5",
            },
            "navigation['primary']['1']['name']": {
              value: "Page 2",
            },
            name: {
              value: "thisis_new",
            },
            "navigation['primary']['2']['name']": {
              value: "Page 3",
            },
            "navigation['secondary']['1']['name']": {
              value: "Profile",
            },
            "navigation['primary']['5']['name']": {
              value: "Page 6",
            },
            "navigation['secondary']['0']['name']": {
              value: "Notifications",
            },
            "navigation['primary']['3']['name']": {
              value: "Page 4",
            },
            "navigation['primary']['0']['name']": {
              value: "Homepage",
            },
          },
          interfaceComponentId: "common",
          interfaceId: "iconbutton",
          locale: "en-US",
        },
        standard: false,
        version: 28,
      },
      {
        createdTime: Date.now(),
        deleted: false,
        entityType: "e_component",
        id: "e_683d80eecc7c5b7dc3421572",
        lastModifiedBy: 522,
        modifiedTime: Date.now(),
        ownerUserId: 522,
        properties: {
          layout: {
            footer: "footer_id",
            header: "header_id",
            body: "root_id",
          },
          interfaceType: "application",
          componentType: "PAGE",
          metadata: {
            _blockCounter: {
              IconButton: 1,
            },
          },
          blocks: {
            header_id: {
              component: {
                componentType: "Stack",
                appearance: {
                  alignItems: "stretch",
                  reverseOrder: false,
                  styles: {
                    padding: {
                      all: "p-xl",
                    },
                    flexWrap: "flex-nowrap",
                    gap: {
                      all: "gap-xl",
                    },
                    width: "w-full",
                  },
                  theme: "inherit",
                  justifyContent: "flex-start",
                  direction: "row",
                },
                content: {
                  blockIds: ["__PLACEHOLDER__"],
                },
              },
              dpOn: [],
              visibility: {
                value: false,
              },
              displayName: "Header",
              additional: {
                isRootBlock: true,
              },
              dataSourceIds: [],
              id: "header_id",
            },
            [id]: {
              component: {
                componentType: "IconButton",
                appearance: {
                  color: color,
                  size: size,
                  variant: variant,
                  styles: {
                    layout: layout,
                    padding: {
                      custom: {
                        r: paddingRight,
                        b: paddingBottom,
                        t: paddingTop,
                        l: paddingLeft,
                      },
                    },
                    rotation: {
                      custom: rotation,
                    },
                  },
                },
                content: {
                  icon: icon,
                },
              },
              visibility: {
                value: visibility,
              },
              dpOn: [],
              displayName: displayName,
              dataSourceIds: [],
              id: id,
              parentId: "root_id",
            },
            root_id: {
              component: {
                componentType: "Stack",
                appearance: {
                  alignItems: "stretch",
                  reverseOrder: false,
                  styles: {
                    padding: {
                      all: "p-xl",
                    },
                    backgroundColor: "bg-workspace",
                    flexWrap: "flex-nowrap",
                    gap: {
                      all: "gap-md",
                    },
                    width: "w-full",
                    height: "h-full",
                  },
                  theme: "inherit",
                  wrapContent: false,
                  justifyContent: "center",
                  direction: "column",
                },
                content: {
                  blockIds: [id, "__PLACEHOLDER__"],
                },
              },
              dpOn: [],
              visibility: {
                value: true,
              },
              displayName: "Body",
              additional: {
                isRootBlock: true,
              },
              dataSourceIds: [],
              id: "root_id",
            },
            footer_id: {
              component: {
                componentType: "Stack",
                appearance: {
                  alignItems: "stretch",
                  reverseOrder: false,
                  styles: {
                    padding: {
                      all: "p-xl",
                    },
                    flexWrap: "flex-nowrap",
                    gap: {
                      all: "gap-md",
                    },
                    width: "w-full",
                  },
                  theme: "inherit",
                  justifyContent: "flex-start",
                  direction: "row",
                },
                content: {
                  blockIds: ["__PLACEHOLDER__"],
                },
              },
              dpOn: [],
              visibility: {
                value: false,
              },
              displayName: "Footer",
              additional: {
                isRootBlock: true,
              },
              dataSourceIds: [],
              id: "footer_id",
            },
          },
          name: "Homepage",
          flags: {
            shouldUseBuiltDependencies: true,
          },
          interfaceId: "iconbutton",
          dataSources: {},
          slug: "homepage",
          pageVariables: {},
        },
        standard: false,
        version: 34,
      },
    ],
  ];
}

// const retObj = getBaseTemplate();
// fs.writeFileSync("./output.json", JSON.stringify(retObj, null, 2));