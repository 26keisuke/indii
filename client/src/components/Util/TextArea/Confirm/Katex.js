import React, { Component } from "react"
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import { BlockMath } from "react-katex"

const Wrapper = styled.div`
    padding: 0px 2px;
    padding-top: 10px;
    padding-bottom: 35px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    & > div:nth-child(1) {
        margin-bottom: 50px !important;
    }
`

const MathWrapper = styled.div`
    position: relative;

    & > div:nth-child(1) {
        position: absolute;
        font-size: 10px;
        color: #777777;
        top: -10px;
    }

    & p {
        margin: 1em 0;
        text-align: center;
        color: #555555;
    }
`

class Katex extends Component {
    render () {
        return(
            <Wrapper>
                <TextField
                    id="math" 
                    label="数式を入力" 
                    value={this.props.value || ""}
                    onChange={(e) => this.props.setValue(e.target.value)} 
                    spellCheck={false}
                />
                <MathWrapper>
                    <div>プレビュー</div>
                    { this.props.value
                    ?
                    <BlockMath
                        math={this.props.value}
                        renderError={() => 
                            <p>数式の形式が正しくありません。</p>
                        }
                    />
                    :
                    <p>数式が入力されていません。</p>
                    }
                </MathWrapper>
                
            </Wrapper>
        )
    }
}

export default Katex