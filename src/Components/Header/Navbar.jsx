import { FaBars, FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Style.css";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { SlSettings } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
  return (
    <div className="navbar_top">
      <div className="container-fluid pe-md-5">
        <div className="navbar_row">
          {/*====>> Offcanvas bar start <<====*/}
          <button
            className="offcanvas_close_btn btn btn-dark d-flex align-items-center rounded-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <FaBars className="offcanvas_bar_icon" />
          </button>
          {/*====>> Offcanvas bar end <<====*/}

          <div className="d-none d-md-flex align-items-center gap-2">
            <h5 className="company_brand">Future It Solution</h5>
            <small className="bg-success text-white px-2">Admin</small>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to={"#"} title="Create Invoice" className="btn btn-outline-primary rounded-0 d-flex align-items-center justify-content-center"> <FaFileInvoice /> </Link>

            <div className="btn-group">
              <button
                type="button"
                className="btn btn-outline-dark rounded-0 dropdown-toggle d-flex align-items-center justify-content-center"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <FaUserCircle />
              </button>
              <ul className="dropdown-menu dropdown-menu-end mt-2 py-0 rounded-0">
                <li>
                  {" "}
                  <button
                    type="button"
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                    <BiLogOut />
                    Logout
                  </button>
                </li>
                <hr className="dropdown-divider p-0 m-0" />
                <li>
                  <Link
                    to={"/profile"}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                    <CgProfile />
                    Profile
                  </Link>
                </li>
                <hr className="dropdown-divider p-0 m-0" />
                <li>
                  <Link
                    to={"/settings"}
                    className="dropdown-item d-flex align-items-center gap-2"
                  >
                    <SlSettings />
                    Setting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
