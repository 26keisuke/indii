import React, { Component } from "react"
import { PreviewSection } from "./Element"

class Title extends Component {
    render() {
        return (
            <PreviewSection>
                <div/>
                <p>{this.props.title}</p>
            </PreviewSection>
        )
    }
}

export default Title