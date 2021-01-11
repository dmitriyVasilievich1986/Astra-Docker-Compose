import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getUser, updateUser } from '../../actions/authActions'
import getHeaders from '../support/getHeaders'

class Mail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            received_message: [],
            text: "",
        }
    }
    componentDidMount() {
        axios.get('/api/blog/message/get_received/', getHeaders(this.props.token))
            .then(data => this.setState({ received_message: data.data }))
            .catch(err => console.log(err))
    }
    getMessages() {
        axios.get('/api/blog/message/get_received/', getHeaders(this.props.token))
            .then(data => this.setState({ received_message: data.data }))
            .catch(err => console.log(err))

        axios.get('/api/auth/account/', getHeaders(this.props.token))
            .then(data => this.props.updateUser(data.data.user))
            .catch(err => console.log(err))

    }
    openMailHandler(messageID, arrayIndex) {
        const context = {
            is_received: true,
        }
        this.setState({ text: this.state.received_message[arrayIndex].HTMLText })
        axios.put(`/api/blog/message/${messageID}/`, context, getHeaders(this.props.token))
            .then(() => { this.getMessages(); })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="container mt-4">
                <ul className="list-group">
                    {this.state.received_message.map((m, i) => {
                        return <li
                            onClick={() => this.openMailHandler(m.id, i)}
                            className="list-group-item"
                            style={{ backgroundColor: m.is_received ? "white" : "#cccccc", cursor: "pointer" }}
                            key={i}>
                            <div className="row pl-4 pr-4 justify-content-start">
                                <p>{m.title}</p>
                            </div>
                        </li>
                    })}
                </ul>
                <div className="mt-4 pt-4 border-top border-solid">
                    <div dangerouslySetInnerHTML={{ __html: this.state.text }} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
})

export default connect(mapStateToProps, { getUser, updateUser })(Mail)