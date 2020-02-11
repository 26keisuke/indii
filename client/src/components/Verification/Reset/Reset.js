import React, { Component } from "react"
import { Link } from "react-router-dom"

import { VerifyBox, Warning } from "../Verification"
import Button from "../../Util/Button"
import { Space } from "../../Theme"

class Reset extends Component {
    render() {
        return (
            <VerifyBox>
                { this.props.type === "password"
                ?
                <p>パスワードをリセット</p>
                :
                <p>認証メールを再送信</p>
                }
                <p>登録しているEmailを入力してください。</p>
                <input 
                    name="sendEmail" 
                    type="email" 
                    value={this.props.value}
                    onChange={(e) => this.props.handleChange(e, "sendEmail")}
                />
                {  this.props.value 
                ?
                    !this.props.valid
                    ?
                    <Warning>
                        <div/>
                        <p>Emailは「__@__」の形で入力してください。</p>
                    </Warning>
                    :
                    <Space height="17px"/>
                :
                <Space height="17px"/>
                }
                <div>
                    { (this.props.value && this.props.valid) 
                    ?
                    <Button type="submit" onClick={this.props.handleClick}>送信</Button>
                    :
                    <Button disabled={true} type="submit">送信</Button>
                    }
                    <Link to={"/"}>ホームに戻る</Link>
                </div>
            </VerifyBox>
        )
    }
}

export default Reset