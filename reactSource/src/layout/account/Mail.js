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
    render() {
        return (
            <div className="container">
                <ul class="list-group">
                    {this.state.received_message.map((m, i) => <li class="list-group-item" key={i}>{m.title}</li>)}
                </ul>
                <div>
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