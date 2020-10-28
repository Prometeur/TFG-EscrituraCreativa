import React,{useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [movieName,setMovieName] = useState("");
  const [review,setReview]= useState("");
  const [movieReviewList,setMovieList] = useState([]);
  
  const [newReview,setNewReview] = useState("");

  useEffect (()=>{

    Axios.get("http://localhost:3001/links/api/get").then((response)=>{
      setMovieList(response.data)
    });

  },[]);

  const submitReview = () =>{

    Axios.post("http://localhost:3001/links/api/insert",{
      movieName:movieName, 
      movieReview:review
    });

    setMovieList([movieReviewList,{movieName: movieName,movieReview:review},]);
    
  };


  
  const deleteReview = (movie) =>{
    Axios.delete(`http://localhost:3001/links/api/delete/${movie}`);
  };

  const updateReview = (movie) =>{
    Axios.put("http://localhost:3001/links/api/update",{
      movieName:movie,
      movieReview:newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1>CRUD APP</h1>

      <div className="form">
        <label> Nombre:</label>
        <input 
          type="text" 
          name="movieName" 
          onChange={(e)=>{
          setMovieName(e.target.value)
        }}
        />
        <label>Correo:</label>
        <input
          type="text" 
          name="review" 
          onChange={(e)=>{
            setReview(e.target.value)
          }}
        />
        <button onClick={submitReview}>Submit</button>
          
        {movieReviewList.map((val)=>{
          return (
          <div className="card">
            <h1>{val.nombre} </h1>
            <p> {val.correo}</p>

            <button onClick={() => {deleteReview(val.nombre)}}>Delete</button>
            
            
            <input type="text" id="updateInput" onChange={(e)=>{
              setNewReview(e.target.value)
            }}/>
            
            <button onClick={()=>{updateReview(val.nombre)}}>Update</button>
         
          </div>
          );
          })}
      </div>
    </div>
      
  );
}

export default App;
