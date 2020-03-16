// ====バグ====
// EditPostでPreviewまで行って最初まで戻ると、最初のスライドのアニメーションが効かない
// 同じように、CreatePostでスライド1から2に移る時に2の最初のrenderMarkやrenderWarningが効かない
// ============

// 将来的には、getSuggestionの中のreturn [{added: true}]の部分を再考する。ここのせいでより複雑になっている

import React, { Component } from "react";
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import Autosuggest from "react-autosuggest";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux"

import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

import { IoIosAddCircleOutline } from "react-icons/io";

import Topic from "../../Search/Suggestion/Topic";
import Post from "../../Search/Suggestion/Post";
import New from "../../Search/Suggestion/New"
import Warning from "../../Search/Warning/Warning"

import * as actions from "../../../actions"

import { Box, BoxTransition, GreenMark, RedMark, Owner, OwnerIcon, Eclipse, EclipseWrapper } from "../Element/Element"
import { ButtonWrapper, ButtonLeft, } from "../Element/TwoButtons"

import getSuggestions from "../../__Mock__/method/getSuggestions"

// 将来的には、一定時間Inputがなければ、renderMarkとrenderWarningをするようにする
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
            onSearch: false,
            showWarning: false,
            warningId: "",
            text: "",
            mark: "",
        };
    };

    componentDidMount() {
        if (this.props.content === "Topic") {
            this.setState({ text: "トピック" })
        } else if (this.props.content === "Post") {
            this.setState({ text: "ポスト" })
        }
    }
    
    componentDidUpdate(prevProps, prevState) {

        const flag = this.props.type === "Unique"
        const renderWarning = flag ? this.renderUniqueWarning : this.renderMatchWarning;
        const renderMark = flag ? this.renderUniqueMark : this.renderMatchMark

        if (prevProps.storage !== this.props.storage){ // Selectが二回続いた時（ページを超えて）stateは初期化されない（constructorが呼ばれない）valueを初期化しなくてはいけない
            this.setState({
                suggestions: [],
                value: localStorage.getItem(this.props.storage) || "",
                showWarning: false,
                mark: "",
            }, () => {
                if(this.state.value){
                    if(this.props.content === "Topic") {
                        this.props.searchTopic(this.props.type, this.state.value)  
                    } else if (this.props.content === "Post") {
                        this.props.searchPost(this.props.type, this.state.value, this.props.topicId)
                    }
                    renderWarning();
                    renderMark();
                } else {
                    this.setState({ showWarning: false })
                    this.setState({ mark: "" })
                }
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

        // もしsuggetionが変わった時だけ、renderWarningとrenderMarkをする
        if(prevState.suggestions !== this.state.suggestions) { renderWarning(); renderMark(); }

        // valueがゼロの時もprevState.suggestions === this.state.suggestionsなので直接setstateする必要がある
        if(prevState.value && !this.state.value) { 
            setTimeout(() => {
                this.setState({ showWarning: false })
                this.setState({ mark: "" })
            }, 800) 
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
            showWarning: false,
            mark: "", // ここでもshowWarningを消している理由は、すぐにwarningを消すことでユーザーの不快感をなくすため
        });
        localStorage.setItem(this.props.storage, newValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        if(!this.props.data) {
            if(this.props.content === "Topic") {
                this.props.searchFetching("ACTION", true)
                this.props.searchTopic(this.props.type, value)  
            } else if (this.props.content === "Post") {
                this.props.searchFetching("ACTION", true)
                this.props.searchPost(this.props.type, value, this.props.topicId)  // topicIdがある場合はtopic内で検索される
            }
        } else {
            this.setState({
                suggestions: getSuggestions(value, this.props.type, this.props.data, this.props.searchByVariable)
            });
        }
    };

    // onBlurの時どうするかMethod => なにもしない
    onSuggestionsClearRequested = () => {};

    handleFocus = () => {
        if(this.props.searchBox) {
            this.setState({onSearch: true})
            return
        }

        this.setState({
            blur: false
        });
    };

    handleBlur = () => {
        if(this.props.searchBox) {
            this.setState({onSearch: false})
            return
        }

        this.setState({
            blur: true
        });
    };

    handleBack = () => {
        this.props.setBackward(true);
        switch (this.props.index) {
            case "1":
                return
            case "2":
                this.props.setStep(0);
                return
            default:
                return
        }
    }

    handleClick = (suggestion) => {

        if(this.props.searchBox) {
            return this.props.searchTerm(suggestion)
        }

        if(this.props.type === "Unique"){
            if(this.state.suggestions.length === 0 || !this.state.suggestions[0].added){ 
                return;
            }
        }

        this.props.setBackward(false);

        switch (this.props.index) {
            case "1":
                this.props.setStep(1);
                break
            case "2":
                this.props.setStep(2);
                break
            default:
                return;
        }

        this.props.setValue(suggestion);
    };

    renderUniqueMark = () =>{
        if(this.state.blur) {
            return;
        } else {
            if(this.state.value) {
                setTimeout(() => {
                    if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                        this.setState({ mark: "GREEN" })
                    } else {
                        this.setState({ mark: "RED" })
                    };
                },800)
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
        if (suggestion.added) {
            return (
                <New
                    handleClick={this.handleClick}
                    text={[`新しい${this.state.text}`,"を追加する"]}
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
                    // target={this.props.searchByVariable}
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

    renderBoxSuggestion = suggestion => {
        if (suggestion.added) {
            return (
                <New
                    url="/search/from_direct"
                    text={["", "を検索する"]}
                    value={this.state.value}
                    handleClick={this.handleClick}
                >
                    <SearchOutlinedIcon color="primary" fontSize="small"/>
                </New>
            );
        }
        return (
            <Topic
                url="/search/from_suggestion"
                handleClick={this.handleClick}
                suggestion={suggestion}
                // target={this.props.searchByVariable}
            />
        )
    }

    // Warningを出す動作 setTimeoutを設けてるのは、flickering effectをなくすため
    renderUniqueWarning = () => {
        if(this.state.blur) {
            return;
        } else {
            setTimeout(() => {
                if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){ 
                    return;
                } else {
                    if(this.state.suggestions.length !== 0){
                        this.setState({ 
                            showWarning: true,
                            warningId: this.state.suggestions[0]._id
                        })
                    }
                    return;
                };
            }, 800)
        };
    };

    renderMatchWarning = () => {
        if(this.state.blur) {
            return;
        } else {
            setTimeout(() => {
                if(this.state.suggestions.length > 0){ 
                    if(this.state.showWarning){
                        this.setState({ 
                            showWarning: false,
                        });
                    }
                    return;
                } else {
                    this.setState({ 
                        showWarning: true,
                    });
                    return;
                };
            }, 800)
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

        if(this.state.value) {
            if(this.state.suggestions.length > 0 && this.state.suggestions[0].added){
                this.handleClick(this.state.value);
                return;
            }
        };
    };

    formMatchSubmit = (e) => {
        e.preventDefault();
    }

    formBoxSubmit = (e) => {
        e.preventDefault();
        this.handleClick(this.state.value); 
        this.props.history.push("/search/from_form")
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
                return;
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

        const { content, placeholder, type, searchBox, back, transition, index, title, subTitle, } = this.props
        const { mark, text, value, suggestions, showWarning, warningId, onSearch } = this.state

        const inputProps = {
            placeholder,
            value,
            onChange: this.onChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
        };

        const flag = type === "Unique"

        const formSubmit = flag ? this.formUniqueSubmit : this.formMatchSubmit

        if (searchBox) {
            return (
                <SearchBox className="search-box" onSubmit={(e) => this.formBoxSubmit(e)} isSearching={onSearch}>
                    <SearchOutlinedIcon className="search-icon" color="primary"/>
                    <Autosuggest
                        className="search-input" 
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionUniqueValue}
                        renderSuggestion={this.renderBoxSuggestion}
                        inputProps={inputProps} 
                    />
                </SearchBox>
            )
        } else {

            return ( 
                <Box>
                    <BoxTransition back={back} transition={transition}>
                        <div> 
                            { showWarning && flag &&
                            <Warning>
                                <p>
                                    既に{text}
                                    <Link to={`/${content}/${warningId}`}>
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
                            { showWarning && !flag &&
                            <Warning>
                                <p>
                                    {text}「{value}」はまだ作られていません。
                                    <Link to={`/action/${content}/create`}>
                                        新しく作成しますか？
                                    </Link>
                                </p>
                            </Warning>
                            }
                            <p>{index}. {title}</p>
                            {this.renderHelper()}
                        </div> 
                        <form onSubmit={(e) => formSubmit(e)}>
                            <p>{ subTitle }</p>
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
                            {this.props.search.actionFetching && 
                                <EclipseWrapper>
                                    <Eclipse>
                                        <div></div>
                                    </Eclipse>
                                </EclipseWrapper>
                            }
                            {(!this.props.search.actionFetching && (mark === "GREEN")) && <GreenMark/>}
                            {(!this.props.search.actionFetching && (mark === "RED")) && <RedMark/>}
                        </form>
                        {this.renderButton()}
                    </BoxTransition>
                </Box>
            )
        }
    }
}

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    width:100%;
    z-index: 1000;
    max-width: 550px;
    position: relative;

    @media  only screen and (max-width: 670px) {
        max-width: 300px !important;
    }

    & .react-autosuggest__input {
        ${props => props.isSearching && css`
            border: 0.5px solid #9EAEE6;
            background-color: white;
        `}
    }

`



function mapStateToProps(state) {
    return {
        topic: state.topic,
        post: state.post,
        search: state.search,
    }
}

export default connect(mapStateToProps, actions)(withRouter(Select));