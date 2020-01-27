import React, { Component } from "react"

import { TiUserAddOutline } from 'react-icons/ti';
import { FiCheck } from 'react-icons/fi';

import "./PeopleFollow.css"

class PeopleFollow extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            follow: false,
        }

        this.handleFollowClick = this.handleFollowClick.bind(this)
    }

    componentWillMount() {
        this.checkIfFollowed()
    }

    checkIfFollowed(){}

    handleFollowClick(e) {
        e.preventDefault()
        if(!this.state.follow){
            this.setState({
                follow: true
            })
        } else {
            this.setState({
                follow: false
            })
        }
    }

    render() {
        return (
            <div className={this.state.follow ? "people-followed" : "people-follow"} onClick={this.handleFollowClick}>
                {
                    this.state.follow 
                    ? <FiCheck className="people-followed-icon"/>
                    : <TiUserAddOutline className="people-follow-icon"/>
                }  
                {
                    this.state.follow 
                    ? <p className="people-followed-text">Followed</p>
                    : <p className="people-follow-text">Follow</p>
                }
            </div>
        ) 
    }
}


export default PeopleFollow