import React, { Component } from "react"
import styled from "styled-components"
import axios from "axios"

import Autosuggest from "react-autosuggest";
import { IoMdClose } from "react-icons/io"
import { MdCheck } from "react-icons/md"

import Warning from "../../../Header/Search/Warning/Warning"

import { Box, BoxTransition, ButtonWrapper, ButtonLeft, ButtonRight } from "../../Element/Box"

import friends from "../../../__Mock__/data/friend"

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = friends.filter(friend => regex.test(friend.name));
  
  if (suggestions.length === 0) {
    return [
      { added: true } 
    ];
  }
  
  return suggestions;
}

class CreateFriendsTopic extends Component {

    constructor(props){
        super(props)
        this.state = {
            value: "",
            suggestions: [],
            friends: [],
            flag: "",
            duplicates: [],
            limit: false
        };
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
            flag: false
        });
    };

    getSuggestionValue = suggestion => {
        if (suggestion.added) {
          return this.state.value;
        }
        return suggestion.name;
    };

    renderSuggestion = suggestion => {

        if (suggestion.added) { return false; } 

        // WARNING: DONT USE this.state.suggestion since this is stale value. Use (suggestion)
        if(this.state.friends.length > 0　&& this.state.suggestions.length > 0){
            var flag = this.checkForDuplicates(suggestion)
        }

        return (
            <FriendSearch key={suggestion.id}　checked={flag}>
                <img src={suggestion.imgUrl} alt={"友達検索結果の参考画像"}/>
                <div>
                    <p>{suggestion.name}</p>
                </div>
                <p>{suggestion.job}</p>
                <div>
                    <CheckIcon checked={flag}/>
                </div>
            </FriendSearch>
        )
    };

    renderWarning = (flag) => {
        switch(flag){
            case "limit":
                return (
                    <Warning>
                        <p>招待できるフォロワーの上限は{this.props.max}人までです。</p>
                    </Warning>
                )
            case "sameVal":
                return (
                    <Warning>
                        <p>既に同じ招待リストに追加されています。</p>
                    </Warning>
                )
            default:
                return false;
        }
    }

    onSuggestionsFetchRequested = ({ value }) => {

        axios.get(`/api/friend/${value}`)
        .then(res => {
            console.log(res)
        })



        this.setState({
          suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        if (this.state.friends.length >= this.props.max){
            this.setState({limit: true})
            return false
        }
        this.setState({limit: false})
        this.setState({
            value: ""
        });
        const res = this.state.friends.filter((friend) => {
            return friend.id === suggestion.id
        })
        if(res.length > 0){
            this.setState({flag: true})
        } else {
            this.setState({
                friends: [...this.state.friends, suggestion]
            })
        }
    };

    // simply checking for lowercase duplicates might not be the best idea.
    // some terms may have different meanings based on capitalization.
    // Also this function is breaking the immutability constraint!!
    deleteFriend = (e) => {
        const html = e.target.innerHTML;
        const res = this.state.tags.filter((tag) => 
            tag.toLowerCase() !== html.toLowerCase()
        );
        this.setState({
            tags: res
        });
    };

    checkForDuplicates = (suggestion) => {
        var isDuplicate = false;
        const friends = this.state.friends;
        if(suggestion){
            friends.forEach(function(friend){
                if(suggestion.id === friend.id){
                    isDuplicate = true;
                } ;
            });
        };
        return isDuplicate;
    };

    handleBack = () => {
        this.props.setBackward(true);
        this.props.setStep(2);
    }   

    handleForward = () => {
        this.props.setBackward(false);
        this.props.setStep(4);
        this.props.setFriends(this.state.friends);
    }

    formSubmit = (e) => {
        e.preventDefault();
    };

    deleteFromList = (id) => {
        const res = this.state.friends.filter((friend) => 
            friend.id !== id
        );
        this.setState({
            friends: res
        });
    }

    renderFriends = () => {
        const target = this.state.friends.map(friend => 
            <FriendElement key={friend.id}>
                <div>
                    <CloseIcon onClick={() => this.deleteFromList(friend.id)}/>
                </div>
                <img 
                    src={friend.imgUrl} 
                    onClick={() => this.deleteFromList(friend.id)} 
                    alt={"選んだ友達の画像"}
                />
            </FriendElement>
        );
        return target;
    };

    render() {

        const inputProps = {
            placeholder: "ユーザー名で検索...",
            value: this.state.value,
            onChange: this.onChange,
        };

        return (
            <Box>
                <BoxTransition back={this.props.back} transition={true}>
                    <div> 
                        {this.state.friends.length < this.props.max && this.state.flag ? this.renderWarning("sameVal"): ""}
                        {this.state.limit ? this.renderWarning("limit") : ""}
                        <p>4. フォロワーを招待<span>*任意</span></p>
                    </div> 
                    <form onSubmit={this.formSubmit}>
                        <p>フォロワーを検索</p>
                        <Autosuggest
                            className="topic-form-area-search" 
                            suggestions={this.state.suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            onSuggestionSelected={this.onSuggestionSelected}
                            inputProps={inputProps} 
                        />
                    </form>
                    <ButtonWrapper>
                        <ButtonLeft onClick={this.handleBack}>戻る</ButtonLeft>
                        <ButtonRight onClick={this.handleForward}>次へ進む</ButtonRight>
                    </ButtonWrapper>
                    <FriendTitle>招待リスト</FriendTitle>
                    <FriendBox>
                        {this.renderFriends()}
                    </FriendBox>
                    <div className="space"/>
                </BoxTransition>
            </Box>
        )
    }
}

const FriendTitle = styled.div`
    margin-left: 9px;
    margin-top: 20px;
    color: #333333;
`

const FriendBox = styled.div`
    width: 420px;
    border-top: 0.5px solid #d2d2d2;
    height: 135px;
    padding: 15px;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const FriendElement = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    margin: 10px;

    & > div {
        position: absolute;
        right: 1px;
        top: -7px;
        width:16px;
        height:16px;
        background-color: white;
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
        border-radius: 100%;
    }

    & > img {
        width: 42px;
        height: 42px;
        border-radius: 5px;
        object-fit: cover;
        cursor: pointer;
    }
`

const CloseIcon = styled(IoMdClose)`
    margin-left: 2.5px;
    margin-top: 1.5px;
    transform: scale(1.2);
    cursor: pointer;
`

const FriendSearch = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    padding-bottom: 8px;
    padding-top: 8px;
    position: relative;

    & > img {
        width: 34px;
        height: 34px;
        border: 1px solid black;
        margin-right: 10px;
    }

    & > div:nth-child(2) {
        width: auto;
        padding: 0px 20px;

        & > p {
            width: 160px;
            font-size: 12px;
        }
    }

    & > p {
        font-size: 11px;
        width: 140px;
        color: #606060;
    }

    & > div:nth-child(4) {
        border: ${props => props.checked ? "0.5px solid #4CD964" : "0.5px solid #a5a5a5"};
        width: 30px;
        height: 30px;
        position: absolute;
        right:20px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const CheckIcon = styled(MdCheck)`
    transform: scale(1.3);
    color: #4CD964;
    opacity: ${props => props.checked ? 1 : 0};
    
`

export default CreateFriendsTopic;