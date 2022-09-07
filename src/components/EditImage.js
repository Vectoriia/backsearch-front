import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useHistory, useParams } from "react-router";
export default function EditImage() {
        const {curId}=useParams();
        const [img,setImg] = useState(null);
        const [url, setUrl] = useState("");
        const [description, setDescription] = useState("");
        const navigate = useNavigate();
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(true);
        const [fallback, setFallback] = useState(false);
        const contactSubmit =  (e) => {
            e.preventDefault();
            
              fetch(`https://localhost:7059/image/editImage?`+ new URLSearchParams({id: curId}).toString(), {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    url: url,
                    description: description,
                })
                  }).then(response=>{
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text) })
                    }  else{
                        return response.json()
                    }
                    })
                  .then(data => {
                      console.log('Success: image is edited');
                      navigate("/admin-page");
                  }).catch(error=>{
                      console.warn('ERROR' + error);
                      alert(error);
                  });
            } 
            useEffect( () => {
              if(url){
                  setUrl(url);
              }else if(url=== ""){
                
                console.log({curId});
                fetch("https://localhost:7059/image/getImageById?" + new URLSearchParams({id: curId}).toString())
                      .then((res) => res.json())
                      .then(
                          (result) => {
                              setIsLoaded(true);
                              setImg(result);
                              setUrl(result.url);
                              setDescription(result.description);
                          },
                          (error) => {
                              setIsLoaded(true);
                              setError(error);
                          }
                      );
              }
              console.log(img);
            },[curId,url])
            
            const showUrl= (e) => {
              if(url!=""){
                setImg(url);
                console.info("h");
              }else{
                setImg("https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg");
             }
            };
            const deleteImage = e => {
              e.preventDefault();
              fetch("https://localhost:7059/image/deleteImage?" + new URLSearchParams({id: curId}).toString(),{
                method: 'DELETE',})
                      .then(
                          (result) => {
                              navigate("/admin-page");
                          },
                          (error) => {
                              setError(error);
                              alert(error);
                          }
                      );
            };
            return (
                <div className="searchContainer">
                <div style={{ textAlign: "center", paddingBottom: "20px", paddingTop: "30px" }}><h2 className="title">BackSearch</h2></div>
                <div className="card-list">
                <div className="card" style={{ marginBottom:"40px"}}>
                      <img
                        className="card--image"
                        src={url}
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
                    value={description}/><br></br>
                  <button type="submit" className="button" onClick={console.log({description})}>
                    Edit
                  </button>
                  <button style={{ marginLeft: "8px"}} type= "button" onClick={e => deleteImage(e)} className="button">
                    Delete
                  </button>
                </form>
                    
                    </div>
            );

}