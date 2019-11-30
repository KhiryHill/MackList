import React from "react";
const styles = {
    adCard: {
        margin: "33%",
        background: "white"
    },
    name:{
        "text-align": "center"
    },
    content:{
        padding: 20,
    }
};
function adCard(props) {
    return(
<div className ="card">
    <div className ="img-container">
        <img alt= {props.name} src= {props.image}/>
    </div>
    <div className= "content">
        <ul>
            <li>
                <strong>Name:</strong> {props.name}
            </li>
            <li>
                <strong>Price:</strong>{props.price}
            </li>
        </ul>
    </div>
</div>
    );
}

export default adCard;