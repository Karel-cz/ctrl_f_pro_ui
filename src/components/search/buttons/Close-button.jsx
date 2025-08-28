//@@viewOn:imports
import { Button } from "@karel/ctrl_f_pro_elements";
import Icons from "../../../utils/enums.js";

//@@viewOff:imports

//@@viewOn:render
function CloseButton(props) {
  return (
    <div>
      <Button icon={Icons.close} {...props} />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default CloseButton;
//@@viewOff:exports
