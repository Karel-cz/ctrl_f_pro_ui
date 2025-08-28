//@@viewOn:imports
import { Button } from "@karel/ctrl_f_pro_elements";
import Icons from "../../../utils/enums.js";

//@@viewOff:imports

//@@viewOn:render
function PerviousButton(props) {
  return (
    <div>
      <Button icon={Icons.arrowLeft} {...props} />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default PerviousButton;
//@@viewOff:exports
