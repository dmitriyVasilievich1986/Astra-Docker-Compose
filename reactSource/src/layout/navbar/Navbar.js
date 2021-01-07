import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom";
import { clearUser } from '../../actions/authActions'
import { setSidePanelStatus, setModalStatus } from '../../actions/actions'
import axios from 'axios'

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Panel from './Panel'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';

function setStyleOnLink(active) {
    if (active)
        return { "color": "black" }
    return { "color": "gray" }
}

function Navbar(props) {
    const sendLogout = () => {
        const headers = { headers: {} }
        if (props.token)
            headers.headers['Authorization'] = `Token ${props.token}`
        axios.post('/api/auth/logout/', null, headers)
            .then(() => props.clearUser())
            .catch(err => console.log(err))
    }
    return (
        <div>
            <nav
                className="navbar navbar-light bg-light">
                <div className='container justify-content-between'>
                    <div>
                        <IconButton
                            style={{ "outline": "none" }}
                            onClick={() => props.setSidePanelStatus(!props.sidePanelOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Link className='ml-2' to='/' style={setStyleOnLink(props.location.pathname == "/")}>Главная</Link>
                    </div>
                    {!props.isAuthenticated ?
                        <div className='row align-items-center'>
                            <a style={{ "color": "black", "cursor": "pointer" }} onClick={() => props.setModalStatus(true)}>Вход</a><a className="align-items-center ml-2 mr-2">/</a>
                            <Link style={{ "color": "black", "cursor": "pointer" }} to='/registration'>Регистрация</Link>
                        </div> :
                        <div>
                            <Badge badgeContent={this.state.user.message_count} color="primary">
                                <MailIcon style={{ cursor: "pointer" }} />
                            </Badge>
                            <Link to='/account' style={{ "color": "black" }}>
                                {props.user.username}
                            </Link>
                            <ExitToAppIcon onClick={sendLogout} className="ml-2" style={{ cursor: 'pointer' }} />
                        </div>
                    }
                </div >
            </nav>
            <Panel />
        </div >
    )
}

const mapStateToProps = state => ({
    sidePanelOpen: state.mainProperties.sidePanelOpenStatus,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    user: state.auth.user,
})

export default connect(mapStateToProps, { setSidePanelStatus, setModalStatus, clearUser })(withRouter(Navbar))