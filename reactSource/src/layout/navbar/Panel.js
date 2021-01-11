import React from 'react'
import { connect } from 'react-redux'
import { setSidePanelStatus } from '../../actions/actions'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import GetCatalog from '../main/GetCatalog'


function Panel(props) {
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={props.sidePanelOpen}
        >
            <div style={{ "display": "flex", "alignItems": 'center', "justifyContent": "flex-end" }}>
                <IconButton onClick={() => props.setSidePanelStatus(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List style={{ "width": "240px", marginLeft: "2rem", marginTop: "3rem", marginRight: "2rem" }}>
                {props.fullCatalog.child ? <GetCatalog catalog={props.fullCatalog} /> : ""}
            </List>
        </Drawer>
    )
}

const mapStateToProps = state => ({
    sidePanelOpen: state.mainProperties.sidePanelOpenStatus,
    fullCatalog: state.catalog.fullCatalog,
})

export default connect(mapStateToProps, { setSidePanelStatus })(Panel)