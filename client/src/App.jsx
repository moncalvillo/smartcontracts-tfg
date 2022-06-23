import Footer from "./components/Footer";
import "./css/App.css";
import "./css/form.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { useState } from "react";
import { useEffect } from "react";
import Form from "./components/Form";


const App = () => {

  const [loading, setLoading] = useState(true);



  return (
      <div id="App" >
        <div className="container">
          <Form />
          <Footer />
        </div>
      </div>
  );
}

export default App;
