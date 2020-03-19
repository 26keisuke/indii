import React, { Component } from "react"
import styled from "styled-components"

import { Space } from "../../Theme"
import Preview from "../../Util/Preview"

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

                <Preview
                    placeholder="モバイルでの表示"
                    mobile={true}
                    display={mobileImg}
                    alt="変更が適用された後のモバイル用のトピックの画像プレビュー"
                />

                { flag && <Space height={"30px"}/> }
                { flag && <Text>Before:</Text> }
                
                { flag &&
                <Preview
                    placeholder={"モバイルでの表示"}
                    mobile={true}
                    display={originalMobileImg}
                    alt="変更が適用された後のモバイル用のトピックの画像プレビュー"
                />
                }

                {/* トピック */}

                { flag && <Space height={"30px"}/> }
                { flag && <Text>After:</Text> }

                <Preview
                    placeholder={"トピック画面での表示"}
                    topic={true}
                    display={squareImg}
                    alt="変更が適用された後のウェブ用のトピックの画像プレビュー"
                />

                { flag && <Space height={"30px"}/> }
                { flag && <Text>Before:</Text> }
                
                { flag && 

                <Preview
                    placeholder={"トピック画面での表示"}
                    topic={true}
                    display={originalSquareImg}
                    alt="変更が適用された後のウェブ用のトピックの画像プレビュー"
                />
                }

                {/* ポスト */}

                { flag && <Space height={"30px"}/> }
                { flag && <Text>After:</Text> }

                <Preview
                    placeholder={"ポスト画面での表示"}
                    display={rectangleImg}
                    alt="変更が適用された後のウェブ用のトピックの画像プレビュー"
                />

                { flag && <Space height={"30px"}/> }
                { flag && <Text>Before:</Text> }
                
                { flag &&

                <Preview
                    placeholder={"ポスト画面での表示"}
                    display={originalRectangleImg}
                    alt="変更が適用された後のウェブ用のトピックの画像プレビュー"
                />
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