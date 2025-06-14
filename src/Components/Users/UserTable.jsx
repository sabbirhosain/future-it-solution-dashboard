import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useUserContextProvider } from "../../Context/UserContext";
import userImage from '../../assets/user.png'

const UserTable = () => {
  const { userDataFetch, userError, isLoadingUser, userList, userSearchFilter, userJoinFrom, userJoinTo, userStatus, userVerified, userDelete, userStatusChange, verifiedUser } = useUserContextProvider();
  useEffect(() => { userDataFetch(1) }, [userSearchFilter, userJoinFrom, userJoinTo, userStatus, userVerified]);

  // data table page change
  const onPageChange = (page) => {
    userDataFetch(page);
  };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Join Date",
      selector: row => row.date_and_time,
      width: "180px"
    },
    {
      name: "Image",
      selector: row => <a href={row.attachment?.secure_url} target="_new">
        <img src={row.attachment?.secure_url || userImage} width='30' /> </a>,
      width: "100px",
    },
    {
      name: "Name",
      selector: row => row.full_name,
      width: "200px"
    },
    {
      name: "Email",
      selector: row => row.email,
      width: "200px"
    },
    {
      name: "Phone Number",
      selector: row => row.phone,
      width: "150px"
    },
    {
      name: "Country",
      selector: row => row.country,
      width: "150px"
    },
    {
      name: "Status",
      selector: row => {
        if (row.status === 'pending') {
          return (
            <button style={{ backgroundColor: "orange", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Pending</button>
          );
        } else if (row.status === 'active') {
          return (
            <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Active</button>
          );
        } else if (row.status === 'hold') {
          return (
            <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Hold</button>
          );
        } else {
          return null;
        }
      },
      width: "150px"
    },
    {
      name: "Verified Status",
      selector: row => row.isVerified === false ? <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Unverified</button> : <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Verified</button>,
      width: "150px"
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/users/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
        <Link to={`/users/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => userDelete(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
        {row.status !== 'pending' && (<button onClick={() => userStatusChange(row._id, row.status)} className="btn btn-outline-dark rounded-0 btn-sm"><BiTransfer /></button>)}
        {row.status === 'pending' && (<button onClick={() => verifiedUser(row._id)} className="btn btn-outline-dark rounded-0 btn-sm"><FaCheck /></button>)}
      </div>,
      width: "200px"
    }
  ];

  if (userError) {
    return <div className="text-center">{userError.message}</div>;
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={userList.payload}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={isLoadingUser}
          paginationTotalRows={userList.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default UserTable