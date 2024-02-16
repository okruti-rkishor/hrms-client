import React from "react";
import { Layout } from "antd";
import FeatureSection from "./components/featureSections";
import HomeMainSection from './components/mainPage';


function Home() {

  return (
      <Layout className="home-page main-content">
          <HomeMainSection/>
          <FeatureSection/>
      </Layout>
  );
}
export default Home;