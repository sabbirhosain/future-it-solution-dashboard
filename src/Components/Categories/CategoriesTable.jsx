import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { BsEyeFill } from 'react-icons/bs';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import noImage from '../../assets/no_image.jpg'
import { useCategoriesContextProvider } from '../../Context/CategoriesContext';

const CategoriesTable = () => {
    const { handleError, isLoading, categories, searchFilter, getCategories, deleteCategories } = useCategoriesContextProvider();
    useEffect(() => { getCategories(1) }, [searchFilter]);

    // data table page change
    const onPageChange = (page) => {
        getCategories(page);
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
            width: "100px",
        },
        {
            name: "Catrgories Name",
            selector: row => row.categories
        },
        {
            name: "Items Count",
            selector: row => row.items_count
        },
        {
            name: "Action",
            cell: row => <div className="d-flex align-items-center gap-2">
                <Link to={`/categories/update/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><BsEyeFill /></Link>
                <Link to={`/categories/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                <button type="button" onClick={() => deleteCategories(row._id)} className="btn btn-outline-danger rounded-0 btn-sm"><BiTrash /></button>
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
                    data={categories.payload}
                    pagination
                    paginationServer
                    paginationComponentOptions={{ noRowsPerPage: true }}
                    progressPending={isLoading}
                    paginationTotalRows={categories.pagination?.total_data}
                    onChangePage={onPageChange}
                />
            </>
        )
    }
}

export default CategoriesTable