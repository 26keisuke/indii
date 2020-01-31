import React, {Component} from "react"
import { Link } from "react-router-dom"

import { IoIosArrowRoundForward } from "react-icons/io"

import post_create from "../images/post-create.png"
import post_edit from "../images/post-edit.png"
import topic_create from "../images/topic-create.png"
import topic_edit from "../images/topic-edit.png"

import "./Create.css"

class Create extends Component {
    render () {
        return (
            <div className="create-box">
                <div className="create-category">
                    <p className="create-title">トピック</p>
                    <div className="create-category-box">
                        <Link to={"/action/topic/create"} className="create-elem">
                            <div className="create-elem-icon create-elem-0">
                                <img src={topic_create} className="create-elem-icon-img"/>
                            </div>
                            <p className="create-elem-title">新しいトピックを作成する</p>
                            <p className="create-elem-content">基本的なネットワーク機器に「ブリッジ」と「スイッチ」がある。ブリッジは同一ネットワーク内の2つのセグメントをつなぐために使われる。</p>
                            <div className="create-elem-fake-wrapper">
                                <div className="create-elem-fake">
                                    <p></p>
                                    <IoIosArrowRoundForward className="create-elem-arrow create-elem-img"/>
                                </div>
                            </div>
                        </Link>
                        <Link to={"/action/topic/edit"} className="create-elem">
                            <div className="create-elem-icon create-elem-1">
                                <img src={topic_edit} className="create-elem-icon-img"/>
                            </div>
                            <p className="create-elem-title">既存のトピックを編集する</p>
                            <p className="create-elem-content">基本的なネットワーク機器に「ブリッジ」と「スイッチ」がある。ブリッジは同一ネットワーク内の2つのセグメントをつなぐために使われる。</p>
                            <div className="create-elem-fake-wrapper">
                                <div className="create-elem-fake">
                                    <p></p>
                                    <IoIosArrowRoundForward className="create-elem-arrow create-elem-img"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="create-category">
                    <p className="create-title">ポスト</p>
                    <div className="create-category-box">
                        <Link to={"/action/post/create"} className="create-elem">
                            <div className="create-elem-icon create-elem-2">
                                <img src={post_create} className="create-elem-icon-img"/>
                            </div>
                            <p className="create-elem-title">新しいポストを作成する</p>
                            <p className="create-elem-content">基本的なネットワーク機器に「ブリッジ」と「スイッチ」がある。ブリッジは同一ネットワーク内の2つのセグメントをつなぐために使われる。</p>
                            <div className="create-elem-fake-wrapper">
                                <div className="create-elem-fake">
                                    <p></p>
                                    <IoIosArrowRoundForward className="create-elem-arrow create-elem-img"/>
                                </div>
                            </div>
                        </Link>
                        <Link to={"/action/post/edit"} className="create-elem">
                            <div className="create-elem-icon create-elem-3">
                                <img src={post_edit} className="create-elem-icon-img"/>
                            </div>
                            <p className="create-elem-title">既存のポストを編集する</p>
                            <p className="create-elem-content">基本的なネットワーク機器に「ブリッジ」と「スイッチ」がある。ブリッジは同一ネットワーク内の2つのセグメントをつなぐために使われる。</p>
                            <div className="create-elem-fake-wrapper">
                                <div className="create-elem-fake">
                                    <p></p>
                                    <IoIosArrowRoundForward className="create-elem-arrow create-elem-img"/>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create