import axios from "axios";
import React, { useEffect, useState } from "react";

import CardComponent from "./component/CardComponent";

// https://jsonplaceholder.typicode.com/todos

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* <ul>
        {data.map((list, index) => (
          <li key={index}>
           {list.title} | {list.userId} | {list.body}
          </li>
        ))}
      </ul> */}
      <CardComponent data={data} setData={setData}/>
    </div>
  );
};

export default App;
