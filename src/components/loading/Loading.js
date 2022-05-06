import React from "react";
import loadingImage from 'img/icon/loading.png'
import { RaceBy } from "@uiball/loaders";

const Loading = () => {
  return (
    <section className="sectionLoading">
      <div className="loadingContainer">
        <img src={loadingImage} alt="loadingImage" />
        <RaceBy 
            speed={2}
            size={150}
            color="#C7B95A"
        />
      </div>
    </section>
  );
};

export default Loading;
