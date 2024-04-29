import React, { useEffect, useState } from "react"
// import { Navbar } from "./Navbar";
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const PostJob = () => {

    const url="http://localhost:8080/";

    const navigate=useNavigate();

    const [title, setTitle] = useState();
    const [company, setCompany] = useState();
    const [role, setRole] = useState();
    const [description, setDescription] = useState();
    const [requirements, setRequirements] = useState();
    const [responsibilities, setResponsibilities] = useState();
    const [location, setLocation] = useState();
    const [salary, setSalary] = useState();

    const {user}=useAuthContext();

    function addJob(e){
        e.preventDefault();

        axios.post(url+'admin/postjob',{title,company,requirements,responsibilities,role,description,location,salary},{headers:{Authorization:'Bearer ' + user.token}})
        .then((r)=>{
            console.log(r.data);
            navigate('/admin/home')
        })
        .catch((e)=>{
            console.log(e);
        })

    }

    return (
        <div>
            <div className="row justify-content-center m-5">
                <div className="col-md-6 shadow pb-4 bg-body rounded">
                    <h1 className="text-center my-3">Add Test</h1>
                    <form onSubmit={addJob}>
                        <div className="mb-3">
                            {/* <label className="form-label">Enter Username</label> */}
                            <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />

                            <input type="text" className="form-control" onChange={(e) => setCompany(e.target.value)} placeholder="Enter company" />

                            <input type="text" className="form-control" onChange={(e) => setRole(e.target.value)} placeholder="Enter role" />

                            <input type="text" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="Enter desc" />

                            <input type="text" className="form-control" onChange={(e) => setRequirements(e.target.value)} placeholder="Enter req" />

                            <input type="text" className="form-control" onChange={(e) => setResponsibilities(e.target.value)} placeholder="Enter responsibilities" />

                            <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} placeholder="Enter loc" />

                            <input type="number" className="form-control" onChange={(e) => setSalary(e.target.value)} placeholder="Enter salary" />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-dark py-2 px-5">Add</button>
                        </div>

                        {/* {error && <div  className="text-danger">{error}</div>} */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob
