import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import axios from "axios";
import image from './components/image.png'
import Footer from "./components/Footer";

function App() {

  // const url="https://reminder-3jth.onrender.com/";
  const url = "http://localhost:8080/";

  const navigate = useNavigate();

  const icons = ['text-dark fa fa-server fs-3 me-2', 'text-dark fa fa-microchip fs-3 me-2', 'text-primary fa fa-microchip fs-3 me-2', 'text-dark fa fa-desktop fs-3 me-2', 'text-primary fa fa-desktop fs-3 me-2', 'text-dark fa fa-server fs-3 me-2', 'text-primary fa fa-server fs-3 me-2', 'text-dark fa fa-database fs-3 me-2', 'text-primary fa fa-database fs-3 me-2', 'text-dark fa fa-code fs-3 me-2', 'text-primary fa fa-code fs-3 me-2']

  const [jobs, setJobs] = useState();

  const [title, setTitle] = useState(); //for search

  const { user } = useAuthContext();

  // console.log(x)
  useEffect(() => {
    // const u=JSON.parse(localStorage.getItem('user'));
    // console.log("hii from App.js");
    if (!user) {
      navigate('/login');
      return;
    }

    console.log(user.role)
    if (user.role !== 'user') {
      navigate('/admin/home');
      return;
    }

    axios.get(url + 'getJobs', { headers: { Authorization: 'Bearer ' + user.token } })
      .then((r) => {
        setJobs(r.data);
      })
      .catch((e) => {
        console.log(e);
      })


  }, [user])

  function searchJob(e) {
    e.preventDefault();
    axios.post(url + 'search', { title }, { headers: { Authorization: 'Bearer ' + user.token } })
      .then((r) => {
        setJobs(r.data);
      })
      .catch((e) => {
        console.log(e);
      })

  }

  return (
    <div className="container">
      <Navbar />

      {/* <div style={{ width: '100%', height: '500px' }}>
          <iframe src={'http://localhost:8080/resumes/resume-1714404439656-338673169.pdf'} type="application/pdf" width="100%" height="100%" />
        </div> */}

      <div className="container row">
        <div className="col-md-6 col-lg-6 col-sm-12 mt-5">
          <br /><br />
          <p className="display-4">Let's find a good <span className="text-primary">JOB</span> for you !!</p>
          <p className="fs-4">We have thousands of <span className="text-primary">jobs</span> in different fields</p>

          <form onSubmit={searchJob}>
            <div className="input-group mt-2 w-75">
              <input type="search" style={{ backgroundColor: '#D3D3D3' }} onBlur={(e) => setTitle(e.target.value)} className="form-control rounded-pill ps-4" placeholder="Search Job" aria-label="Search" aria-describedby="search-addon" />
              <button type="submit" className="btn btn-dark rounded-pill px-4 py-2" data-mdb-ripple-init>Search</button>
            </div>
          </form>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12">
          <img src={image} className="d-block mx-lg-auto img-fluid shadow pb-4 bg-body rounded" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
        </div>
      </div>

      <hr className="container mt-5" />

      <div className="container py-3" id="featured-3">
        <h3 className="">Recent Jobs</h3>
        <div className="row g-4 pt-4 row-cols-1 row-cols-lg-3">


          {jobs &&
            jobs.map((i) =>
              <div key={i._id} className="feature col mb-4">

                <p className="text-body-emphasis fs-4 mb-0 pb-0"><i className={icons[Math.floor((Math.random() * 10) + 1)]}></i>{i.title}</p>
                {/* <p><i className="fa fa-building fs-4 me-2"></i>{i.company}</p> */}
                <p className="mb-0 pb-0"><i className="fa fa-suitcase ps-1 pe-2"></i>{i.company}</p>
                <p><i className="fa fa-credit-card ps-1 pe-2"></i>{i.salary}/year <i className="fa fa-map-marker ps-2 pe-2"></i>{i.location}</p>
                <p className="ps-1">{i.responsibilities}</p>
                <Link className="btn btn-primary rounded-pill btn-sm px-3 py-1" to={'/view/' + i._id}>View Job</Link>
              </div>
            )
          }
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-dark rounded-pill px-4 py-2">View More</button>
      </div>

      {/* <hr className="container mt-5" /> */}

      <div className="container row my-5">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <p className="display-6 mt-2">Subscribe for new <span className="text-primary">JOB</span> posts</p>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12">
          <form onSubmit={searchJob}>
            <div className="input-group">
              <input type="search" className="form-control rounded-pill py-3 ps-4 fs-5" style={{ backgroundColor: '#D3D3D3' }} placeholder="Your email address" aria-label="Search" aria-describedby="search-addon" />
              <button type="submit" className="btn btn-dark rounded-pill px-4 py-2 fs-5" data-mdb-ripple-init>Subscribe</button>
            </div>
          </form>
        </div>
      </div>

      


      <Footer/>
    </div>
  );
}

export default App;