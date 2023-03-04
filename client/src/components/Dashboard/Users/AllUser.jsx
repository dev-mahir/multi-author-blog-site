import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { get_all_user } from '../../../redux/auth/action';
import { toCapitalize } from '../../../utilis/capitalize';
import CircleLoader from '../../Loader/CircleLoader';


const AllUser = () => {
    const { user, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_all_user());
    }, []);

    return (

        <div className='all-user'>
            {user.length > 0 ?
                <div className='all-sub-admin'>
                <Helmet>
                    <title>All user</title>
                </Helmet>
                <div className="elements-numberOf-search-add_new">
                    <div className="numof-search-newAdd">
                        <div className="numof">
                            <h2>All user ({`${user.length - 1}`})</h2>
                        </div>
                        <div className="searchOf">
                            <div className="search">
                                <input type="text" placeholder='Search user' className="form-control" />
                            </div>
                            <span><FaSearch /></span>
                        </div>
                        <div className="newAdd">
                            <Link className='btn' to='/dashborad/all-sub-admin'>sub-admin</Link>
                        </div>
                    </div>
                    <div className="loading-elements">
                        <div className="elements">
                            <div className="table-wapper">
                                <table>
                                    <thead>
                                        <tr className='tr'>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Image</th>
                                            <th>Role</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {user.length > 0 && user.filter(item => item._id !== userInfo._id).map((item, index) =>
                                            <tr key={index}>
                                                <td data-label='No'>{index + 1}</td>
                                                <td data-label='Name'>{item.name}</td>
                                                <td data-label='Email'>{item.email}</td>
                                                <td data-label='Image' className='image'>
                                                    <img className='avatar' src={item.image ? `/images/${item.image}` : "/images/avatar.png"} alt="" />
                                                </td>
                                                <td> {toCapitalize(item.role)}</td>
                                                <td data-label='Action'>
                                                    {
                                                        item.access_status === 'block' ? <abbr title='Unblock this user' className='unsus'>Unblock</abbr> : <abbr title="Block this user">Block</abbr>
                                                    }
                                                    {
                                                        userInfo.role === 'admin' ? <abbr title='Make this user Editor'>Editor</abbr> : ''
                                                    }
                                                </td>                                          
                                    
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <CircleLoader/> }
          
        </div>
    )
}

export default AllUser