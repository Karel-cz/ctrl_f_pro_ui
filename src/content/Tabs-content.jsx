//@@viewOn:imports
import Tabs from "../basic-componets/Tabs.jsx";
import lsi from "../lsi/lsi.json";
import Search from "../components/search/Search.jsx";
import { SearchProvider } from "../components/search/Search-provider.jsx";

//@@viewOff:imports

//@@viewOn:constants

const TABS = ["search", "test", "i"];
//@@viewOff:constants

//@@viewOn:helpers
const getContent = (tab) => {
  switch (tab) {
    case "search":
      return <Search />;
    case "test":
      return <div>Test</div>;
    case "i":
      return (
        <div>
          <div>-- drak and drop někjakého rohu</div>
          <div>-- list componentu</div>
          <div>-- custom color scheme z palaety barev</div>
          <div></div>
        </div>
      );
  }
};

const getTabItemList = (currentLsi) => {
  return TABS.map((tab) => {
    return {
      code: tab,
      label: currentLsi[tab] ?? tab,
      children: getContent(tab),
      alignRight: tab === "i",
      width: tab === "i" ? 30 : undefined,
    };
  });
};

//@@viewOff:helpers

//@@viewOn:render
function TabsContent() {
  const currentLsi = lsi["tabs"];

  return (
    <SearchProvider>
      <Tabs itemList={getTabItemList(currentLsi)} />
    </SearchProvider>
  );
}

//@@viewOff:render

//@@viewOn:exports

export default TabsContent;
//@@viewOff:exports
