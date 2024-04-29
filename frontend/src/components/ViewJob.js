import React, { useState, useEffect } from 'react'
import { Navbar } from "./Navbar";
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewJob = () => {

    const url = "http://localhost:8080/";

    const { user } = useAuthContext();
    const { id } = useParams();

    const [job, setJob] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        axios.get(url + 'getJobByID/' + id, { headers: { Authorization: 'Bearer ' + user.token } })
            .then((r) => {
                setJob(r.data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [user])
    return (
        <div className="container">
            <Navbar />

            <div className="row justify-content-center m-5">
                <div className="col-md-6 shadow pb-4 bg-body rounded">
                    <h1 class="text-body-emphasis text-center">Job Details</h1>
                    {job &&
                    <>
                        <p>Title:- {job.title}</p>
                        <p>Company:- {job.company}</p>
                        <p>Location:- {job.location}</p>
                        <p>Salary:- {job.salary}</p>
                        <p>Role:- {job.role}</p>
                        <p>Description:- {job.description}</p>
                        <p>and all other stuff</p>

                        <Link className="btn btn-primary rounded-pill btn-sm px-3 py-1" to={'/apply/' + job._id}>Apply Now</Link>
                    </>
                }
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default ViewJob
