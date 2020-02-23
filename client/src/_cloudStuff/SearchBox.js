import React, { Component } from "react";

import search from "../images/search.png";
import searchClick from "../images/search-click.png";

class SearchBox extends Component {

    constructor(props){
        super(props)
        this.state = {
            clicked: false,
            cName: "search-box-unclicked",
            cImage: search,
            value: ""
        }
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleValue = this.handleValue.bind(this)
    }

    handleFocus() {
        this.setState({
            clicked: true,
            cName: "search-box-clicked",
            cImage: searchClick,
        })
    }

    handleBlur() {
        this.setState({
            clicked: false,
            cName: "search-box-unclicked",
            cImage: search,
        })
    }

    handleValue(event) {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return (
            <div className={"search-box" + " " + this.state.cName}>
                <img 
                    src={this.state.cImage}  
                    className="search-icon"
                />
                <input
                    onFocus={this.handleFocus} 
                    onBlur={this.handleBlur} 
                    className="search-input" 
                    placeholder="Indiiで検索"
                />
            </div>
        )
    }
}

export default SearchBox