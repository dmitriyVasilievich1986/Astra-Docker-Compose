import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

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
    openMailHandler(e) {
        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`
        const context = {
            is_received: true,
        }
        axios.put(`/api/blog/message/${e.target.id}/`, context, headers)
            .then(data => this.state.received_message[e.target.key] = data.data)
            .catch(err => console.log(err))
        this.setState({ text: this.state.received_message[e.target.key].text })
    }
    render() {
        return (
            <div className="container mt-4">
                <ul className="list-group">
                    {this.state.received_message.map((m, i) => {
                        return <li
                            onClick={this.openMailHandler.bind(this)}
                            id={m.id}
                            className="list-group-item"
                            style={{ backgroundColor: m.is_received ? "white" : "gray", cursor: "pointer" }}
                            key={i}>{m.title}:{i}</li>
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

export default connect(mapStateToProps, null)(Mail)