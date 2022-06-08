import "./styles.css";
import React from "react";
import Dropzone from "./Dropzone";

function App() {
  // const [images, setImages] = useState([]);
  return (
    <div>
      <div className="container">
        <Dropzone />
      </div>
    </div>
  );
}

export default App;
