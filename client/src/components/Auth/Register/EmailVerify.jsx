import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { email_verify } from '../../../redux/auth/action';
import Spinner from '../../Loader/Spinner/Spinner';
import { useNavigate } from 'react-router-dom'


const EmailVerify = () => {
    const { authenticate } = useSelector( state => state.auth);
    const { loader } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [otp, setOtp] = useState();

    const handleEmailVerify = () => {
        dispatch(email_verify(otp, setOtp, navigate))
    }


    return (
        <div className="verify_email">
            <div className="verify">
                <div className="otp">
                    <p>Check your email and submit OTP</p>
                    <div className="form-group">
                        <input type="text" name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='form-control' id='otp' placeholder='Enter OTP code' />
                    </div>
                    <div className="form-group">
                        <button onClick={handleEmailVerify} className="btn btn-block">
                            {loader ? <Spinner /> : "Submit"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmailVerify