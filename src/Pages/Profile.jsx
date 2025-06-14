import Password from '../Components/Profile/Password'
import ProfileUpdate from '../Components/Profile/ProfileUpdate'
import Layout from '../Layout/Layout'

const Profile = () => {
  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-4">
            <div class="d-flex flex-column align-items-center text-center bg-white p-3">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="200" />
              <div class="mt-4">
                <h4>John Doe</h4>
                <p class="text-secondary pt-2">Full Stack Developer</p>
                <p class="text-muted fst-italic">Bay Area, San Francisco, CA</p>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className='shadow-sm p-3 bg-white'>

              <div class="mb-3 row">
                <label className="col-sm-3 col-form-label">Name</label>
                <div class="col-sm-9">
                  <input type="text" className="form-control rounded-0" value="John Doe" readOnly />
                </div>
              </div>
              <div class="mb-3 row">
                <label className="col-sm-3 col-form-label">User Name</label>
                <div class="col-sm-9">
                  <input type="text" className="form-control rounded-0" value="john" readOnly />
                </div>
              </div>
              <div class="mb-3 row">
                <label className="col-sm-3 col-form-label">Email Address</label>
                <div class="col-sm-9">
                  <input type="text" className="form-control rounded-0" value="john@gmail.com" readOnly />
                </div>
              </div>
              <div class="mb-3 row">
                <label className="col-sm-3 col-form-label">Phone Number</label>
                <div class="col-sm-9">
                  <input type="text" className="form-control rounded-0" value="+0123-456-7890" readOnly />
                </div>
              </div>
              <div class="mb-3 row">
                <label className="col-sm-3 col-form-label">Address</label>
                <div class="col-sm-9">
                  <input type="text" className="form-control rounded-0" value="Bay Area, San Francisco, CA" readOnly />
                </div>
              </div>
              <div class="row">
                <label className="col-sm-3 col-form-label"></label>
                <div class="col-sm-3">
                  <button className='btn btn-success rounded-0 w-100' data-bs-toggle="modal" data-bs-target="#profileUpdate">Edit Profile</button>
                  <ProfileUpdate />
                </div>
                <div class="col-sm-3 mt-3 mt-sm-0">
                  <button className='btn btn-primary rounded-0 w-100' data-bs-toggle="modal" data-bs-target="#exampleModal">Password Change</button>
                  <Password />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile