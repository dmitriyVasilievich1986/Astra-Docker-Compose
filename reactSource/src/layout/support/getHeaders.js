import React from 'react'

export default function getHeaders(props) {
    const headers = { headers: {} }
    if (props)
        headers.headers['Authorization'] = `Token ${props}`
    return headers
}
