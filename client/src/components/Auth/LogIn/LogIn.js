import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { Link } from "react-router-dom"
import TextField from '@material-ui/core/TextField';

import * as actions from "../../../actions"

import Button from "../../Util/Button"
import { Space } from "../../Theme"

class LogIn extends Component {

    componentWillUnmount() {
        if(this.props.auth.logInError) {
            this.props.logInError(null)
        }
    }

    render () {
        return (
            <form>
                <TextWrapper>
                    <TextField 
                        id="email" 
                        label="Eメール" 
                        value={this.props.logInStates.email}
                        onChange={(e) => this.props.handleLogInChange(e,"email")} 
                        type="email"
                    />
                    
                    <TextField 
                        id="password" 
                        label="パスワード" 
                        value={this.props.logInStates.password}
                        onChange={(e) => this.props.handleLogInChange(e,"password")} 
                        type="password"
                    />
                </TextWrapper>
                <Remember >
                    <input 
                        type="checkbox" 
                        id="remember" 
                        name="remember" 
                        checked={this.props.remember} 
                        onChange={(e) => this.props.setRemember(e)}
                    />
                    <label htmlFor="remember" onClick={(e) => this.props.setRemember(e)}>次から入力を省略</label>
                </Remember>
                { this.props.error &&
                <Message>
                    <div/>
                    <p>Emailかパスワードが間違っています。</p>
                </Message>
                }
                <BottomWrapper>
                    {   ((this.props.logInStates.email) && (this.props.logInStates.password)) 
                    ?
                    <Button width={"316px"} onClick={(e) => this.props.handleSubmit(e, "logIn")}>ログイン</Button>
                    :
                    <Button width={"316px"} disabled={true} type="submit">ログイン</Button>
                    }
                    <Space height={"7px"}/>
                    <Link to={"/verification/change"}>パスワードを忘れた方はこちら</Link>
                    <Link to={"/verification/token"}>確認メールを再送する場合はこちら</Link>
                </BottomWrapper>
            </form>
        )
    }
}

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
        width: 316px;
        margin-bottom: 20px;
    }
`

export const BottomWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: ${props => props.signUp ? "-22px" : "10px"};

    & > a {
        color: #656565;
        margin-top: 12px;
        cursor: pointer;
        border-bottom: 1px dotted #656565;
    }

    & > p {
        font-size: 10px;
        width: 300px;
        text-align: center;
        margin-top: 10px;
        color: #656565;
    }
`

const Remember = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 42px;
    margin-bottom: 30px;
`

const Message = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #333333;
    margin-left: 42px;

    & > div {
        width: 7px;
        height: 7px;
        margin-right: 8px;
        border-radius: 100%;
        background-color: #FF5F5F;
    }
`


function mapStateToProps({auth}){
    return {
        auth
    }
}

export default connect(mapStateToProps, actions)(LogIn)