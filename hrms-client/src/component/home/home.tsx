import React from "react";
import { Layout } from "antd";
import FeatureSection from "./components/featureSections";
import HomeMainSection from './components/mainPage';
import Dashboard from "../dashboard/dashboard";


function Home() {

  return (
      // <div className="home-page main-content">
      //     <HomeMainSection/>
      //     <FeatureSection/>
      // </div>
      <Dashboard/>
  );
}
export default Home;