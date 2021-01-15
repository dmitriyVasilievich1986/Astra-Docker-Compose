import getHeaders from '../support/getHeaders'
import React, { Component } from 'react'
import axios from 'axios';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const answerMessage = "Прокомментировать сообщение"
const updateMessage = "Изменить сообщение"

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            delete: false,
            answer: false,
            answerText: "",
            commentText: "",
        }
    }
    sendUpdatedCommentHandler(newText) {
        const context = { text: newText }
        axios.put(`/api/blog/comments/${this.props.comments.id}/`, context, getHeaders(this.props.token))
            .then(() => this.props.getComments(this.props.blogName))
            .catch(err => console.log(err))
    }
    deleteCommentsHandler() {
        this.sendUpdatedCommentHandler("Комментарий был удален пользователем.")
    }
    answerMessageHandler() {
        this.setState({ answer: false, answerText: "" })
        if (this.state.answerText == updateMessage) {
            this.sendUpdatedCommentHandler(this.state.commentText)
        } else if (this.state.answerText == answerMessage) {
            const context = { text: this.state.commentText, parent: this.props.comments.id, blog: this.props.blogName }
            axios.post('/api/blog/comments/', context, getHeaders(this.props.token))
                .then(() => this.props.getComments(this.props.blogName))
                .catch(err => console.log(err))
        }
    }
    render() {
        return (
            <div>
                <div className="card border-dark mb-3">
                    <div className="card-header">
                        <div className="row justify-content-between ml-2 mr-2">
                            <div>
                                <Chip
                                    style={{ height: "2rem", marginRight: "1rem", paddingLeft: "5px", paddingRight: "1rem" }}
                                    size="small"
                                    avatar={<Avatar>{this.props.comments.user[0].toUpperCase()}</Avatar>}
                                    label={`${this.props.comments.user} `}
                                    color="primary"
                                />
                            оставил комментарий:
                        </div>
                            <div className="dropdown">
                                <button
                                    style={{ border: "0", outline: "none", backgroundColor: "transparent" }}
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <MoreHorizIcon />
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {this.props.user && this.props.user.username == this.props.comments.user ? <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => this.setState({ delete: true })}>Удалить</a> : ""}
                                    <a style={{ cursor: "pointer" }} className="dropdown-item" onClick={() => this.setState({ answer: true, answerText: answerMessage })}>Ответить</a>
                                    {this.props.user && this.props.user.username == this.props.comments.user ? <a className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => this.setState({ answer: true, answerText: updateMessage })}>Редактировать</a> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-dark">
                        <p className="card-text">{this.props.comments.text}</p>
                        {this.state.delete ?
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button onClick={this.deleteCommentsHandler.bind(this)} type="button" className="btn btn-danger btn-sm">Удалить</button>
                                <button onClick={() => this.setState({ delete: false })} type="button" className="btn btn-primary btn-sm">Отмена</button>
                            </div> :
                            ""}
                        {this.state.answer ?
                            <div>
                                <textarea
                                    value={this.state.commentText}
                                    onChange={e => this.setState({ commentText: e.target.value })}
                                    className="form-control" />
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={this.answerMessageHandler.bind(this)} type="button" className="btn btn-primary btn-sm">{this.state.answerText}</button>
                                    <button onClick={() => this.setState({ answer: false, answerText: "" })} type="button" className="btn btn-secondary btn-sm">Отмена</button>
                                </div>
                            </div> :
                            ""
                        }
                    </div>
                </div>
                { this.props.comments.child ? <ul>{this.props.comments.child.map((c, i) => <li key={i}><Comments getComments={this.props.getComments} user={this.props.user} token={this.props.token} key={i} comments={c} blogName={this.props.blogName} /></li>)}</ul> : <h1></h1>}
            </div >
        )
    }
}

export default Comments