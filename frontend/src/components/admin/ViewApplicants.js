import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewApplicants = () => {
    const url="http://localhost:8080/";

    const {user}=useAuthContext();
    const {id}=useParams();

    const [job,setJob]=useState();

    const navigate=useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login');
            return;
        }

        axios.get(url+'admin/getJobByID/'+id,{headers:{Authorization:'Bearer ' + user.token}})
        .then((r)=>{
            setJob(r.data);
        })
        .catch((e)=>{
            console.log(e);
        })
    },[user])
    return (
        <div>
            {job &&
                job.applicants.map((i)=>
                <>
                    <p>{i.firstName} {i.lastName} {i.email} </p>
                    {/* <p>{i.lastName}</p> */}
                    
                </>
            )

            }
        </div>
    )
}

export default ViewApplicants
