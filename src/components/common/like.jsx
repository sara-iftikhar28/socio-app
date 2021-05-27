import React, { Component } from 'react';
class Like extends Component {

    //Input: like = boolean
    //Output: onClick 

    state = {  }
    render() { 
        let classes = "fa fa-heart"
        if(!this.props.like) classes += '-o'

        return ( 
            <i onClick={this.props.onToggle} className={classes}></i>
         );
    }
}
 
export default Like;