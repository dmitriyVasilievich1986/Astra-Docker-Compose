import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getUser, updateUser } from '../../actions/authActions'

class Mail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            received_message: [],
            text: "",
        }
    }
    componentDidMount() {
        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.get('/api/blog/message/get_received/', headers)
            .then(data => this.setState({ received_message: data.data }))
            .catch(err => console.log(err))
    }
    getMessages() {
        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.get('/api/blog/message/get_received/', headers)
            .then(data => this.setState({ received_message: data.data }))
            .catch(err => console.log(err))

        axios.get('/api/auth/account/', headers)
            .then(data => this.props.updateUser(data.data.user))
            .catch(err => console.log(err))

    }
    openMailHandler(messageID, arrayIndex) {
        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`
        const context = {
            is_received: true,
        }
        this.setState({ text: this.state.received_message[arrayIndex].text })
        axios.put(`/api/blog/message/${messageID}/`, context, headers)
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
                            style={{ backgroundColor: m.is_received ? "white" : "gray", cursor: "pointer" }}
                            key={i}>
                            <div className="row pl-2 pr-2 justify-content-between">
                                <p>{m.sender_name}</p>
                                <p>{m.title}</p>
                            </div>
                        </li>
                    })}
                </ul>
                <div className="mt-4 border-top border-solid">
                    <p className="text-center">{this.state.text}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
})

export default connect(mapStateToProps, { getUser, updateUser })(Mail)