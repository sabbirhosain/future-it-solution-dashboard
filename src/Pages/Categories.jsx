import CategoriesTable from '../Components/Categories/CategoriesTable';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useCategoriesContextProvider } from '../Context/CategoriesContext';

const Categories = () => {
    const { setSearchFilter } = useCategoriesContextProvider()
    return (
        <Layout>
            <section className=''>
                <div className='d-flex align-items-center justify-content-between bg-white p-3 ps-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Categories</h4>
                    <Link to='/categories/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>

                <div className="row justify-content-end bg-white p-3">
                    <div className="col-md-3">
                        <div className='w-100'>
                            <input className="form-control rounded-0" onChange={(event) => setSearchFilter(event.target.value)} type="search" placeholder="Search Hear..." />
                        </div>
                    </div>
                </div>

                <div className='mt-2'>
                    <CategoriesTable />
                </div>
            </section>
        </Layout>
    )
}

export default Categories