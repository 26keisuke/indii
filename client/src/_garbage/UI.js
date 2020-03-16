// import React, { Component } from "react"
// import styled from "styled-components"
// import PropTypes from "prop-types"

// import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

// class UI extends Component {

//     // /api/feed 
//     renderFeed = () => {
//         return (
//             <SearchFeedWrapper className="search-box" onSearch={false}>
//                 <SearchOutlinedIcon className="search-icon" color="primary"/>
//                 { this.props.children }
//             </SearchFeedWrapper>
//         )
//     }

//     // api/action
//     renderAction = () => {
//         return (
//                     <div> 
//                         { showWarning && flag &&
//                         <Warning>
//                             <p>
//                                 既に{text}
//                                 <Link to={`/${content}/${warningId}`}>
//                                     "{value}"
//                                 </Link>
//                                 は存在しています。代わりに
//                                 <Link to={"/action/post/create"}>
//                                     新しいポスト
//                                 </Link>
//                                 を追加しますか？
//                             </p>
//                         </Warning>
//                         }
//                         { showWarning && !flag &&
//                         <Warning>
//                             <p>
//                                 {text}「{value}」はまだ作られていません。
//                                 <Link to={`/action/${content}/create`}>
//                                     新しく作成しますか？
//                                 </Link>
//                             </p>
//                         </Warning>
//                         }
//                         <p>{index}. {title}</p>
//                         {this.renderHelper()}
//                     </div> 
//                     <form onSubmit={(e) => formSubmit(e)}>
//                         <p>{ subTitle }</p>
//                         { flag
//                         ?
//                         <Autosuggest
//                             suggestions={suggestions}
//                             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//                             onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//                             getSuggestionValue={this.getSuggestionUniqueValue}
//                             renderSuggestion={this.renderUniqueSuggestion}
//                             onSuggestionSelected={this.onSuggestionUniqueSelected}
//                             inputProps={inputProps} 
//                         />
//                         :
//                         <Autosuggest
//                             suggestions={suggestions}
//                             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//                             onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//                             getSuggestionValue={this.getSuggestionMatchValue}
//                             renderSuggestion={this.renderMatchSuggestion}
//                             onSuggestionSelected={this.onSuggestionMatchSelected}
//                             inputProps={inputProps} 
//                         />
//                         }
//                         {this.props.search.actionFetching && 
//                             <EclipseWrapper>
//                                 <Eclipse>
//                                     <div></div>
//                                 </Eclipse>
//                             </EclipseWrapper>
//                         }
//                         {(!this.props.search.actionFetching && (mark === "GREEN")) && <GreenMark/>}
//                         {(!this.props.search.actionFetching && (mark === "RED")) && <RedMark/>}
//                     </form>
//         )
//     }

//     render () {
//         return(
//             <div>

//             </div>
//         )
//     }
// }

// UI.propTypes = {
//     // Controller上で与えられるもの
//     type: PropTypes.string,
//     theme: PropTypes.string,
//     children: PropTypes.object, // <Search {withEnhancedLogic by controller}/>が入る
//     blur: PropTypes.bool,
//     showWarning: PropTypes.bool,
//     isFetching: PropTypes.bool,

//     // UIで直接追加するもの
//     title: PropTypes.string,
//     message: PropTypes.string,
//     helper: PropTypes.string,
// }

// const SearchFeedWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     width:100%;
//     z-index: 1000;
//     max-width: 550px;
//     position: relative;

//     @media  only screen and (max-width: 670px) {
//         max-width: 300px !important;
//     }

//     & .react-autosuggest__input {
//         ${props => props.onSearch && css`
//             border: 0.5px solid #9EAEE6;
//             background-color: white;
//         `}
//     }
// `



// export default UI