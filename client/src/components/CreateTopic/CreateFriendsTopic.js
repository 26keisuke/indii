import React, { Component } from "react"

import Autosuggest from "react-autosuggest";
import { IoMdClose } from "react-icons/io"
import { MdCheck } from "react-icons/md"

import Warning from "../Header/Search/Warning/Warning"

const topics = [
    {
        id: "12323",
        imgUrl: "",
        name: "飯塚啓介です。",
        job: "Chief株式会社 CEO"
    },
    {   
        id: "123123",
        imgUrl: "",
        name: "飯塚啓介",
        job: "Chief株式会社 CEO"
    },
    {
        id: "12123123",
        imgUrl: "",
        name: "飯塚啓介なのか",
        job: "Chief株式会社 CEO"
    },
    {
        id: "12333123",
        imgUrl: "",
        name: "飯塚啓介でした",
        job: "Chief株式会社 CEO"
    },
    {
        id: "1212343123",
        imgUrl: "",
        name: "飯塚啓介だと思います。",
        job: "Chief株式会社 CEO"
    }
]

const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = topics.filter(topic => regex.test(topic.name));
  
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

        if (suggestion.added) {
            return false;
        } 

        // WARNING: DONT USE this.state.suggestion since this is stale value. Use (suggestion)
        if(this.state.friends.length > 0　&& this.state.suggestions.length > 0){
            var flag = this.checkForDuplicates(suggestion)
        }

        return (
            <div key={suggestion.id} className="topic-form-friends-search-wrapper">
                <img className="topic-form-friends-search-img" src={suggestion.imgUrl}/>
                <div className="topic-form-friends-search">
                    <p className="topic-form-friends-name">{suggestion.name}</p>
                </div>
                <p className="topic-form-friends-job">{suggestion.job}</p>
                <div className={ flag ? "topic-form-friends-check-green" : "topic-form-friends-check"}>
                    <MdCheck className={ flag ? "topic-form-friends-check-icon" : "topic-form-friends-check-icon hide"}/>
                </div>
            </div>
        )
    };

    renderWarning = (flag) => {
        switch(flag){
            case "limit":
                return (
                    <Warning>
                        <p>
                            招待できるフォロワーの上限は{this.props.max}人までです。
                        </p>
                    </Warning>
                )
            case "sameVal":
                return (
                    <Warning>
                        <p>
                            既に同じ招待リストに追加されています。
                        </p>
                    </Warning>
                )
            default:
                return false;
        }
    }

    onSuggestionsFetchRequested = ({ value }) => {
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
    // Also this function is reaking the immutability constraint!!
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
                if(suggestion.id == friend.id){
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
            <div key={friend.id} className="topic-form-friends-wrapper">
                <div className="topic-form-friends-close">
                    <IoMdClose onClick={() => this.deleteFromList(friend.id)} className="topic-form-friends-close-icon"/>
                </div>
                <img src={friend.imgUrl} onClick={() => this.deleteFromList(friend.id)} className="topic-form-friends-person"/>
            </div>
        );
        return target;
    };

    render() {

        const inputProps = {
            placeholder: "ユーザー名で検索...",
            value: this.state.value,
            onChange: this.onChange,
        };

        const max = this.props.max

        return (
            <div className="topic-form-area y-scrollable">
                <div className={this.props.back ? "topic-form-area-wrapper-enter" : "topic-form-area-wrapper-show"}>
                    <div className="topic-form-area-top"> 
                        {this.state.friends.length < max && this.state.flag ? this.renderWarning("sameVal"): ""}
                        {this.state.limit ? this.renderWarning("limit") : ""}
                        <p className="topic-form-area-top-title">4. フォロワーを招待<span>*任意</span></p>
                    </div> 
                    <form onSubmit={this.formSubmit} className="topic-form-area-middle">
                        <p className="topic-form-area-input-title">フォロワーを検索</p>
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
                    <div className="topic-form-button">
                        <button className="topic-form-button-left" onClick={this.handleBack}>戻る</button>
                        <button 
                            className="topic-form-button-right" 
                            onClick={this.handleForward}
                        >
                                次へ進む
                        </button>
                    </div>
                    <p className="topic-form-friends-title">招待リスト</p>
                    <div className="topic-form-friends">
                        {this.renderFriends()}
                    </div>
                    <div className="space"/>
                </div>
            </div>
        )
    }
}

export default CreateFriendsTopic;