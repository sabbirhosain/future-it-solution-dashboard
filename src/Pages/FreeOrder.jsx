import FreeOrderTable from '../Components/FreeOrder/FreeOrderTable'
import { useProductOrderContextProvider } from '../Context/ProductOrderContext'
import Layout from '../Layout/Layout'

const FreeOrder = () => {
    const { freeOrderFilter } = useProductOrderContextProvider()

    return (
        <Layout>
            <section className=''>
                <div className='d-flex align-items-center justify-content-between bg-white p-3 ps-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Free Order</h4>
                </div>

                <div className="row bg-white p-3">

                    <div className="col-md-3">
                        <div className='w-100 mb-3 mb-md-0'>
                            <input onChange={(event) => freeOrderFilter('active_date', event.target.value)} className="form-control rounded-0" type="date" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='w-100 mb-3 mb-md-0'>
                            <input onChange={(event) => freeOrderFilter('expire_date', event.target.value)} className="form-control rounded-0" type="date" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='w-100 mb-3 mb-md-0'>
                            <select onChange={(event) => freeOrderFilter('status', event.target.value)} className="form-select rounded-0">
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="returned">Returned</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='w-100'>
                            <input onChange={(event) => freeOrderFilter('search', event.target.value)} className="form-control rounded-0" type="search" placeholder="Search" />
                        </div>
                    </div>
                </div>

                <div className='mt-2'>
                    <FreeOrderTable />
                </div>
            </section>
        </Layout>
    )
}

export default FreeOrder