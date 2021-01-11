import React from 'react'
import { Link } from 'react-router-dom'

function GetCatalog(props) {
    return (
        <div>
            {props.catalog.name == '' ? <Link to="/">{props.catalog.title}</Link> : <Link to={`/catalog/${props.catalog.name}/`}>{props.catalog.title}</Link>}
            {props.catalog.blog ? <ul><li><Link to={`/blog/${props.catalog.blog.name}`}>{props.catalog.blog.title}</Link></li></ul> : <ul>{props.catalog.child.map((c, i) => <li key={i}><GetCatalog catalog={c} /></li>)}</ul>}
        </div>
    )
}

export default GetCatalog