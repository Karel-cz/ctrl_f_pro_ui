//@@viewOn:imports
import { Button } from "@karel/ctrl_f_pro_elements";
import { useProjectContext } from "../../../content/Context-provider.jsx";

//@@viewOff:imports

//@@viewOn:render
function PerviousButton(props) {
  const { Icons } = useProjectContext();
  return (
    <div>
      <Button icon={Icons?.arrowLeft} {...props} />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default PerviousButton;
//@@viewOff:exports
