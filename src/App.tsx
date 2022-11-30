import React from 'react';
import {Header} from "./components/Header";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {DetailsPage} from "./pages/DetailsPage";

function App() {
  return (
    <section className={"bg-[#E5E5E5]"}>

      <Header/>
      <div className={"pt-[110px] min-h-screen "}>
        <Routes>
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/detail/:id"} element={<DetailsPage/>}/>
        </Routes>
      </div>
    </section>
  );
}

export default App;
