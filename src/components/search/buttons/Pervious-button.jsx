//@@viewOn:imports
import Button from "../../../basic-componets/Button.jsx";
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
