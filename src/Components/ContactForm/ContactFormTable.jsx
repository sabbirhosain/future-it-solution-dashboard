import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useContactFromContextProvider } from '../../Context/ContactFromContext';

const ContactFormTable = () => {
    const { handleError, isLoading, contactFrom, searchFilter, setSearchFilter, fromDate, setFromDate, toDate, setToDate, status, setStatus, getContactFrom } = useContactFromContextProvider();
    useEffect(() => { getContactFrom(1) }, [searchFilter, fromDate, toDate, status]);

    // data table page change
    const onPageChange = (page) => {
        getContactFrom(page);
    };

    const columns = [
        {
            name: "SL",
            selector: (row, index) => (index + 1),
            width: "60px"
        },
        {
            name: "Date And Time",
            selector: row => row.date_and_time
            ,
            width: "180px"
        },
        {
            name: "Client Name",
            selector: row => row.name ?? 'N/A',
            width: "150px"
        },
        {
            name: "Email",
            selector: row => row.email ?? 'N/A',
            width: "150px"
        },
        {
            name: "Phone",
            selector: row => row.phone ?? 'N/A',
            width: "200px"
        },
        {
            name: "Subject",
            selector: row => row.subject ?? 'N/A',
            width: "150px"
        },
        {
            name: "Message",
            selector: row => row.message ?? 'N/A',
            width: "150px"
        },
        {
            name: "Status",
            selector: row => {
                if (row.status === 'pending') {
                    return (
                        <button style={{ backgroundColor: "orange", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Pending</button>
                    );
                } else if (row.status === 'completed') {
                    return (
                        <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Completed</button>
                    );
                } else if (row.status === 'cancelled') {
                    return (
                        <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Cancelled</button>
                    );
                } else {
                    return null;
                }
            },
            width: "150px"
        },
        {
            name: "Action",
            cell: row => <div className="d-flex align-items-center gap-2">
                <Link to={`/users/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
                <Link to={`/users/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                <button type="button" onClick={() => (row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
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
                    data={contactFrom.payload}
                    pagination
                    paginationServer
                    paginationComponentOptions={{ noRowsPerPage: true }}
                    progressPending={isLoading}
                    paginationTotalRows={contactFrom.pagination?.total_data}
                    onChangePage={onPageChange}
                />
            </>
        )
    }
}

export default ContactFormTable