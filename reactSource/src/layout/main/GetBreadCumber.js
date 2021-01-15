import React from 'react'
import { Link } from 'react-router-dom'

function GetBreadCumber(props) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {props.parent.slice(1).reverse().map((c, i) => {
                    return (
                        <li key={i} className="breadcrumb-item">
                            <a href={c.name == "" ? "/" : `/catalog/${c.name}/`}>
                                {c.title}
                            </a>
                        </li>
                    )
                })}
                <li className="breadcrumb-item active" aria-current="page">
                    {props.parent[0].title}
                </li>
            </ol>
        </nav>
    )
}

export default GetBreadCumber