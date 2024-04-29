import React, { useEffect, useState } from "react"
import { Navbar } from "./Navbar";
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";

const ApplyJob = () => {

    const url="http://localhost:8080/";
    
    const [firstName, setfName] = useState();
    const [lastName, setlName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    
    const {id}=useParams();
    const {user}=useAuthContext();

    useEffect(()=>{
        if(!user){
            navigate('/login');
            return;
        }

        if(user.role!=='user'){
            // console.log(user.role)
            navigate('/admin/home');
            return;
          }
    },[user])

    const navigate=useNavigate();

    function applyJob(e){
        e.preventDefault();

        if(!user){
            // navigate('/login');
            return;
        }

        axios.post(url+'postForm/'+id, {firstName,lastName,email,phone}, {headers:{Authorization:'Bearer ' + user.token}})
        .then((r)=>{
            console.log(r.data);
            axios.put(url+'pushCId/'+id, {}, {headers:{Authorization:'Bearer ' + user.token}})
            .then(()=>{
                console.log('pushed');
            })
            .catch((e)=>{
                console.log(e);
            })
            navigate('/');
        })
        .catch((e)=>{
            console.log(e.response.data.error);
        })

        
    }

    return (


        <div className="container">
            <Navbar />
            <div className="row justify-content-center m-5">
                <div className="col-md-6 shadow pb-4 bg-body rounded">
                    <h3 className="text-center my-3 fw-bold text-primary">Job Application Form</h3>
                    <form onSubmit={applyJob}>

                        <div class="form-floating">
                            <input type="text" class="form-control my-1" id="floatingInput" onChange={(e) => setfName(e.target.value)} placeholder="Enter First Name"/>
                            <label for="floatingInput">Enter First Name</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control my-1" id="floatingPassword" onChange={(e) => setlName(e.target.value)} placeholder="Enter Last Name" />
                            <label for="floatingPassword">Enter Last Name</label>
                        </div>
                        <div class="form-floating">
                            <input type="text" class="form-control my-1" id="floatingPassword"onChange={(e) => setEmail(e.target.value)}  placeholder="Enter email"/>
                            <label for="floatingPassword">Enter Email</label>
                        </div>
                        <div class="form-floating">
                            <input type="number" class="form-control my-1" id="floatingPassword"onChange={(e) => setPhone(e.target.value)}  placeholder="Enter Phone"/>
                            <label for="floatingPassword">Enter Phone</label>
                        </div>
                        <div className="text-center pt-2">
                            <button type="submit" className="btn btn-primary rounded-pill py-2 px-5">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ApplyJob
