//@@viewOn:imports
import { Button } from "@karel/ctrl_f_pro_elements";
import { useProjectContext } from "../../../content/Context-provider.jsx";

//@@viewOff:imports

//@@viewOn:render
function NextButton(props) {
  const { Icons } = useProjectContext();
  return (
    <div>
      <Button icon={Icons?.arrowRight} {...props} />
    </div>
  );
}
//@@viewOff:render

//@@viewOn:exports
export default NextButton;
//@@viewOff:exports
