import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'

import page404 from '../support/page404'
import { setModalStatus, getComments } from '../../actions/actions'
import GetBreadCumber from '../main/GetBreadCumber'
import getHeaders from '../support/getHeaders'

import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Comments from './Comments'
import BlogMain from './BlogMain'

class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            blog: null,
            commentText: "",
            likesCount: 0,
            isLiked: false,
        }
    }
    componentDidMount() {
        this.props.getComments(this.props.match.params.blogName)
        axios.get(`/api/blog/blog/${this.props.match.params.blogName}/get_by_name/`, getHeaders(this.props.token))
            .then(data => this.setState({
                isLoading: false,
                blog: data.data,
                isLiked: data.data.is_liked,
                likesCount: data.data.get_likes_count,
            }))
            .catch(() => this.setState({ isLoading: false }))
    }
    likeClickHandler() {
        if (!this.props.token)
            this.props.setModalStatus(true)

        axios.post(`/api/blog/blog/${this.props.match.params.blogName}/likes/`, null, getHeaders(this.props.token))
            .then(data => this.setState({
                likesCount: data.data.likes,
                isLiked: data.data.is_liked,
            }))
            .catch(err => console.log(err))
    }
    sendCommentHandler() {
        const context = {
            text: this.state.commentText,
            owner: this.state.blog.id,
            blog: this.props.match.params.blogName,
        }
        axios.post('/api/blog/comments/', context, getHeaders(this.props.token))
            .then(() => this.props.getComments(this.props.match.params.blogName))
            .catch(err => console.log(err))
    }
    render() {
        if (this.state.isLoading)
            return ""
        else if (this.state.blog == null)
            return page404()
        return (
            <div style={{ marginBottom: "5rem" }}>
                <GetBreadCumber parent={this.state.blog.get_parent} />
                <BlogMain HTMLText={this.state.blog.HTMLText} />
                <div className='container'>
                    <Badge badgeContent={this.state.likesCount} color="primary">
                        <h5 className='mr-2'>Понравилось? Ставь:</h5>
                        {this.state.isLiked ? <FavoriteIcon onClick={this.likeClickHandler.bind(this)} style={{ color: "red", cursor: "pointer" }} /> : <FavoriteBorderIcon onClick={this.likeClickHandler.bind(this)} style={{ cursor: "pointer" }} />}
                    </Badge>
                    <div className="form-group mt-4 mb-4 pb-4">
                        <textarea
                            value={this.state.commentText}
                            onChange={e => this.setState({ commentText: e.target.value })}
                            className="form-control" />
                        <button onClick={this.sendCommentHandler.bind(this)} className='btn btn-primary btn-sm'>Оставить свой комментарий</button>
                    </div>
                    {this.props.comments.map((c, i) => <Comments key={i} getComments={this.props.getComments} user={this.props.user} token={this.props.token} comments={c} blogName={this.props.match.params.blogName} />)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    user: state.auth.user,
    comments: state.catalog.comments,
})

export default connect(mapStateToProps, { setModalStatus, getComments })(Blog)