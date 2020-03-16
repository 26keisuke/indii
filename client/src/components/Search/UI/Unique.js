import React, { Component } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import Warning from "../Warning/Warning"
import { GreenMark, RedMark, Eclipse, EclipseWrapper, Owner, OwnerIcon } from "../../Action/Element/Element"

class Unique extends Component {
    render() {

        const { title, message, theme, value, showHelper, showWarning, warningId, showMark, children, isFetching } = this.props

        const text = theme === "TOPIC" ? "topic" : theme === "POST" ? "post" : ""
        const jpText = theme === "TOPIC" ? "トピック" : theme === "POST" ? "ポスト" : ""

        return ([
            <div key={"warningTop"}> 
                { showWarning &&
                <Warning>
                    <p>
                        既に{jpText}
                        <Link to={`/${text}/${warningId}`}>
                            "{value}"
                        </Link>
                        は存在しています。代わりに
                        <Link to={"/action/post/create"}>
                            新しいポスト
                        </Link>
                        を追加しますか？
                    </p>
                </Warning>
                }
                <p>{ title }</p>
                {!!showHelper && 
                <Owner>
                    <OwnerIcon/>
                    <p>: オーナーが最終確認するポスト</p>
                </Owner>
                }
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

Unique.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    showHelper: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
    showWarning: PropTypes.bool,
    showMark: PropTypes.string,
    warningId: PropTypes.string,
    children: PropTypes.object, // <Search {withEnhancedLogic by controller}/>が入る
}

function mapStateToProps({ search }){
    return {
        isFetching: search.actionFetching
    }
}

export default connect(mapStateToProps)(Unique)