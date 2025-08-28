//@@viewOn:imports
import { Button } from "@karel/ctrl_f_pro_elements";
import { useProjectContext } from "../../../content/Context-provider.jsx";

//@@viewOff:imports

//@@viewOn:render
function CloseButton(props) {
  const { Icons } = useProjectContext();
  return (
    <div>
      <Button icon={Icons?.close} {...props} />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default CloseButton;
//@@viewOff:exports
