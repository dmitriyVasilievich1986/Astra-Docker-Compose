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

const headersStyleColor = { "color": "#ffffff" }

function setStyleOnLink(active) {
    if (active)
        return { "color": "lightgray" }
    return headersStyleColor
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
                className="navbar navbar-light" style={{ backgroundColor: "#0057ff" }}>
                <div className='container justify-content-between'>
                    <div>
                        <IconButton
                            style={{ ...headersStyleColor, outline: "none" }}
                            onClick={() => props.setSidePanelStatus(!props.sidePanelOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Link className='ml-2' to='/' style={setStyleOnLink(props.location.pathname == "/")}>Главная</Link>
                    </div>
                    {!props.isAuthenticated ?
                        <div className='row align-items-center'>
                            <Link style={{ ...headersStyleColor, cursor: "pointer" }} to='/' onClick={e => { e.preventDefault(); props.setModalStatus(true); }}>Вход</Link>
                            <a style={headersStyleColor} className="align-items-center ml-2 mr-2">/</a>
                            <Link style={{ ...headersStyleColor, "cursor": "pointer" }} to='/registration'>Регистрация</Link>
                        </div> :
                        <div className="align-items-center">
                            <Link to='/account' style={{ ...headersStyleColor, marginLeft: "1rem" }}>
                                {props.user.username}
                            </Link>
                            <Link to='/mail' style={{ ...headersStyleColor, marginLeft: "1rem" }}>
                                <Badge badgeContent={props.user.get_message_count} color="error">
                                    <MailIcon style={{ cursor: "pointer" }} />
                                </Badge>
                            </Link>
                            <ExitToAppIcon onClick={sendLogout} style={{ ...headersStyleColor, marginLeft: "1rem", cursor: 'pointer' }} />
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