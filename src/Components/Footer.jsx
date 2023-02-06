import React from "react";

function Footer(props) {


    return(
        <div className="btn-container">
          <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank" style={{color: props.color}}>
            <i className="fa-brands fa-square-twitter" ></i>
          </a>
          <button id="new-quote" onClick={props.getNewQuote} style={{backgroundColor: props.color, boxShadow: `0 0 0.5em ${props.color}`}}>New quote</button>
        </div>
    )
}

export default Footer