import React from 'react'
import Layout from '../../Layout/Layout'

const CreatePremiumTools = () => {
    return (
        <Layout>
            <section className='container my-5'>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <form className='shadow-sm bg-white px-5 pt-3 pb-4'>
                            <h4 className='text-center py-4'>Create Premium Tools</h4>
                            <div className="row border-top border-warning pt-4">
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Tools Name</label>
                                    <input type="text" className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Price</label>
                                    <input type="text" className='form-control rounded-0' required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className='form-label'>Price Type</label>
                                    <select className="form-select rounded-0">
                                        <option value="BDT">BDT</option>
                                        <option value="USD">USD</option>
                                    </select>
                                </div>

                                {/* additional_feature */}
                                <label className='form-label'>Additional Feature</label>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 1' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 2' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 3' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 4' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 5' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 6' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 7' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 8' />
                                </div>
                                <div className="col-md-4 mb-1">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 9' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 10' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 11' />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <input type="text" className='form-control rounded-0' placeholder='Option 12' />
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