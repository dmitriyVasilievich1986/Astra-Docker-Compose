import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'

import page404 from '../support/page404'
import { setModalStatus } from '../../actions/actions'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullCatalogName: '',
            catalogName: '',
            HTMLText: '',
            title: '',
            name: '',
            isLoading: true,
            isLiked: true,
            likesCount: 0,
        }
    }
    componentDidMount() {
        axios.get(`/api/blog/blog/${this.props.match.params.blogID}/`)
            .then(data => this.setState({
                fullCatalogName: data.data.full_catalog_name,
                catalogName: data.data.catalog_name,
                likesCount: data.data.likes_count,
                HTMLText: data.data.HTMLText,
                isLiked: data.data.is_liked,
                title: data.data.title,
                name: data.data.name,
                isLoading: false,
            }))
            .catch(() => this.setState({ isLoading: false }))
    }
    likeClickHandler() {
        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`
        else {
            this.props.setModalStatus(true)
            return
        }

        axios.post(`/api/blog/blog/${this.props.match.params.blogID}/likes/`, null, headers)
            .then(data => this.setState({
                likesCount: data.data.likes,
                isLiked: data.data.is_liked,
            }))
            .catch(err => console.log(err))
    }
    render() {
        if (this.state.HTMLText == '')
            if (this.state.isLoading)
                return ""
            else
                return page404()
        return (
            <div className='container'>
                <Breadcrumbs aria-label="breadcrumb" className='pb-3 mb-4 mt-2 pt-2 border-bottom border-solid'>
                    <Link to='/'>Главная</Link>
                    <Link to={`/${this.props.match.params.catalogName}/`}>{this.state.fullCatalogName}</Link>
                    <Link to={`/${this.props.match.params.catalogName}/${this.props.match.params.blogName}/`}>{this.state.catalogName}</Link>
                    <a style={{ color: "gray" }}>{this.state.name}</a>
                </Breadcrumbs>
                <div style={{ marginTop: "4rem" }}></div>
                <div dangerouslySetInnerHTML={{ __html: this.state.HTMLText }} />
                <div style={{ marginTop: "4rem" }} className="border-top border-solid mb-4"></div>
                <Badge badgeContent={this.state.likesCount} color="primary">
                    <h5 className='mr-2'>Понравилось? Ставь:</h5>
                    {this.state.isLiked ? <FavoriteIcon onClick={this.likeClickHandler.bind(this)} style={{ color: "red", cursor: "pointer" }} /> : <FavoriteBorderIcon onClick={this.likeClickHandler.bind(this)} style={{ cursor: "pointer" }} />}

                </Badge>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
})

export default connect(mapStateToProps, { setModalStatus })(Blog)