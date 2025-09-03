//@@viewOn:imports
import { Input } from "../../basic-componets/Input.jsx";
import { useSearch } from "./Search-provider.jsx";
import PerviousButton from "./buttons/Pervious-button.jsx";
import NextButton from "./buttons/Next-button.jsx";
import CloseButton from "./buttons/Close-button.jsx";
import lsi from "../../lsi/lsi.json";
import SearchCheckboxType from "./buttons/Search-checkbox-type.jsx";
//@@viewOff:imports

//@@viewOn:render
function Search() {
  const { setSearchValue, searchValue, lastResult } = useSearch();
  const currentLsi = lsi["search"];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ display: "flex" }}>
        <Input
          placeholder={currentLsi.placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          width="100%"
          autoFocus={true}
        />
        <PerviousButton />
        <NextButton />
        <CloseButton />
        <SearchCheckboxType />
      </div>

      {lastResult.sample.length > 0 && (
        <ul>
          {lastResult.sample.map((s, i) => (
            <li key={i}>
              <strong>{s.index}.</strong> {s.snippet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default Search;
//@@viewOff:exports
