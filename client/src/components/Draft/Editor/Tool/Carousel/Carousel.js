import React from "react"
import styled, { css, keyframes } from "styled-components"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ list, getState, state, setToggle }) => {

    const renderCarousel = () => {
        const res = list.map((name,index) => {
            return (
                <RefToggle key={name} selected={getState("toggle") === state[index]} onClick={() => setToggle(state[index])}>
                    <div>
                        <p>{name}</p>
                        <div/>
                    </div>
                </RefToggle>
            )
        })   

        return res
    }

    const settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
    };

    return (
        <SliderWrapper>
            <Slider beforeChange={(_, newIndex) => setToggle(state[newIndex])} {...settings}>
                {renderCarousel()}
            </Slider>
        </SliderWrapper>
    )
}

const SliderWrapper = styled.div`
    padding: 0px 25px;
    padding-top: 6px;

    & div {
        outline: none !important;
    }

    & .slick-prev{
        &:before{
            font-size: 15px;
            color: ${props => props.theme.primary};
        }
    }

    & .slick-next{
        &:before{
            font-size: 15px;
            color: ${props => props.theme.primary};
        }
    }
`

const RefToggle = styled.div`
    width: 60px;
    flex-shrink: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 10px;

    & > div {

        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        & > p {
            white-space: nowrap;
            text-align: center;
            font-size: 11px;
            z-index: 1;

            ${props => props.selected 
            ? css`
                color: white;
            `
            : css`
                color: #8D8D8D;
            `}
        }

        & > div {
            ${props => props.selected && css`
                background-color: ${props => props.theme.secondary};
                opacity: 0.6;
                border-radius: 2px;
                position: absolute;
                width: 85%;
                height: 16px;
                animation-name: ${extend};
                animation-duration: 175ms;
                animation-timing-function: ease-in-out;
            `}
        }

    }
`

const extend = keyframes`
    from {
        width: 10px;
        opacity: 0;
    } to {
        width: 100%;
        opacity: 0.6;
    }
`

export default Carousel