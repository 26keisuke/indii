import React, { Component } from "react"
import styled from "styled-components"

import { PreviewImg } from "../Controller/Image"

class Image extends Component {
    render () {

        const { 
        mobileImg, 
        squareImg, 
        rectangleImg, 
        originalSquareImg,
        originalRectangleImg,
        originalMobileImg,
        } = this.props

        const flag = this.props.originalSquareImg

        return (
            <PreviewColumn>

                {/* モバイル */}

                { flag && <Text>After:</Text> }

                <PreviewImg mobile={true}>
                    <p>モバイルでの表示</p>
                    <div/>
                    <img 
                        src={mobileImg} 
                        alt={"変更が適用された後のモバイル用のトピックの画像プレビュー"}/>
                </PreviewImg>

                { flag && <Text>Before:</Text> }
                
                { flag &&
                <PreviewImg mobile={true}>
                    <p>モバイルでの表示</p>
                    <div/>
                    <img 
                        src={originalMobileImg} 
                        alt={"変更が適用された後のモバイル用のトピックの画像プレビュー"}/>
                </PreviewImg>
                }

                {/* トピック */}

                { flag && <Text>After:</Text> }

                <PreviewImg topic={true}>
                    <p>トピック画面での表示</p>
                    <div/>
                    <img 
                        src={squareImg} 
                        alt={"変更が適用された後のウェブ用のトピックの画像プレビュー"}
                    />
                </PreviewImg>

                { flag && <Text>Before:</Text> }
                
                { flag && 
                <PreviewImg topic={true}>
                    <p>トピック画面での表示</p>
                    <div/>
                    <img 
                        src={originalSquareImg} 
                        alt={"変更が適用された後のウェブ用のトピックの画像プレビュー"}
                    />
                </PreviewImg>
                }

                {/* ポスト */}

                { flag && <Text>After:</Text> }

                <PreviewImg>
                    <p>ポスト画面での表示</p>
                    <div/>
                    <img 
                        src={rectangleImg} 
                        alt={"変更が適用された後のウェブ用のトピックの画像プレビュー"}
                    />
                </PreviewImg>

                { flag && <Text>Before:</Text> }
                
                { flag &&
                <PreviewImg>
                    <p>ポスト画面での表示</p>
                    <div/>
                    <img 
                        src={originalRectangleImg} 
                        alt={"変更が適用された後のウェブ用のトピックの画像プレビュー"}
                    />
                </PreviewImg>
                }

            </PreviewColumn>
        )
    }
}

const Text = styled.p`
    margin-bottom:10px;
    color: #585858;
    font-size: 10px;
    margin-left: 5px;
`

const PreviewColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 445px;
    margin-bottom: 25px;
`


export default Image