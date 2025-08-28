import "@mdi/font/css/materialdesignicons.min.css";
import React from "react";

console.log("React from UI:", React);

import TabsContent from "./content/Tabs-content.jsx";
import { ContextProvider } from "./content/Context-provider.jsx";

function App() {
  return (
    <>
      <TabsContent />
    </>
  );
}

export default App;
