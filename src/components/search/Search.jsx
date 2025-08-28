//@@viewOn:imports
import { Input } from "@karel/ctrl_f_pro_elements";
import { useSearch } from "./Search-provider.jsx";
import PerviousButton from "./buttons/Pervious-button.jsx";
import NextButton from "./buttons/Next-button.jsx";
import CloseButton from "./buttons/Close-button.jsx";

//@@viewOff:imports

//@@viewOn:render
function Search() {
  const { setSearchValue, searchValue } = useSearch();

  return (
    <div style={{ display: "flex" }}>
      <Input
        placeholder="Hledej text..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        width="100%"
      />
      {/*<PerviousButton />*/}
      {/*<NextButton />*/}
      {/*<CloseButton />*/}
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default Search;
//@@viewOff:exports
