//@@viewOn:imports
import {Tabs} from "@karel/ctrl_f_pro_elements";
import lsi from "../lsi/lsi.json";
import Search from "../components/search/Search.jsx";
import { SearchProvider } from "../components/search/Search-provider.jsx";

//@@viewOff:imports

//@@viewOn:constants

const TABS = ["search", "test"];
//@@viewOff:constants

//@@viewOn:helpers
const getContent = (tab) => {
    switch (tab) {
        case "search":
            return <Search/>;
        case "test":
            return <div>Test</div>;
    }
};

const getTabItemList = (currentLsi) => {
    return TABS.map(tab => {
        return {
            code: tab, label: currentLsi[tab] ?? tab, children: getContent(tab)
        };
    });
};

//@@viewOff:helpers

//@@viewOn:render
function TabsContent() {

    const currentLsi = lsi["tabs"]

    console.log(currentLsi);

    return (<SearchProvider> <Tabs itemList={getTabItemList(currentLsi)}/></SearchProvider>)
}

//@@viewOff:render

//@@viewOn:exports

export default TabsContent
//@@viewOff:exports
