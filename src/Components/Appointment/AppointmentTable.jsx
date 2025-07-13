import React, { useEffect } from 'react'
import { useAppointmentContextProvider } from '../../Context/AppointmentContext';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import userImage from '../../assets/user.png'

const AppointmentTable = () => {
  const { getAppointment, handleError, isLoading, appointment, searchFilter, fromDate, toDate, status } = useAppointmentContextProvider();
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
      name: "Image",
      selector: row => <a href={row.user.attachment?.secure_url} target="_new">
        <img src={row.user.attachment?.secure_url || userImage} width='30' /> </a>,
      width: "100px",
    },
    {
      name: "Date And Time",
      selector: row => row.date_and_time_formated,
      width: "180px"
    },
    {
      name: "Client Name",
      selector: row => row.user.full_name,
      width: "150px"
    },
    {
      name: "Country",
      selector: row => row.user.country,
      width: "150px"
    },
    {
      name: "Meeting Time",
      selector: row => row.meeting_bangladesh_time ?? 'N/A',
      width: "250px"
    },
    {
      name: "Time Zone GMT",
      selector: row => row.time_zone_gmt_and_utc ?? 'N/A',
      width: "150px"
    },
    {
      name: "Meeting Type",
      selector: row => row.meeting_type ?? 'N/A',
      width: "150px"
    },
    {
      name: "Status",
      selector: row => {
        if (row.status === 'scheduled') {
          return (
            <button style={{ backgroundColor: "orange", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Scheduled</button>
          );
        } else if (row.status === 'completed') {
          return (
            <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Completed</button>
          );
        } else if (row.status === 'cancelled') {
          return (
            <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Cancelled</button>
          );
        } else if (row.status === 'rescheduled') {
          return (
            <button style={{ backgroundColor: "gray", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Rescheduled</button>
          );
        } else {
          return null;
        }
      },
      width: "150px"
    },
    {
      name: "Meeting Link",
      selector: row => row.meeting_link ?? 'N/A',
      width: "150px"
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