import "@mdi/font/css/materialdesignicons.min.css";

import TabsContent from "./content/Tabs-content.jsx";
import { ContextProvider } from "./content/Context-provider.jsx";

function App() {
  return (
    <>
      <ContextProvider>
        <TabsContent />
      </ContextProvider>
    </>
  );
}

export default App;
