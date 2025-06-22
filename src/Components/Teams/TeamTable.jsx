import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";
import userImage from '../../assets/user.png'
import { useOurTeamContextProvider } from "../../Context/OurTamsContext";

const TeamTable = () => {
  const { getOurTeams, handleError, isLoading, ourTeams, searchFilter, fromDate, toDate, status } = useOurTeamContextProvider()
  useEffect(() => { getOurTeams(1) }, [searchFilter, fromDate, toDate, status]);

  // data table page change
  const onPageChange = (page) => {
    getOurTeams(page);
  };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Date And Time",
      selector: row => row.date_and_time_formated,
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
      name: "Job Title",
      selector: row => row.title,
      width: "200px"
    },
    {
      name: "Gender",
      selector: row => row.gender,
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
      selector: row => row.status === false ? <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Hide</button> : <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Show</button>,
      width: "150px"
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/users/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
        <Link to={`/users/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => userDelete(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "200px"
    }
  ];

  if (handleError) {
    return <div className="text-center">{handleError.message}</div>;
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={ourTeams.payload}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={isLoading}
          paginationTotalRows={ourTeams.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default TeamTable