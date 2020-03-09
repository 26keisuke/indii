//将来的には、要請とか要望が強いものとかも載せられるようにする

import React, {Component} from "react"
import { Helmet } from "react-helmet"

import post_create from "../../images/post-create.png"
import post_edit from "../../images/post-edit.png"
import topic_create from "../../images/topic-create.png"
import topic_edit from "../../images/topic-edit.png"

import Grid, { GridWrapper } from "./Grid/Grid"
import { Space } from "../Theme"

const config = {
    screenName: ["トピック", "ポスト"],
    category: ["topic", "post"],
    actionList: [["create", "edit"], ["create", "edit"]],
    header: "編集・作成",
    headerContent: "このページでは、トピックとポストの編集及び作成ができます。あなたの理想とする形に自由にカスタマイズしましょう！",
    title: [["新しいトピックを作成する",
             "既存のトピックを編集する"],
            ["新しいポストを作成する",
             "既存のポストを編集する"]],
    description: [["Indiiでは、「トピック」という形で一つのテーマを管理します。Wikipediaと違い、あなたが本当に面白いと思うテーマを自由に選択することができます。友人やフォロワーを招待して、理想のトピックを作成しましょう！",
                "既にあるトピックを編集します。写真を変更したり、ポストの順番を入れ替えることができます。トピックが長続きさせるためにも、誰も「見やすい！」と思えるトピックに仕上げましょう！"],
                ["Indiiでは、「ポスト」という単位で投稿することができます。誰もが調べる一般的なことから、専門的に掘り下げたいニッチなことまで、ポストの内容は自由です。あなたの創造力に期待しています！", 
                "Indiiでは、他のユーザーが作成したポストを編集することができます。より多くの人の知識を集めることで、「より幅広く、より普遍的で、よりわかりやすい」を作り上げましょう！"]],
    img: [[topic_create,topic_edit],[post_create, post_edit]],
    color: [["#455964", "#704551"],["#3282b8", "#916dd5"]]            
}

class Create extends Component {
    render () {
        return (
            <GridWrapper>
                <Helmet>
                    <title>編集・作成 | Indii</title>
                    <meta name="description" content="トピックとポストの編集及び作成ができます。あなたの理想とする形に自由にカスタマイズしましょう。"/>
                    <meta name="keywords" content="編集,新規作成,ポスト,トピック"/>
                </Helmet>
                <Grid config={config}/>
                <Space height="10px"/>
            </GridWrapper>
        )
    }
}

export default Create