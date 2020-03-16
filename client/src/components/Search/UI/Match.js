import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Warning from "../Warning/Warning"
import { GreenMark, RedMark, Eclipse, EclipseWrapper } from "../../Action/Element/Element"

class Match extends Component {
    render() {

        const { title, message, theme, value, showWarning, showMark, children, isFetching } = this.props

        const text = theme === "TOPIC" ? "topic" : theme === "POST" ? "post" : ""
        const jpText = theme === "TOPIC" ? "トピック" : theme === "POST" ? "ポスト" : ""

        return ([
            <div key={"warningTop"}> 
                { showWarning &&
                <Warning>
                    <p>
                        {jpText}「{value}」はまだ作られていません。
                        <Link to={`/action/${text}/create`}>
                            新しく作成しますか？
                        </Link>
                    </p>
                </Warning>
                }
                <p>{ title }</p>
            </div>,
            <form key={"warningBottom"}>
                <p>{ message }</p>
                { children }
                {isFetching && 
                    <EclipseWrapper>
                        <Eclipse>
                            <div></div>
                        </Eclipse>
                    </EclipseWrapper>
                }
                {(!isFetching && (showMark === "GREEN")) && <GreenMark/>}
                {(!isFetching && (showMark === "RED")) && <RedMark/>}
            </form>
        ])
    }
}

Match.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
    showWarning: PropTypes.bool,
    children: PropTypes.object, // <Search {withEnhancedLogic by controller}/>が入る
}

function mapStateToProps({ search }){
    return {
        isFetching: search.actionFetching
    }
}


export default connect(mapStateToProps)(Match)
