import React from 'react'
import { Link } from 'react-router-dom'

function GetCatalog(props) {
    return (
        <div>
            {props.catalog.name == '' ? <Link to="/">{props.catalog.title}</Link> : <a href={`/catalog/${props.catalog.name}/`}>{props.catalog.title}</a>}
            {props.catalog.blog ?
                <ul>{props.catalog.blog.map((bl, i) => <li key={i}><Link to={`/blog/${bl.name}`}>{bl.title}</Link></li>)}</ul> :
                <ul>{props.catalog.child.map((c, i) => <li key={i}><GetCatalog catalog={c} /></li>)}</ul>}
        </div>
    )
}

export default GetCatalog