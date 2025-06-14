import { MdDashboardCustomize } from "react-icons/md";
import { HiMiniUsers } from "react-icons/hi2";
import { SiGooglemeet } from "react-icons/si";
import { FaTools } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import logo from "../../assets/dashboard.png"
import { NavLink, useLocation } from 'react-router-dom'
import "./Style.css"


const Sidebar = () => {
  const URL = useLocation()

  return (
    <div className="sidebar">
      <div className="offcanvas offcanvas-start offcanvas_sidebar" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <NavLink to={"/"} className="d-flex align-items-center gap-2">
            <img src={logo} className='dashboard_logo_img' alt="logo" />
            <span className='dashboard_logo_text'>F. It Solution</span>
          </NavLink>
          <button type="button" className="btn-close offcanvas_close_btn" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="dropdown_item pb-5">

            <li className="dropdown_list">
              <NavLink to={"/"} className="dropdown_btn">
                <span className="dropdown_list_name"><MdDashboardCustomize className="dropdown_list_icon" />Dashboard</span>
              </NavLink>
            </li>

            <li className="dropdown_list">
              <NavLink to={"/users/table"} className="dropdown_btn">
                <span className="dropdown_list_name"><HiMiniUsers className="dropdown_list_icon" />Users</span>
              </NavLink>
            </li>

            <li className="dropdown_list">
              <NavLink to={"/premium-tools/table"} className="dropdown_btn">
                <span className="dropdown_list_name"><FaTools className="dropdown_list_icon" />Premium Tools</span>
              </NavLink>
            </li>

            <li className="dropdown_list">
              <NavLink to={"/appointment/table"} className="dropdown_btn">
                <span className="dropdown_list_name"><SiGooglemeet className="dropdown_list_icon" />Appointment</span>
              </NavLink>
            </li>

            <li className="dropdown_list">
              <NavLink to={"/contact-form/table"} className="dropdown_btn">
                <span className="dropdown_list_name"><MdOutlineContactMail className="dropdown_list_icon" />Contact Form</span>
              </NavLink>
            </li>

          </ul>
        </div>
      </div >
    </div >
  )
}

export default Sidebar