// import React, { Component } from "react";
// import axios from "axios"

// import Autosuggest from "react-autosuggest";
// import { Link } from "react-router-dom";

// import Topic from "./Header/Search/Suggestion/Topic";
// import Warning from "./Header/Search/Warning/Warning"

// import { Box, BoxTransition } from "../Action/Element/Box"

// import topics from "./__Mock__/data/topic"
// import getSuggestions from "./__Mock__/method/getSuggestions"

// class ActionDecideTopic extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             value: localStorage.getItem(this.props.storage) || "",
//             suggestions: [],
//             blur: true,
//             end: false,
//         };
//     };

//     handleClick = (suggestion) => {
//         this.setState({
//             blur: true,
//             end: true,
//         });
//         this.props.setBackward(false);
//         this.props.setStep(1);
//         this.props.setTopic(suggestion);
//     };

//     onChange = (event, { newValue }) => {
//         this.setState({
//             value: newValue
//         });
//         localStorage.setItem(this.props.storage, newValue);
//     };

//     getSuggestionValue = suggestion => {
//         return suggestion.name;
//     };

//     renderSuggestion = suggestion => {
//         return (
//             <Topic
//                 handleClick={this.handleClick}
//                 suggestion={suggestion}
//                 target="name"
//             />
//         )
//     };

//     renderWarning = () => {
//         if(!this.state.value || this.state.blur) {
//             return false;
//         } else {
//             const success = () => {return false}
//             const fail = () => {
//                 return (
//                     <Warning>
//                         <p>
//                             トピック「{this.state.value}」はまだ作られていません。<Link to={"/action/topic/create"}>新しく作成しますか？</Link>
//                         </p>
//                     </Warning>
//                 )
//             };
//             if(this.state.value) {
//                 if(this.state.suggestions.length > 0){ 
//                     return success();
//                 } else {
//                     return fail();
//                 };
//             };
//         };
//     };

//     onSuggestionsFetchRequested = ({ value }) => {
//         this.setState({
//           suggestions: getSuggestions(value, "Match", topics, "name")
//         });
//     };

//     onSuggestionsClearRequested = () => {
//         this.setState({
//           suggestions: []
//         });
//     };

//     onSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
//         if(this.state.suggestions.length > 0){ 
//             this.handleClick(suggestion)
//         } 
//     };
    
//     handleBlur = () => {
//         this.setState({
//             blur: true
//         });
//     };

//     handleFocus = () => {
//         this.setState({
//             blur: false
//         });
//     };

//     formSubmit = (e) => {
//         e.preventDefault();
//     }

//     render() {

//         const { value, suggestions } = this.state;
//         const inputProps = {
//             placeholder: "トピック名を入力...",
//             value,
//             onChange: this.onChange,
//             onFocus: this.handleFocus,
//             onBlur: this.handleBlur,
//         };

//         return (
//             <Box>
//                 <BoxTransition back={this.props.back}>
//                     <div> 
//                         {this.renderWarning()}
//                         <p>1. トピックを選択してください</p>
//                     </div> 
//                     <form onSubmit={(e) => this.formSubmit(e)}>
//                         <p>トピック名</p>
//                         <Autosuggest
//                             suggestions={suggestions}
//                             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//                             onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//                             getSuggestionValue={this.getSuggestionValue}
//                             renderSuggestion={this.renderSuggestion}
//                             onSuggestionSelected={this.onSuggestionSelected}
//                             inputProps={inputProps} 
//                         />
//                     </form>
//                 </BoxTransition>
//             </Box>
//         )
//     }
// }

// export default ActionDecideTopic;