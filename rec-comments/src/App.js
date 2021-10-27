import "./App.css";
import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [c, setC] = useState(0);
  useEffect(() => {
    find();
  }, [c]);

  function find() {
    axios
      .get("https://deependra-heroku-test-app.herokuapp.com/comments/1")
      .then(({ data }) => setData(data));
  }
  //postComment();
  return (
    <div className="App">
          <Comment
            dataIn={data}
            c={c}
            find={find}
            setC={setC}
            setData={setData}
          />
        
    </div>
  );
}

export default App;
