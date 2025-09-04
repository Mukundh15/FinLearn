import React,{useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login(){
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post("http://localhost:8080/login",{email,password},{withCredentials:true});
      if(response.data.message==="Login successful"){
        navigate("/");
      }else{
        alert(response.data.error || "Login failed");
      }
    }catch(err){
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="mt-5" style={{marginBottom:"7rem"}}>
      <h1 style={{ fontSize: "40px", textAlign: "center" }}>Login</h1>
      <div className="box" style={{ display: "flex", flexDirection: "column", gap: "15px",width:'500px', margin: "0 auto",marginTop:'2rem'}}>
        <TextField
          label="Enter Email"
          variant="outlined"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

export default Login;
