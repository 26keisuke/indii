import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const FilterElement = styled.div`
    border-bottom: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
    border-right: 1px solid #d2d2d2;
    padding: 18px;
    margin-bottom: 40px;
`

const FilterSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 12px 0px;

    & > p {
        color: #3C3C3C;
    }
`

const Radio = styled.input`
    cursor: pointer;

    &:checked + label,
    &:not(:checked) + label
    {
        position: relative;
        padding-left: 30px;
        cursor: pointer;
        display: inline-block;
        color: #666;
    }
    &:checked + label:before,
    &:not(:checked) + label:before {
        content: '';
        position: absolute;
        left: 0;
        top: -10px;
        width: 16px;
        height: 16px;
        border: 1px solid #ddd;
        background: #fff;
    }
    &:checked + label:after,
    &:not(:checked) + label:after {
        content: '';
        width: 10px;
        height: 10px;
        background: #4CD964;
        position: absolute;
        top: -6px;
        left: 4px;
        border-radius: 100%;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }
    &:not(:checked) + label:after {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    &:checked + label:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    &:checked,
    &:not(:checked) {
        position: absolute;
        left: -9999px;
    }
`

const Title = styled.p`
    color: #1c1c1c;
    font-size:13px;
`

const Section = styled.form`
    margin-bottom: 20px;
`

class Filter extends Component {

    renderElement = () => {

        const elem = this.props.title.map((title,index) => 
            <Section key={title}>
                <Title>{title}</Title>
                {this.renderSection(title,index)}
            </Section>
        );

        return elem;
    };

    renderSection = (title,index) => {

        const sectionNames = this.props.section[index];

        const sections = sectionNames.map((section,idx) => 
            <FilterSection key={String(title)+String(idx)}>
                <p>{section}</p>
                <Radio type="radio" 
                    name={this.props.name[index]} 
                    id={String(title)+String(idx)} 
                    defaultChecked={idx === 0 ? true : false}
                />
                <label htmlFor={String(title)+String(idx)}/>
            </FilterSection>
        );

        return sections;
    };

    render() {
        return (
            <FilterElement>
                {this.renderElement()}
            </FilterElement>
        )
    }
}

Filter.propTypes = {
    title: PropTypes.arrayOf(PropTypes.string),
    section: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    name: PropTypes.arrayOf(PropTypes.string)
}


export default Filter