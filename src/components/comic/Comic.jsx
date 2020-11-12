import React, { useState, useEffect } from "react";
import axios from "axios";
import { StarRating } from "../StarRating/StarRating";


const Comic = () => {
  const [loading, setLoading] = useState(true);
  const [comic, setComic] = useState(null);

  const fetchComic = (number) => {
    setLoading(true);
    axios
      .get(
        `https://xkcd.com/${number}/info.0.json`
      )
      .then((response) => setComic(response.data))
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComic(Math.floor(Math.random()*2000));
  }, []);


  return (
    <div >
      <h1>{loading ? "Loading..." : comic.title}</h1>
      <div className="buttons">
        <button
          disabled={loading}
          onClick={() => fetchComic(Math.floor(Math.random() * 2000))}
        >
          Siguiente
        </button>
      </div>
      {loading ? (
        <div className="loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="comic">
          <img src={comic.img} title={comic.alt} alt={comic.title} />
          <StarRating />
        </div>
      )}
    </div>
  );
};


export default Comic;
