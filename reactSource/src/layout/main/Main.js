import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import GetCatalog from './GetCatalog'

function Main(props) {
    return (
        <div className='container mt-4'>
            {props.fullCatalog.child ? <GetCatalog catalog={props.fullCatalog} /> : ""}
        </div>
    )
}

const mapStateToPros = state => ({
    fullCatalog: state.catalog.fullCatalog,
})

export default connect(mapStateToPros, null)(withRouter(Main))