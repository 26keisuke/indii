import React, { Component } from "react"
import { Link } from "react-router-dom"

import { VerifyBox, Warning } from "../Verification"
import Button from "../../Util/Button"
import { Space } from "../../Theme"

class Change extends Component {
    render() {
        return (
            <VerifyBox>
                <p>パスワードをリセット</p>
                <p>新しいパスワードを入力してください。</p>
                <input 
                    name="newPassword" 
                    type="password" 
                    value={this.props.newPassword}
                    onChange={(e) => this.props.handleChange(e, "newPassword")}
                />
                <p>確認のため再度入力してください。</p>
                <input 
                    name="confirmPassword" 
                    type="password" 
                    value={this.props.confirmPassword}
                    onChange={(e) => this.props.handleChange(e, "confirmPassword")}
                />
                { (this.props.newPassword && (this.props.newPassword.length < 8))
                ?
                <Warning>
                    <div/>
                    <p>パスワードが短すぎます</p>
                </Warning>
                :
                (this.props.newPassword && this.props.confirmPassword)
                ?   this.props.newPassword !== this.props.confirmPassword
                    ?
                    <Warning>
                        <div/>
                        <p>パスワードが一致しません</p>
                    </Warning>
                    :
                    <Space height="17px"/>
                :
                <Space height="17px"/>
                }
                <div>
                    {((this.props.newPassword) && (!this.props.newPassword.length < 8) && (this.props.newPassword === this.props.confirmPassword))
                    ?
                    <Button type="submit" onClick={(e) => this.props.handleClick(e)}>送信</Button>
                    :
                    <Button type="submit" disabled={true}>送信</Button>
                    }
                    <Link to={"/"}>ホームに戻る</Link>
                </div>
            </VerifyBox>
        )
    }
}

export default Change