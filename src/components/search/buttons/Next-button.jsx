//@@viewOn:imports
import Button from "../../../basic-componets/Button.jsx";
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
