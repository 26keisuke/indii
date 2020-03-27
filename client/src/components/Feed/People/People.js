import React from "react"
import styled from "styled-components"

import Element from "./Element/Element";

const FeedInsideHeader = styled.div`
    height: 40px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding-left: 35px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;

    & > p {
        font-size: 14px;
    }
`

const PeopleWrapper = styled.div`
    border-bottom: 1px solid #eaeaea;
    background-color: #ffffff;
`

const People = ({ user }) => {

    if(!user) return null

    return (
        <div>
            <FeedInsideHeader>
                <p>おすすめのライター</p>
            </FeedInsideHeader>
            <PeopleWrapper>
                {
                    user.map(elem => 
                        <Element
                            id={elem._id} 
                            img={elem.photo} 
                            name={elem.userName} 
                            job={elem.comment} 
                            intro={elem.intro}
                        />
                    )
                }
            </PeopleWrapper>
        </div>
    )
}

export default People