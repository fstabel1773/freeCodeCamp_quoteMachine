import React from "react";


function Quote(props) {

    const {quoteText, author} = props.quoteContent

    return (
        <div>
            <h3 id="text">»{quoteText}«</h3>
            <p id="author">~ {author}</p>
        </div>
    )
}

export default Quote 