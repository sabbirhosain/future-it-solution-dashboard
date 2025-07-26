import { useProductOrderContextProvider } from "../../Context/ProductOrderContext";
import DataTable from "react-data-table-component"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import noImage from '../../assets/no_image.jpg'
import { useEffect, useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const FreeOrderTable = () => {
    const { freeOrder, getFreeOrder } = useProductOrderContextProvider()
    useEffect(() => { getFreeOrder(1) }, [freeOrder.search, freeOrder.active_date, freeOrder.expire_date, freeOrder.status]);

    // data table page change
    const onPageChange = (page) => {
        getFreeOrder(page);
    };

    const columns = [
        {
            name: "SL",
            selector: (row, index) => (index + 1),
            width: "60px"
        },
        {
            name: "Image",
            selector: row => <a href={row.attachment?.secure_url} target="_new" rel="noreferrer">
                <img src={row.attachment?.secure_url || noImage} width='30' /> </a>,
            width: "100px"
        },
        {
            name: "Items Name",
            selector: row => row.item_name
        },
        {
            name: "Categories",
            selector: row => row.categories
        },
        {
            name: "Package",
            selector: row => row.package?.package_name || "N/A"
        },
        {
            name: "Price",
            selector: row => `${row.package?.grand_total || 0} ${row.package?.currency || ''}`
        },
        {
            name: "Customer",
            selector: row => row.billing_address?.full_name || "N/A"
        },
        {
            name: "Status",
            selector: row => {
                if (row.status === 'pending') {
                    return (<button style={{ backgroundColor: "orange", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Pending</button>);
                } else if (row.status === 'completed') {
                    return (<button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Completed</button>);
                } else if (row.status === 'cancelled') {
                    return (<button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Cancelled</button>);
                } else if (row.status === 'returned') {
                    return (<button style={{ backgroundColor: "gray", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Returned</button>);
                } else {
                    return (<button style={{ backgroundColor: "gray", padding: "5px 20px", color: "white", borderRadius: "0px" }}>{row.status}</button>);
                }
            },
            width: "150px"
        },
        {
            name: "Action",
            cell: row => <div className="d-flex align-items-center gap-2">
                <Link to={`/free-tools/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
                <Link to={`/free-tools/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                <button type="button" onClick={() => freeToolsDelete(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
            </div>,
            width: "150px"
        }
    ];

    if (freeOrder.isLoading) {
        return <div className="text-center">{freeOrder.error_message}</div>;
    } else {
        return (
            <>
                <DataTable
                    columns={columns}
                    data={freeOrder.data.payload}
                    pagination
                    paginationServer
                    paginationComponentOptions={{ noRowsPerPage: true }}
                    progressPending={freeOrder.isLoading}
                    paginationTotalRows={freeOrder.data.pagination?.total_data}
                    onChangePage={onPageChange}
                />
            </>
        )
    }
}

export default FreeOrderTable