import { useCategoriesContextProvider } from "../../Context/CategoriesContext";
import { useFreeToolsContextProvider } from "../../Context/FreeToolsContext";
import DataTable from "react-data-table-component"
import { BiEditAlt, BiTrash } from "react-icons/bi";
import noImage from '../../assets/no_image.jpg'
import { useEffect, useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const FreeToolsTable = () => {
  const { optionSelectValue } = useCategoriesContextProvider()
  const { handleError, isLoading, freeTools, searchFilter, available, status, getFreeTools, freeToolsDelete } = useFreeToolsContextProvider();
  useEffect(() => { getFreeTools(1) }, [searchFilter, available, status, optionSelectValue]);

  // data table page change
  const onPageChange = (page) => {
    getFreeTools(page);
  };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => (index + 1),
      width: "60px"
    },
    {
      name: "Image",
      selector: row => <a href={row.attachment?.secure_url} target="_new">
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
      name: "Package Name",
      selector: row => row.package_name
    },
    {
      name: "Rating",
      selector: row => row.avg_rating
    },
    {
      name: "Total Sold",
      selector: row => row.total_sold
    },
    {
      name: "Availability",
      selector: row => {
        if (row.availability === 'unavailable') {
          return (<button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Unavailable</button>);
        } else if (row.availability === 'available') {
          return (<button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Available</button>);
        } else {
          return null;
        }
      },
      width: "200px"
    },
    {
      name: "Status",
      selector: row => {
        if (row.status === 'hide') {
          return (<button style={{ backgroundColor: "red", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Hide</button>);
        } else if (row.status === 'show') {
          return (<button style={{ backgroundColor: "green", padding: "5px 20px", color: "white", borderRadius: "0px" }}>Show</button>);
        } else {
          return null;
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

  if (handleError) {
    return <div className="text-center">{handleError.message}</div>;
  } else {
    return (
      <>
        <DataTable
          columns={columns}
          data={freeTools.payload}
          pagination
          paginationServer
          paginationComponentOptions={{ noRowsPerPage: true }}
          progressPending={isLoading}
          paginationTotalRows={freeTools.pagination?.total_data}
          onChangePage={onPageChange}
        />
      </>
    )
  }
}

export default FreeToolsTable