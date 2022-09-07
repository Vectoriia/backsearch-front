import React from "react";
import { useState, useEffect } from "react";
import DownloadIcon from "../image/download.png";
import SettingIcon from "../image/edit.png";
import { useNavigate } from "react-router-dom";
import {saveAs} from "file-saver";
export default function AdminPage() {
        const navigate = useNavigate();
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [query, setQuery] = useState("");
        const [items, setItems] = useState([]);

        const searchPhotos = async (e) => {
          e.preventDefault();
          fetch("https://localhost:7059/image/getImage?" + new URLSearchParams({filter: query}).toString())
                      .then((res) => res.json())
                      .then(
                          (result) => {
                              setIsLoaded(true);
                              setItems(result);
                          },
                          (error) => {
                              setIsLoaded(true);
                              setError(error);
                          }
                      );
        };

        useEffect(() => {
            fetch("https://localhost:7059/image/getImage")
                .then((res) => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        }, []);
        const download = (e,url) => {
          console.log(e.target.src);
          fetch(e.target.src, {
            method: "GET",
            headers: {}
          })
            .then(response => {
              if(response.ok){
                saveAs(url, "BackSearch.png");
              }
            })
            .catch(err => {
              console.log(err);
            });
        };
        const addPage = e => {
          e.preventDefault();
          navigate("/add-image");
        };
        const editPage = (e,id) => {
          e.preventDefault();
          navigate("/edit-image/"+id.toString());
      };

        if (error) {
            return <>{error.message}</>;
        } else if (!isLoaded) {
            return <>loading...</>;
        } else {
            return (
                /* here we map over the element and display each item as a card  */
                <div className="searchContainer">
                <div style={{ textAlign: "center", paddingBottom: "20px", paddingTop: "30px" }}><h2 className="title">BackSearch</h2></div>
                <form className="search-form"
                onSubmit={e => searchPhotos(e)}>
                  <input
                    type="text"
                    name="query"
                    className="search-input"
                    placeholder={`Try "dog" or "apple"`}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}/>
                  <button  type="submit" className="button">
                    Search
                  </button>
                  <button style={{ marginLeft: "8px"}} type= "button" onClick={e => addPage(e)} className="button">
                    Add
                  </button>
                </form>
                <div className="card-list">
                  {items.map((pic) => (
                    <div className="card" key={pic.id}>
                      <img
                        className="card--image"
                        alt={pic.description}
                        src={pic.url} 
                      ></img>
                      <span className="download">
                        <img src={DownloadIcon} alt="downloadImage" onClick={e => download(e,pic.url)}/>
                      <img src={SettingIcon} alt="settingImage" onClick={e=>editPage(e,pic.id)}/>
                      </span>
                    </div>
                  ))}{" "}
                </div></div>
            );
        }
    }