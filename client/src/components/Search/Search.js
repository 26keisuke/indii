// 最低限のUIだけであとはユーザーからのPropsに任せる

import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

class Search extends Component {

    constructor(props){
        super(props)

        this.state = {
            cursor: 0,
            forceShow: false,
        }

        this.searchRef = React.createRef()
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.outsideClick)
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.outsideClick)
    }

    outsideClick = (e) => {
        if(!this.props.blur) {
            if(this.searchRef && this.searchRef.current && this.searchRef.current.contains(e.target)) {
                this.setState({ forceShow: true })
                return;
            }
            this.setState({ forceShow: false })
        }
    }

    handleChange = (e) => {
        this.props.handleChange(e.target.value)
        this.props.getSuggestions(e.target.value)
        if(this.props.storage){
            localStorage.setItem(this.props.storage, e.target.value)
        }
    }

    handleKeyDown = (e) => {
        const { cursor } = this.state
        const suggestionLength = this.props.suggestions.length
        if(e.keyCode === 38 && cursor > 0){
            console.log("UP")
            this.setState({
                cursor: this.state.cursor - 1
            })
        } else if(e.keyCode === 40 && cursor < suggestionLength - 1){
            console.log("DOWN")
            this.setState({
                cursor: this.state.cursor + 1
            })
        }
    }

    render () {

        const { 
            blur,
            value,
            placeholder,
            suggestions, 
            handleBlur, 
            handleFocus,
            handleSubmit,
            renderSuggestion,
            blurStyle,
            focusStyle,
            suggestionStyle } = this.props

        const { cursor, forceShow } = this.state

        return(
            <Wrapper ref={this.searchRef}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        type="text" 
                        value={value}
                        onChange={this.handleChange} 
                        placeholder={placeholder} 
                        onKeyDown={this.handleKeyDown}
                        style={blur ? blurStyle : focusStyle}
                        onFocus={handleFocus} 
                        onBlur={handleBlur}
                    />
                </form>
                <div style={suggestionStyle}>
                    { (forceShow || !blur) && suggestions.map((suggestion, index) => 
                        renderSuggestion(suggestion, index, cursor)
                    )}
                </div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    position: relative;
    width: 100%;

    & > div {
        position: absolute;
        width: 100%;
    }
`

Search.propTypes = {

    focusStyle: PropTypes.object,
    blurStyle: PropTypes.object,
    suggestionStyle: PropTypes.object,

    storage: PropTypes.string,

    blur: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,

    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleFocus: PropTypes.func, 
    handleBlur: PropTypes.func, 

    suggestions: PropTypes.arrayOf(PropTypes.any),
    getSuggestions: PropTypes.func,
    renderSuggestion: PropTypes.func,
}

export default Search