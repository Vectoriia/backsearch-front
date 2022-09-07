import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddImage() {
        const navigate = useNavigate();
        const [img,setImg] = useState(``);
        const [fallback, setFallback] = useState(false);
        const [url, setUrl] = useState("");
        const [descritption, setDescription] = useState("");
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(true);
        const contactSubmit =  (e) => {
            e.preventDefault();
            
              fetch(`https://localhost:7059/image/addImage`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    description: descritption,
                })
                  }).then(response=>{
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text) })
                    }  else{
                        return response.json()
                    }
                    })
                  .then(data => {
                      console.log('Success: image is saved');
                      navigate("/admin-page");
                  }).catch(error=>{
                      console.warn('ERROR' + error);
                      alert(error);
                  });
            } 
            useEffect( () => {
                if(img){
                    setImg(img);
                }
                console.log(img);
              },[img])
              const reloadSrc = e => { 
                if(fallback){
                  e.target.src = "https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg";
                }else{
                  e.target.src = img
                  setFallback(true)
                }
              }
            const showUrl= (e) => {
              if(url!=""){
                setImg(url);
                console.info("h");
              }else{
                setImg("https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg");
              }
            };
            if (error) {
                return <>{error.message}</>;
            } else if (!isLoaded) {
                return <>loading...</>;
            } else {
            return (
                <div className="searchContainer">
                <div style={{ textAlign: "center", paddingBottom: "20px", paddingTop: "30px" }}><h2 className="title">BackSearch</h2></div>
                <div className="card-list">
                <div className="card" style={{ marginBottom:"40px"}}>
                      <img
                        className="card--image"
                        src={img}
                        onError={reloadSrc}
                      ></img>
                      
                </div>
                    </div>
                <form className="search-form"
                onSubmit={e => contactSubmit(e)}>
                  <input
                    type="text"
                    name="url"
                    className="search-input"
                    placeholder={`Put there your url`}
                    onBlur={e=>showUrl(e.target.value)}
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}/>
                    <input
                    type="text"
                    name="description"
                    className="search-input"
                    placeholder={`Put there description to image`}
                    onChange={(e) => setDescription(e.target.value)}
                    value={descritption}/><br></br>
                  <button type="submit" className="button">
                    Add
                  </button>
                </form>
                    
                    </div>
            );
            }
}