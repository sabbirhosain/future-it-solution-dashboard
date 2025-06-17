import React from 'react'
import Layout from '../../Layout/Layout'

const CreatePremiumTools = () => {
    return (
        <Layout>
            <section className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <form className='shadow-sm bg-white px-5 pt-3 pb-4'>
                            <h4 className='text-center py-4'>Create Premium Tools</h4>
                            <div className="row border-top border-warning pt-4">

                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Tools Name</label>
                                    <input type="text" className='form-control rounded-0' required />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className='form-label'>Short Description</label>
                                    <input type="text" className='form-control rounded-0' required />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Long Description</label>
                                    <textarea rows='3' className='form-control rounded-0' required />
                                </div>

                                <div className="col-md-12 mb-3">
                                        <label className='form-label'>Additional Feature</label>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <button type='button' className='btn btn-primary btn-sm'></button>
                                    </div>
                                    <div className="row border">
                                        <div className="col-md-11 border-end">Lorem ipsum dolor sit amet consectetur</div>
                                        <div className="col-md-1"><button type='button'>Delete</button></div>
                                    </div>
                                </div>
                                {/* package_details */}
                                <label className='form-label'>Package Details</label>
                                <div className="col-md-4 mb-3">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 1' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 2' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 3' />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Discount</label>
                                    <input type="number" min='0' max='99' className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Validity</label>
                                    <input type="number" min='1' max='30' className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Validity Type</label>
                                    <select className="form-select rounded-0">
                                        <option value="Day">Days</option>
                                        <option value="Month">Month</option>
                                        <option value="Year">Year</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Available</label>
                                    <select className="form-select rounded-0">
                                        <option value="Day">Available</option>
                                        <option value="Year">Not Available</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Important Note</label>
                                    <textarea rows='1' className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Short Description</label>
                                    <textarea rows='1' className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Long Description</label>
                                    <textarea rows='1' className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Coupon Code</label>
                                    <input type="text" className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Attachment</label>
                                    <input type="file" className='form-control rounded-0' />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default CreatePremiumTools