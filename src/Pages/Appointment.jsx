import Layout from '../Layout/Layout'
import AppointmentTable from '../Components/Appointment/AppointmentTable'

const Appointment = () => {
    return (
        <Layout>
            <section className=''>
                <div className='d-flex align-items-center justify-content-between bg-white p-3 ps-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Appointment Schedule</h4>
                </div>

                <div className="row bg-white p-3">

                    <div className="col-md-3">
                        <div className='w-100 mb-3 mb-md-0'>
                            <input onChange={(event) => setUserJoinFrom(event.target.value)} className="form-control rounded-0" type="date" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='w-100 mb-3 mb-md-0'>
                            <input onChange={(event) => setUserJoinTo(event.target.value)} className="form-control rounded-0" type="date" />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='w-100 mb-3 mb-md-0'>
                            <select onChange={(event) => setUserStatus(event.target.value)} className="form-select rounded-0">
                                <option value="">Select Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="hold">Hold</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='w-100'>
                            <input onChange={(event) => setUserSearchFilter(event.target.value)} className="form-control rounded-0" type="search" placeholder="Search" />
                        </div>
                    </div>
                </div>

                <div className='mt-2'>
                    <AppointmentTable />
                </div>
            </section>
        </Layout>
    )
}

export default Appointment