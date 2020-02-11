// <CardElement key={index} to={url}>
//     <CardIconBox color={this.props.color[index]}>
//         <img src={this.props.img[index]} alt="各Action項目を識別する画像"/>
//     </CardIconBox>
//     <p>{this.props.title[index]}</p>
//     <p>{this.props.description[index]}</p>
//     <ArrowWrapper>
//         <div>
//             <Arrow/>
//             <p></p>
//         </div>
//     </ArrowWrapper>
// </CardElement>


// const CardElement = styled(Link)`
//     border: 1px solid #d2d2d2;
//     padding: 15px 20px;
//     padding-top: 23px;
//     width: 250px;
//     height: 150px;
//     margin: 10px;
//     flex-shrink: 0;
//     border-radius: 10px;
//     cursor: pointer;
//     position: relative;

//     &:hover {
//         box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
//         transition: box-shadow 0.2s ease;
//     }

//     & p:nth-child(2){
//         color: #4B4B4B;
//         font-size: 15px;
//         margin-bottom: 7px;
//     }

//     & p:nth-child(3){
//         font-size: 10px;
//     }
// `

// const CardIconBox = styled.div`
//     width: 46px;
//     height: 46px;
//     margin-bottom: 10px;
//     margin-left: 5px;
//     border-radius: 5px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: ${ props => props.color ? props.color : "#636480"};

//     & > img {
//         width: 30px;
//         height: 30px;
//     }
// `

// const ArrowWrapper = styled.div`
//     position: absolute;
//     top: -10px;
//     right: 0px;

//     & > div {
//         position: relative;
//     }
// `

// const Arrow = styled(IoIosArrowRoundForward)`
//     width: 13px;
//     height: 13px;
//     margin-right: 6px;
//     pointer-events: none;
//     transform: scale(1.6);

//     & + p {
//         position: absolute;
//         right: 15px;
//         top: 34px;
//         width: 40px;
//         height: 40px;
//         display: block;
//         cursor: pointer;

//         &::before{
//             content: "";
//             display: none;
//             background-color: #1C1C1C;
//             opacity: 0.1;
//             border-radius: 100%;
//             width: 40px;
//             height: 40px;
//         }

//         &:hover::before {
//             display: block;
//         }
//     }
// `
