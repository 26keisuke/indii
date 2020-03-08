import React, { Component } from "react"
import styled from "styled-components"
import Skeleton from 'react-loading-skeleton';

class SkeletonBox extends Component {
    render () {
        return (
            <div>
                <TitleSkeleton>
                    <Skeleton width={100} height={18}/>
                </TitleSkeleton>
                <SkeletonWrapper>
                    <Skeleton count={5} width={595} height={18}/>
                    <Skeleton width={300} height={18}/>
                    <SkeletonWrapper2>
                        <Skeleton width={250} height={320}/>
                        <SkeletonWrapper4>
                            <SkeletonWrapper3>
                                <Skeleton count={3} width={330} height={18}/>
                                <Skeleton width={150} height={18}/>
                            </SkeletonWrapper3>
                            <SkeletonWrapper3>
                                <Skeleton count={5} width={330} height={18}/>
                                <Skeleton width={150} height={18}/>
                            </SkeletonWrapper3>
                        </SkeletonWrapper4>
                    </SkeletonWrapper2>
                    <Skeleton count={5} width={595} height={18}/>
                    <Skeleton width={300} height={18}/>
                </SkeletonWrapper>
            </div>
        )
    }
}


const TitleSkeleton = styled.div`
    margin: 0px 50%;
    transform: translate(-50%, -50%);
    width: 100px;
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
    /* margin-left: 38px; */
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