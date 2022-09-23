import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Loader from "./Pages/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loading
      ? document.querySelector("body").classList.add("loading")
      : document.querySelector("body").classList.remove("loading");
  }, [loading]);

  return (
    <div>
      {loading ? (
        <Loader setLoading={setLoading} />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
