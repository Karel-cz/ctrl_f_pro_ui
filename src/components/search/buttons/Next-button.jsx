//@@viewOn:imports
import { Button } from "@karel/ctrl_f_pro_elements";
import Icons from "../../../utils/enums.js";

//@@viewOff:imports

//@@viewOn:render
function NextButton(props) {
  return (
    <div>
      <Button icon={Icons.arrowRight} {...props} />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default NextButton;
//@@viewOff:exports
