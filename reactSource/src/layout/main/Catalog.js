import axios from 'axios'
import React, { Component } from 'react'
import Page404 from '../support/page404'
import GetCatalog from './GetCatalog'
import GetBreadCumber from './GetBreadCumber'


class Catalog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            catalog: null,
        }
    }
    componentDidMount() {
        axios.get(`/api/blog/catalog/${this.props.match.params.catalogName}/get_by_name/`)
            .then(data => this.setState({ catalog: data.data, isLoading: false }))
            .catch(() => this.setState({ isLoading: false }))
    }
    render() {
        if (this.state.isLoading)
            return ""
        else if (this.state.catalog == null)
            return <Page404 />
        return (
            <div>
                <GetBreadCumber parent={this.state.catalog.get_parent} />
                <div className="container mt-4">
                    <GetCatalog catalog={this.state.catalog.get_child} />
                </div>
            </div>
        )
    }
}

export default Catalog