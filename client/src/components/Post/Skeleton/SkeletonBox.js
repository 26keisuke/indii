import React, { Component } from "react"
import styled from "styled-components"
import Skeleton from 'react-loading-skeleton';

class SkeletonBox extends Component {
    render () {
        return (
            <>
                <S0Wrapper>
                    <Skeleton width={200} height={18}/>
                    <Skeleton width={360} height={23}/>
                    <Skeleton width={90} height={15}/>
                </S0Wrapper>
                <SkeletonWrapper>
                    <Skeleton count={5} width={651} height={18}/>
                    <Skeleton width={384} height={18}/>
                    <SkeletonWrapper2>
                        <Skeleton width={250} height={320}/>
                        <SkeletonWrapper4>
                            <SkeletonWrapper3>
                                <Skeleton count={3} width={384} height={18}/>
                                <Skeleton width={150} height={18}/>
                            </SkeletonWrapper3>
                            <SkeletonWrapper3>
                                <Skeleton count={5} width={384} height={18}/>
                                <Skeleton width={150} height={18}/>
                            </SkeletonWrapper3>
                        </SkeletonWrapper4>
                    </SkeletonWrapper2>
                    <Skeleton count={5} width={651} height={18}/>
                    <Skeleton width={384} height={18}/>
                </SkeletonWrapper>
            </>
        )
    }
}

const S0Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    & > * {
        margin: 3px 0px;   
    }
`

const SkeletonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    height: 100%;
    overflow: inherit;

    & > span {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > span {
            margin-bottom: 10px;
        }

        & > span:last-child{
            align-self: start;
            /* margin-left: 38px; */
        }
    }
`

const SkeletonWrapper2 = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`

const SkeletonWrapper3 = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 4px;

    & > span {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > span {
            margin-bottom: 10px;
        }

    }

    & > span:nth-child(2) {
        align-self: start;
    }
`

const SkeletonWrapper4 = styled.div`
    margin-left: 14px;
`

export default SkeletonBox