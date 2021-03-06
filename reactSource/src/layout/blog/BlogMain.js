import React from 'react'

export default function BlogMain(props) {
    // const headers = props.HTMLText.match(/<h4.*?h4>/g) ? props.HTMLText.match(/<h4.*?h4>/g).map(s => s.replace(/<.*?>/g, "")) : []
    const headColumns = props.HTMLText.match(/<h4.*?h4>/g) ? props.HTMLText.match(/<h4.*?h4>/g) : []
    const itemsID = headColumns.map(c => c.match(/id='.*?'/g).map(d => d.replaceAll(/^id='|'$/g, "")))
    const headers = headColumns.map(s => s.replace(/<.*?>/g, ""))

    return (
        <div className="row">
            <div className="col-lg-2">
                <div id="list-example" className="list-group-flush">
                    {headers.map((h, i) => <a key={i} className="list-group-item list-group-item-action" href={`#${itemsID[i]}`}>{h}</a>)}
                </div>
            </div>
            <div className="col">
                <div data-spy="scroll" data-target="#list-example" data-offset="0" className="scrollspy-example">
                    <div style={{ marginTop: "4rem" }}></div>
                    <div dangerouslySetInnerHTML={{ __html: props.HTMLText }} />
                    <div style={{ marginTop: "4rem" }} className="border-top border-solid mb-4"></div>
                </div>
            </div>
            <div className="col-lg-2" />
        </div>
    )
}
