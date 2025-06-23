import { useEffect, useState } from "react";
import DataTable from "react-data-table-component"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import userImage from '../../assets/user.png'
import { usePremiumToolsContextProvider } from "../../Context/PermiumToolsContext";

const PermiumToolsTable = () => {
    const { getPermiumTools, handleError, isLoading, premiumTools, searchFilter, available, status } = usePremiumToolsContextProvider();
    useEffect(() => { getPermiumTools(1) }, [searchFilter, available, status]);

    // data table page change
    const onPageChange = (page) => {
        getPermiumTools(page);
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
        {
            name: "Image",
            selector: row => <a href={row.attachment?.secure_url} target="_new">
                <img src={row.attachment?.secure_url || userImage} width='30' /> </a>,
            width: "100px",
        },
        {
            name: "Availability",
            selector: row => {
                if (row.availability === 'unavailable') {
                    return (
                        <button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Unavailable</button>
                    );
                } else if (row.availability === 'available') {
                    return (
                        <button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Available</button>
                    );
                } else {
                    return null;
                }
            },
            width: "200px"
        },
        {
            name: "Rating",
            selector: row => row.total_rating,
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
                <Link to={`/premium-tools/update/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
                <Link to={`/premium-tools/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
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
                    data={premiumTools.payload}
                    pagination
                    paginationServer
                    paginationComponentOptions={{ noRowsPerPage: true }}
                    progressPending={isLoading}
                    paginationTotalRows={premiumTools.pagination?.total_data}
                    onChangePage={onPageChange}
                />
            </>
        )
    }
}

export default PermiumToolsTable