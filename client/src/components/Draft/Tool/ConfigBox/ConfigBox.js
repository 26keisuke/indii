import React, {Component} from "react"
import styled from "styled-components"
// import { Space } from "../../../Theme"

import Config from "../../../Action/Element/Config"

class ConfigBox extends Component {
    render () {

        return (
            <Wrapper>
                <div>
                    <Config
                        width={340}
                        title={"承認無しに変更を許可する"}
                        text={["許可", "許可しない"]}
                        recommend={true}
                        on={this.props.config.allowEdit}
                        handleClick={() => this.props.handleClick("allowEdit")}
                    />
                </div>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
    padding: 10px;
`


export default ConfigBox