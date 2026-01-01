import { useEffect, useState, createContext } from "react";
import StepBuilder from "./Components/StepBuilder";
import StartWithDiamond from "./Pages/StartWithDiamond";
import ViewDiamond from "./Pages/ViewDiamond";
import CompleteRing from "./Pages/CompleteRing";
import { DataContext } from "./Context/DataContext";

function App() {
  const [dataType, setDataType] = useState({});

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      let content = meta.getAttribute("content") || "";
      if (!content.includes("maximum-scale")) {
        content += ", maximum-scale=1";
        meta.setAttribute("content", content.trim());
      }
    }

    const root = document.getElementById("root");
    if (root) {
      setDataType(root.dataset);
    }
  }, []);
  
  return (
   <>
    {Object.keys(dataType).length > 0 ? (
      <DataContext.Provider value={dataType}>
        {(() => {
      if (dataType.collection === dataType.ringlist && dataType.page === "collection") {
        return <StepBuilder pagetype="ring-list" />;
      }
      if (dataType.productCollection === dataType.ringdetails && dataType.page === "product") {
        return <StepBuilder pagetype="ring-detail" />;
      }
      if (dataType.handle === dataType.diamondlist) {
        return <StartWithDiamond />;
      }
      if (dataType.handle === dataType.diamonddetails) {
        return <ViewDiamond />;
      }
      if (dataType.handle === dataType.completepage) {
        return <CompleteRing />;
      }
      return null;
    })()}
      </DataContext.Provider>
    ) : (
      <p></p> // or null
    )}
  </>
  );
}

export default App;
