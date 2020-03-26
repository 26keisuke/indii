import React, { useEffect } from "react"
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

const Katex = ({ value, setValue, setTransparent }) =>  {

    useEffect(() => {
        setTransparent(true)
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value)
        e.target.value ? setTransparent(false) : setTransparent(true)
    }

    return(
        <Wrapper>
            <TextField
                id="math" 
                label="数式を入力" 
                value={value || ""}
                onChange={handleChange} 
                spellCheck={false}
            />
            <MathWrapper>
                <div>プレビュー</div>
                { value
                ?
                <BlockMath
                    math={value}
                    renderError={() => {
                        setTransparent(true)
                        return (
                            <p>数式の形式が正しくありません。</p>
                        )
                    }}
                />
                :
                <p>数式が入力されていません。</p>
                }
            </MathWrapper>
            
        </Wrapper>
    )
}

export default Katex