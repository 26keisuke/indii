// ====バグ====
// EditPostでPreviewまで行って最初まで戻ると、最初のスライドのアニメーションが効かない
// 同じように、CreatePostでスライド1から2に移る時に2の最初のrenderMarkやrenderWarningが効かない
// ============

// 将来的には、getSuggestionの中のreturn [{added: true}]の部分を変える。ここのせいでより複雑になっている

import React, { Component } from "react";
import PropTypes from "prop-types"
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import { connect } from "react-redux"

import { IoIosAddCircleOutline } from "react-icons/io";

import Topic from "../../Search/Suggestion/Topic";
import Post from "../../Search/Suggestion/Post";
import New from "../../Search/Suggestion/New"
import Warning from "../../Search/Warning/Warning"

import * as actions from "../../../actions"

import { Box, BoxTransition, GreenMark, RedMark, Owner, OwnerIcon, ButtonWrapper, ButtonLeft } from "../Element/Box"

import getSuggestions from "../../__Mock__/method/getSuggestions"

class Select extends Component {

    // ======================================================
    // ほとんど全てに共通していて、Dynamically Adjustしなくて良い範囲
    // ======================================================

    constructor(props){
        super(props)
        this.state = {
            value: localStorage.getItem(this.props.storage) || "",
            suggestions: [],
            blur: true,
        };
    };

    // Selectが二回続いた時（ページを超えて）stateは初期化されない（constructorが呼ばれない）valueを初期化しなくてはいけない
    componentDidUpdate = (prevProps) => {
        if (prevProps.storage !== this.props.storage){
            this.setState({
                value: localStorage.getItem(this.props.storage) || ""
            })
        } else if(prevProps.topic.search !== this.props.topic.search) {
            this.setState({
                suggestions: this.props.topic.search,
            })
        } else if(prevProps.post.search !== this.props.post.search) {
            this.setState({
                suggestions: this.props.post.search,
            })
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        localStorage.setItem(this.props.storage, newValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if(!this.props.data) {
            if(this.props.content === "Topic") {
                this.props.searchTopic(this.props.type, value)  
            } else if (this.props.content === "Post") {
                this.props.searchPost(this.props.type, value)  
            }
        } else {
            this.setState({
                suggestions: getSuggestions(value, this.props.type, this.props.data, this.props.searchByVariable)
            });
        }
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    handleBlur = () => {
        this.setState({
            blur: true
        });
    };

    handleFocus = () => {
        this.setState({
            blur: false
        });
    };

    handleBack = () => {
        this.props.setBackward(true);
        switch (this.props.index) {
            case "1":
                break
            case "2":
                this.props.setStep(0);
                break
            default:
                return null;
        }
    }

    handleClick = (suggestion) => {
        if(this.props.type === "Unique"){
            if(this.state.suggestions.length === 0 || !this.state.suggestions[0].added){ 
                return null;
            }
        }
        this.setState({
            blur: true,
        });
        this.props.setBackward(false);
        switch (this.props.index) {
            case "1":
                this.props.setStep(1);
                break
            case "2":
                this.props.setStep(2);
                break
            default:
                return null;
        }
        this.props.setValue(suggestion);
    };

    renderUniqueMark = () =>{
        if(!this.state.value || this.state.blur) {
            return null;
        } else {
            const success = () => {return <GreenMark/>}
            const fail = () => {return <RedMark/>}
            if(this.state.value) {
                if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                    return success();
                } else {
                    return fail();
                };
            };
        };
    };

    renderMatchMark = () =>{
        return ""
    };

    // suggestionを上下キーでホバーしている時
    getSuggestionUniqueValue = suggestion => {
        if (suggestion.added) {
          return this.state.value;
        }
        return suggestion[this.props.searchByVariable];
    };

    getSuggestionMatchValue = suggestion => {
        return suggestion[this.props.searchByVariable];
    };

    // Suggestionをrenderする時の動作
    renderUniqueSuggestion = suggestion => {
        var words = ""
        if(this.props.content === "Topic") {
            words = "トピック"
        } else if (this.props.content === "Post") {
            words = "ポスト"
        }
        if (suggestion.added) {
            return (
                <New
                    handleClick={this.handleClick}
                    text={[`新しい${words}`,"を追加する"]}
                    value={this.state.value}
                >
                    <IoIosAddCircleOutline/>
                </New>
            );
        };
        if (this.props.content === "Topic") {
            return (
                <Topic
                    handleClick={this.handleClick}
                    suggestion={suggestion}
                    target={this.props.searchByVariable}
                />
            );
        } else if (this.props.content === "Post") {
            return (
                <Post
                    suggestion={suggestion}
                />
            );
        }
    };

    renderMatchSuggestion = suggestion => {
        if(this.props.content === "Topic") {
            return (
                <Topic
                    handleClick={this.handleClick}
                    suggestion={suggestion}
                    target={this.props.searchByVariable}
                />
            )
        } else if (this.props.content === "Post") {
            return (
                <Post
                    suggestion={suggestion}
                />
            )
        }
    };

    // Warningを出す動作
    renderUniqueWarning = () => {
        if(!this.state.value || this.state.blur) {
            return null;
        } else {
            var text = ""
            if (this.props.content === "Topic") {
                text = "トピック"
            } else if (this.props.content === "Post") {
                text = "ポスト"
            }
            const success = () => { return null; }
            const fail = () => {
                return (
                    <Warning>
                        <p>
                            既に{text}<Link to={"/"}>"{this.state.value}"</Link>は存在しています。代わりに<Link to={"/action/post/create"}>新しいポスト</Link>を追加しますか？
                        </p>
                    </Warning>
                )
            };
            if(this.state.value) {
                if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                    return success();
                } else {
                    return fail();
                };
            };
        };
    };

    renderMatchWarning = () => {
        if(!this.state.value || this.state.blur) {
            return false;
        } else {
            const success = () => {return false}
            const fail = () => {
                return (
                    <Warning>
                        <p>
                            トピック「{this.state.value}」はまだ作られていません。<Link to={"/action/topic/create"}>新しく作成しますか？</Link>
                        </p>
                    </Warning>
                )
            };
            if(this.state.value) {
                if(this.state.suggestions.length > 0){ 
                    return success();
                } else {
                    return fail();
                };
            };
        };
    };

    onSuggestionUniqueSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
            this.handleClick(this.state.value);
        } else {
            this.setState({
                value: suggestion[this.props.searchByVariable],
            });
        };   
    };

    onSuggestionMatchSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if(this.state.suggestions.length > 0){ 
            this.handleClick(suggestion)
        } 
    };

    // Enter keyを押した時の動作
    formUniqueSubmit = (e) => {
        e.preventDefault();
        const success = () => this.handleClick(this.state.value);
        const fail = () => { return null; }

        if(this.state.value) {
            if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                return success();
            } else {
                return fail();
            };
        };
    };

    formMatchSubmit = (e) => {
        e.preventDefault();
    }

    renderHelper = () => {
        switch (this.props.helper){
            case "owner":
                return (
                    <Owner>
                        <OwnerIcon/>
                        <p>: オーナーが最終確認するポスト</p>
                    </Owner>
                )
            default:
                return null;
        }
    }

    renderButton = () => {
        if (this.props.index !== "1") {
            return (
                <ButtonWrapper>
                    <ButtonLeft onClick={this.handleBack}>戻る</ButtonLeft>
                </ButtonWrapper>
            )
        }
    }

    render () {

        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        };

        const flag = this.props.type === "Unique"

        const formSubmit = flag ? this.formUniqueSubmit : this.formMatchSubmit
        const renderWarning = flag ? this.renderUniqueWarning : this.renderMatchWarning
        const renderMark = flag ? this.renderUniqueMark : this.renderMatchMark

        return ( 
            <Box>
                <BoxTransition back={this.props.back} transition={this.props.transition}>
                    <div> 
                        {renderWarning()}
                        <p>{this.props.index}. {this.props.title}</p>
                        {this.renderHelper()}
                    </div> 
                    <form onSubmit={(e) => formSubmit(e)}>
                        <p>{ this.props.subTitle }</p>
                        { flag
                        ?
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionUniqueValue}
                            renderSuggestion={this.renderUniqueSuggestion}
                            onSuggestionSelected={this.onSuggestionUniqueSelected}
                            inputProps={inputProps} 
                        />
                        :
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionMatchValue}
                            renderSuggestion={this.renderMatchSuggestion}
                            onSuggestionSelected={this.onSuggestionMatchSelected}
                            inputProps={inputProps} 
                        />
                        }
                        {renderMark()}
                    </form>
                    {this.renderButton()}
                </BoxTransition>
            </Box>
        )
    }
}

Select.propTypes = {
    placeholder: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, // Match || Unique
    content: PropTypes.string.isRequired, // Topic || Post
    helper: PropTypes.string,
    transition: PropTypes.bool,
    data: PropTypes.object.isRequired, // Mock DataでもOK
    searchByVariable: PropTypes.string.isRequired,
    storage: PropTypes.string,
    back: PropTypes.bool,
    setBackward: PropTypes.func,
    setValue: PropTypes.func,
    setStep: PropTypes.func,
}


function mapStateToProps(state) {
    return {
        topic: state.topic,
        post: state.post,
    }
}

export default connect(mapStateToProps, actions)(Select);