import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="container">
            <hr className="container mt-5" />
            <footer className="d-flex flex-wrap justify-content-between align-items-center my-4">
                <p className="col-md-4 mb-0 text-body-secondary">© 2024 JobyJob, Inc</p>

                <Link to={'/'} className="d-inline-flex link-body-emphasis text-decoration-none">
                    {/* <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                    <h3 className="text-primary fw-bolder" style={{ fontFamily: "Permanent Marker" }}>JobyJob</h3>
                </Link>

                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                    <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
                </ul>
            </footer>
        </div>
    )
}

export default Footer
