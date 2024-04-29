import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

export const Navbar = () => {

    const navigate = useNavigate();

    const { user, dispatch } = useAuthContext();

    function logoutUser() {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <div>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <Link to={'/'} className="d-inline-flex link-body-emphasis text-decoration-none">
                            {/* <svg className="bi" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
                            <h3 className="text-primary fw-bolder" style = {{fontFamily:"Permanent Marker"}}>JobyJob</h3>
                        </Link>
                    </div>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <Link className="nav-link active text-dark fs-5 fw-bold" aria-current="page" to={'/'}>Home</Link>
                        <Link className="nav-link active text-dark fs-5 fw-bold" aria-current="page" to={'/'}>Jobs</Link>
                        <Link className="nav-link active text-dark fs-5 fw-bold" aria-current="page" to={'/'}>About</Link>
                        <Link className="nav-link active text-dark fs-5 fw-bold" aria-current="page" to={'/'}>Contact</Link>
                    </ul>

                    <div className="col-md-3 text-end">
                        {!user && (
                            <>
                                <button type="button" className="btn btn-outline-primary me-2 rounded-pill px-3">Login</button>
                                <button type="button" className="btn btn-primary rounded-pill px-3">Sign-up</button>
                            </>
                        )}

                        {user && (
                            <>
                                <button className="btn btn-dark rounded-pill px-4" onClick={logoutUser}>Logout</button>
                            </>
                        )}
                    </div>
                </header>
            </div>

        </div>
    )
}