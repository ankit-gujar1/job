import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import { AdminNav } from './AdminNav';
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Link } from 'react-router-dom'

const Home = () => {

    // const url="https://reminder-3jth.onrender.com/";
    const url = "http://localhost:8080/";

    // const [test, setTest] = useState();
    // const [users, setUsers] = useState();
    
    const [jobs, setJobs] = useState();
    const { user } = useAuthContext();
    const navigate=useNavigate();

    useEffect(() => {

        if(!user){
            navigate('/login');
            return;
        }

        // axios.get(url + "admin/test", { headers: { Authorization: 'Bearer ' + user.token } })
        //     .then((r) => {
        //         setTest(r.data);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     })

        // axios.get(url + "admin/users", { headers: { Authorization: 'Bearer ' + user.token } })
        //     .then((r) => {
        //         setUsers(r.data);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     })

        axios.get(url + "admin/getAllJobsByAdminId", { headers: { Authorization: 'Bearer ' + user.token } })
            .then((r) => {
                setJobs(r.data);
            })
            .catch((e) => {
                console.log(e);
            })

    },[user])
    return (
        <div>
            <AdminNav/>
            <h1 className='text-center'>Admin</h1>
            <Link className="btn btn-dark btn-block px-5 py-2" to={'/admin/addJob'}>Add Job</Link>
            {jobs &&
                jobs.map((i) => //key should be in outer most div of .map
                    <div key={i._id} className="row justify-content-center m-2 mb-3">
                        <div className="col-md-6">
                            <div className="bg-dark bg-gradient rounded text-center text-light pb-3">

                                <p className="fs-4 px-2" style={{ paddingTop: 10, margin: 0 }}><i>{i.title}</i></p>
                                <p className="fs-4 px-2" style={{ paddingTop: 10, margin: 0 }}><i>{i.company}</i></p>
                                <p className="fs-4 px-2" style={{ paddingTop: 10, margin: 0 }}><i>Posted by:- {i.createdBy.firstName}</i></p>

                                <Link to={'/admin/viewApplicants/'+i._id}>Applicants</Link>
                            </div>
                        </div>
                    </div>
                )
                
            }
        </div>
    )
}

export default Home