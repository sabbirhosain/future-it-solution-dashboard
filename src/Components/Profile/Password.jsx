import React from 'react'

const Password = () => {
    return (
        <div class="modal fade" id="exampleModal">
            <div class="modal-dialog">
                <div class="modal-content rounded-0">
                    <form action="">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Old Password</label>
                                    <input type="password" className='form-control rounded-0' />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>New Password</label>
                                    <input type="password" className='form-control rounded-0' />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className='form-label'>Confirm Password</label>
                                    <input type="password" className='form-control rounded-0' />
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="reset" class="btn btn-secondary rounded-0">Reset</button>
                            <button type="submit" class="btn btn-primary rounded-0">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password