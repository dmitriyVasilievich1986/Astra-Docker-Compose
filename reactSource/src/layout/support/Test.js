import React, { Component } from 'react'
import page404 from '../support/page404'
import { connect } from 'react-redux'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullCatalog: [],
            catalog: [],
            blogs: [],
            blog: {},
            HTMLString: "<h1>Hello world</h1>",
            fullCatalogSelectValue: '',
            catalogSelectValue: '',
            blogSelectValue: '',
            title: '',
            name: '',
        }
    }
    getContext() {
        return {
            catalog: this.state.catalogSelectValue,
            HTMLText: this.state.HTMLString,
            title: this.state.title,
            name: this.state.name,
        }
    }
    sendChanges() {
        const context = this.getContext()

        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.put(`/api/blog/blog/${this.state.blogSelectValue}/`, context, headers)
            .then(() => {
                axios.get('/api/blog/blog/')
                    .then(data => this.setState({ blogs: data.data }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    sendNewBlog() {
        const context = this.getContext()

        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.post(`/api/blog/blog/`, context, headers)
            .then(() => {
                axios.get('/api/blog/blog/')
                    .then(data => this.setState({
                        HTMLString: data.data[data.data.length - 1].HTMLText,
                        blogSelectValue: data.data[data.data.length - 1].id,
                        title: data.data[data.data.length - 1].title,
                        name: data.data[data.data.length - 1].name,
                        blogs: data.data,
                    }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    deleteBlog() {
        const headers = { headers: {} }
        if (this.props.token)
            headers.headers['Authorization'] = `Token ${this.props.token}`

        axios.delete(`/api/blog/blog/${this.state.blogSelectValue}/`, headers)
            .then(() => {
                axios.get('/api/blog/blog/')
                    .then(data => this.setState({
                        HTMLString: data.data[0].HTMLText,
                        blogSelectValue: data.data[0].id,
                        title: data.data[0].title,
                        name: data.data[0].name,
                        blogs: data.data,
                    }))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        axios.get('/api/blog/fullcatalog/')
            .then(data => this.setState({
                fullCatalogSelectValue: data.data[0].id,
                fullCatalog: data.data,
            }))
            .catch(err => console.log(err))

        axios.get('/api/blog/catalog/')
            .then(data => this.setState({
                catalogSelectValue: data.data[0].id,
                catalog: data.data,
            }))
            .catch(err => console.log(err))

        axios.get('/api/blog/blog/')
            .then(data => this.setState({
                HTMLString: data.data[0].HTMLText,
                blogSelectValue: data.data[0].id,
                name: data.data[0].name,
                blogs: data.data,
            }))
            .catch(err => console.log(err))
    }
    onChangeBlogHandler(e) {
        const bl = this.state.blogs.filter(b => b.id == e.target.value)[0]
        this.setState({
            catalogSelectValue: bl.catalog,
            HTMLString: bl.HTMLText,
            blogSelectValue: bl.id,
            title: bl.title,
            name: bl.name,
        })
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        if (!this.props.user || this.props.user.username != 'root')
            return page404()
        return (
            <div className='container mt-4'>
                <div className="row justify-content-center mb-4">
                    <div className='col-3 mt-4'>
                        <Select
                            className='w-100 mt-4'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='fullCatalogSelectValue'
                            value={this.state.fullCatalogSelectValue}
                            onChange={this.onChangeHandler.bind(this)}
                        >
                            {this.state.fullCatalog.map((c, i) => <MenuItem value={c.id} key={i}>{c.name}</MenuItem>)}
                        </Select>
                        <Select
                            className='w-100 mt-4'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='catalogSelectValue'
                            value={this.state.catalogSelectValue}
                            onChange={this.onChangeHandler.bind(this)}
                        >
                            {this.state.catalog.map((c, i) => <MenuItem value={c.id} key={i}>{c.name}</MenuItem>)}
                        </Select>
                        <Select
                            className='w-100 mt-4'
                            name='blogSelectValue'
                            value={this.state.blogSelectValue}
                            onChange={this.onChangeBlogHandler.bind(this)}
                        >
                            {this.state.blogs.map((c, i) => <MenuItem value={c.id} key={i}>{c.name}</MenuItem>)}
                        </Select>
                        <TextField className='w-100 mt-4' label="Название блога" value={this.state.name} onChange={this.onChangeHandler.bind(this)} name='name' />
                        <TextField className='w-100 mt-4' label="Титульник" value={this.state.title} onChange={this.onChangeHandler.bind(this)} name='title' />
                    </div>
                </div>
                <div className="btn-group m-4" role="group">
                    <button type="button" onClick={this.sendChanges.bind(this)} className="btn btn-primary">Сохранить изменения</button>
                    <button type="button" onClick={this.sendNewBlog.bind(this)} className="btn btn-secondary">Сохранить новый</button>
                    <button type="button" onClick={this.deleteBlog.bind(this)} className="btn btn-danger">Удалить</button>
                </div>

                <div className="form-group">
                    <textarea
                        value={this.state.HTMLString}
                        onChange={e => this.setState({ HTMLString: e.target.value })}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3" />
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.HTMLString }}>
                </div>
                <div className="mt-4 mb-4" />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
})

export default connect(mapStateToProps, null)(Test)