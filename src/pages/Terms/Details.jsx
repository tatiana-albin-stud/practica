import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PoliticsAPI } from "api_inbusiness";
import styles from "./Stilizare.module.scss";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    PoliticsAPI.getById(id).then((res) => {
      if (res.ok) {
        setData(res.data);
      }
      setLoading(false);
    });
  }, [id]);
  console.log(data);
  return (
    !loading && ( 
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Titlu:    {data.title}</h1>
          <hr />
        </div>
        <div className={styles.description}>
          <p>Descriere</p>
          <p>{data.description}</p>
        </div>
      </div>
      
    )
  );
};

export default Details;
