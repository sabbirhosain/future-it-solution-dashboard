import Layout from '../Layout/Layout'
import { MdFormatListBulletedAdd } from "react-icons/md";
import { Link } from 'react-router-dom';
import TeamTable from '../Components/Teams/TeamTable';
import { useOurTeamContextProvider } from '../Context/OurTamsContext';

const Teams = () => {
  const { setSearchFilter, setFromDate, setToDate, setStatus } = useOurTeamContextProvider()

  return (
    <Layout>
      <section className=''>
        <div className='d-flex align-items-center justify-content-between bg-white p-3 ps-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>Our Teams List</h4>
          <Link to='/users/teams/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>

        <div className="row bg-white p-3">
          <div className="col-md-3">
            <div className='w-100 mb-3 mb-md-0'>
              <input onChange={(event) => setFromDate(event.target.value)} className="form-control rounded-0" type="date" />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100 mb-3 mb-md-0'>
              <input onChange={(event) => setToDate(event.target.value)} className="form-control rounded-0" type="date" />
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100 mb-3 mb-md-0'>
              <select onChange={(event) => setStatus(event.target.value)} className="form-select rounded-0">
                <option value="">Select Status</option>
                <option value="true">Show</option>
                <option value="false">Hide</option>
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <div className='w-100'>
              <input onChange={(event) => setSearchFilter(event.target.value)} className="form-control rounded-0" type="search" placeholder="Search" />
            </div>
          </div>
        </div>

        <div className='mt-2'>
          <TeamTable />
        </div>
      </section>
    </Layout>
  )
}

export default Teams