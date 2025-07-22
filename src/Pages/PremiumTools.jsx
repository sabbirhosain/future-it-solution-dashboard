import PermiumToolsTable from '../Components/PremiumTools/PermiumToolsTable';
import { usePremiumToolsContextProvider } from '../Context/PermiumToolsContext';
import { MdFormatListBulletedAdd } from "react-icons/md";
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom';
import Select from 'react-select'

const PremiumTools = () => {
    const { setStatus, setAvailable, setSearchFilter } = usePremiumToolsContextProvider()
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const customStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px"
        }),
    };

    return (
        <Layout>
            <section className=''>
                <div className='d-flex align-items-center justify-content-between bg-white p-3 ps-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Permium Tools</h4>
                    <Link to='/premium-tools/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>

                <div className="row bg-white p-3">
                    <div className="col-md-3">
                        <div className='w-100'>
                            <Select options={options} isClearable={true} styles={customStyles} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className='w-100'>
                            <select onChange={(event) => setAvailable(event.target.value)} className="form-select rounded-0">
                                <option value="">Select Available</option>
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <select onChange={(event) => setStatus(event.target.value)} className="form-select rounded-0">
                            <option value="">Select Status</option>
                            <option value="show">Show</option>
                            <option value="hide">Hide</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <div className='w-100'>
                            <input className="form-control rounded-0" onChange={(event) => setSearchFilter(event.target.value)} type="search" placeholder="Search Hear..." />
                        </div>
                    </div>
                </div>

                <div className='mt-2'>
                    <PermiumToolsTable />
                </div>
            </section>
        </Layout>
    )
}

export default PremiumTools