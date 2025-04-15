//import ButtonGradient from ".\src\assets\svg";
import Benefits from "./Benefits";
//import Collaboration from ".s/Collaboration";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Roadmap from "./Roadmap";
import React, { useState, useRef, useEffect } from 'react';


const Home = () => {
    return (
        <>
          <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
            <Header />
            <Hero />
            <Benefits />
            <Roadmap />
            <Footer />
          </div>
    
        </>
      );
  };
  
  export default Home;