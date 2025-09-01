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
        />
        <PerviousButton />
        <NextButton />
        <CloseButton />
      </div>

      <div style={{ marginTop: 6, fontSize: 12 }}>
        <strong>Matches:</strong> {lastResult.count}
        {lastResult.sample.length > 0 && (
          <ul style={{ marginTop: 4, paddingLeft: 16 }}>
            {lastResult.sample.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default Search;
//@@viewOff:exports
