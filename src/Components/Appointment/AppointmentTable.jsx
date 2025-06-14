import React, { useEffect } from 'react'
import { useAppointmentContextProvider } from '../../Context/AppointmentContext';
import DataTable from 'react-data-table-component';

const AppointmentTable = () => {
  const { getAppointment, handleError, isLoading, appointment, searchFilter, setSearchFilter, fromDate, setFromDate, toDate, setToDate, status, setStatus } = useAppointmentContextProvider();
  useEffect(() => { getAppointment(1) }, [searchFilter, fromDate, toDate, status]);

  // data table page change
  const onPageChange = (page) => {
    getAppointment(page);
  };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Tools Name",
      selector: row => row.tools_name,
      width: "180px"
    },
    // {
    //     name: "Image",
    //     selector: row => <a href={row.attachment?.secure_url} target="_new">
    //         <img src={row.attachment?.secure_url || userImage} width='30' /> </a>,
    //     width: "100px",
    // },
    {
      name: "Available",
      selector: row => row.available ? <button style={{ backgroundColor: "Green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Available</button> : <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Not Available</button>,
      width: "200px"
    },
    {
      name: "Rating",
      selector: row => row.rating,
      width: "150px"
    },
    {
      name: "Total Sold",
      selector: row => row.total_sold,
      width: "150px"
    },
    {
      name: "Status",
      selector: row => {
        if (row.status === 'hide') {
          return (
            <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Hide</button>
          );
        } else if (row.status === 'show') {
          return (
            <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Show</button>
          );
        } else {
          return null;
        }
      },
      width: "150px"
    },
    {
      name: "Coupon Code",
      selector: row => row.coupon_code,
      width: "200px"
    },
    {
      name: "Action",
      cell: row => <div className="d-flex align-items-center gap-2">
        <Link to={`/users/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
        <Link to={`/users/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
        <button type="button" onClick={() => userDelete(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
      </div>,
      width: "150px"
    }
  ];

  if (handleError) {
    return <div className="text-center">{handleError.message}</div>;
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={appointment.payload}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={isLoading}
          paginationTotalRows={appointment.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default AppointmentTable