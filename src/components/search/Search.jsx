//@@viewOn:imports
import { Input } from "@karel/ctrl_f_pro_elements";
import { useSearch } from "./Search-provider.jsx";
import PerviousButton from "./buttons/Pervious-button.jsx";
import NextButton from "./buttons/Next-button.jsx";
import CloseButton from "./buttons/Close-button.jsx";
import lsi from "../../lsi/lsi.json";

//@@viewOff:imports

//@@viewOn:render
function Search() {
  const { setSearchValue, searchValue } = useSearch();
  const currentLsi = lsi["search"];

  return (
    <div style={{ display: "flex" }}>
      <Input
        placeholder={currentLsi.placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        width="100%"
      />
      <PerviousButton />
      <NextButton />
      <CloseButton />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default Search;
//@@viewOff:exports
