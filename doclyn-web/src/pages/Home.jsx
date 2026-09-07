import React from "react";

import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <Sidebar activeMenu={"home"}>
      <div id="main">
        Home
      </div>
    </Sidebar>    
  );
};

export default Home;
