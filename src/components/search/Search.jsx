//@@viewOn:imports
import { Input } from "@karel/ctrl_f_pro_elements";
import { useSearch } from "./Search-provider.jsx";
//@@viewOff:imports

//@@viewOn:render
function Search() {
    const {  setSearchValue,
        searchValue } = useSearch();

    return (
        <div>
            <Input
                placeholder="Hledej text..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                width="100%"
            />


        </div>
    );
}
//@@viewOff:render

//@@viewOn:exports
export default Search;
//@@viewOff:exports
