//@@viewOn:imports
import Icons from "../../../utils/enums.js";
import Checkbox from "../../../basic-componets/Checkbox.jsx";
import { useSearch } from "../Search-provider.jsx";

//@@viewOff:imports

//@@viewOn:render
function SearchCheckboxType() {
  const { isFuzzy, setIsFuzzy } = useSearch();
  return (
    <div>
      <Checkbox
        checked={isFuzzy}
        onChange={(val) => setIsFuzzy(val)}
        label="Použít fuzzy hledání"
      />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default SearchCheckboxType;
//@@viewOff:exports
