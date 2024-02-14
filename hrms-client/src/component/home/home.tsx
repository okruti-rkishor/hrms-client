import React from "react";
import { Layout } from "antd";
import FeatureSection from "./components/featureSections";


function Home() {

  return (
      <Layout className="home-page main-content">
        <FeatureSection/>
      </Layout>
  );
}
export default Home;