import React, { Component } from "react"
import styled from "styled-components"

export const Wrapper = styled.div`
    padding: 100px;
    padding-top: 30px;

    & ol,
    & ul{
        padding-left: 30px;
        margin: 12px 0px;
    }

    & ul {
        list-style: outside;
    }

    & ol {
        list-style: decimal;
    }

    & > h1 {
        margin-bottom: 5px;
        font-size: 19px;
    }

    & > p:last-child{
        float: right;
    }
`

const Segment = styled.div`
    padding: 10px 0px;

    & > h2 {
        margin-bottom: 8px;
        font-size: 16px;
    }
`

export class Section extends Component {
    render() {
        return (
            <Segment>
                <h2>{this.props.index}. {this.props.title}</h2>
                { this.props.paragraph.map((para,index) => {
                    var bullet = []
                    if(this.props.bullet && this.props.bullet[index]){
                        bullet = this.props.bullet[index].map((bull,idx) => <li key={para+"li"+idx}>{bull}</li>)
                    }
                    return ([
                        <p key={para+"p"+index}>{para}</p>,
                        <ul key={para+"ul"+index}>
                            {bullet}
                        </ul>
                    ])    
                })
                }
            </Segment>
        )
    }
}

class Policy extends Component {
    render() {
        return(
            <Wrapper>
                <h1>プライバシーポリシー</h1>
                <p>Chief株式会社（以下，「当社」といいます。）は，Indiiウェブサイト上で提供するサービス（以下,「サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。</p>
                <Section
                    index="1"
                    title="個人情報"
                    paragraph={["「個人情報」とは，個人情報保護法にいう「個人情報」を指すものとし，生存する個人に関する情報であって，当該情報に含まれる氏名，生年月日，住所，電話番号，連絡先その他の記述等により特定の個人を識別できる情報及び容貌，指紋，声紋にかかるデータ，及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。"]}
                />
                <Section
                    index="2"
                    title="個人情報の収集方法"
                    paragraph={["当社は，ユーザーが利用登録をする際に氏名，生年月日，メールアドレス，などの個人情報をお尋ねすることがあります。また，ユーザーと提携先などとの間でなされたユーザーの個人情報を,当社の提携先（情報提供元，広告主，広告配信先などを含みます。以下，｢提携先｣といいます。）などから収集することがあります。"]}
                />
                <Section
                    index="3"
                    title="個人情報収集・利用する目的"
                    paragraph={["当社が個人情報を収集・利用する目的は，以下のとおりです。"]}
                    bullet={[["当社サービスの提供・運営のため", "ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）", "ユーザーが利用中のサービスの新機能，更新情報，キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため", "メンテナンス，重要なお知らせなど必要に応じたご連絡のため", "利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため", "ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため", "上記の利用目的に付随する目的"]]}
                />
                <Section
                    index="4"
                    title="利用目的の変更"
                    paragraph={["当社は，利用目的が変更前と関連性を有すると合理的に認められる場合に限り，個人情報の利用目的を変更するものとします。"]}
                />
                <Section
                    index="5"
                    title="個人情報の第三者提供"
                    paragraph={["当社は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます。しかし、次に掲げる場合には，当該情報の提供先は第三者に該当しないものとします。"]}
                    bullet={[["当社が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合","合併その他の事由による事業の承継に伴って個人情報が提供される場合"]]}
                />
                <Section
                    index="6"
                    title="個人情報の開示"
                    paragraph={["当社は，本人から個人情報の開示を求められたときは，本人に対し，これを開示します。ただし，開示することにより次のいずれかに該当する場合は，その全部または一部を開示しないこともあり，開示しない決定をした場合には，その旨を通知します。なお，個人情報の開示に際しては，1件あたり1，000円の手数料を申し受けます。",
                                "項の定めにかかわらず，履歴情報および特性情報などの個人情報以外の情報については，原則として開示いたしません。"]}
                    bullet={[["本人または第三者の生命，身体，財産その他の権利利益を害するおそれがある場合", "当社の業務の適正な実施に著しい支障を及ぼすおそれがある場合", "その他法令に違反することとなる場合"]]}
                />
                <Section
                    index="7"
                    title="個人情報の訂正および削除"
                    paragraph={["ユーザーは，当社の保有する自己の個人情報が誤った情報である場合には，当社が定める手続きにより，当社に対して個人情報の訂正，追加または削除（以下，「訂正等」といいます。）を請求することができます。",
                                "当社は，ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には，当該個人情報の訂正等を行うものとします。",
                                "当社は，前項の規定に基づき訂正等を行った場合，または訂正等を行わない旨の決定をしたときは、これをユーザーに通知します。"]}
                />
                <Section
                    index="8"
                    title="個人情報の利用停止等"
                    paragraph={["当社は，本人から，個人情報が，利用目的の範囲を超えて取り扱われているという理由，または不正の手段により取得されたものであるという理由により，その利用の停止または消去（以下，「利用停止等」といいます。）を求められた場合には，必要な調査を行います。",
                                "前項の調査結果に基づき，その請求に応じる必要があると判断した場合には，当該個人情報の利用停止等を行います。",
                                "当社は，前項の規定に基づき利用停止等を行った場合，または利用停止等を行わない旨の決定をしたときは，これをユーザーに通知します。",
                                "前2項にかかわらず，利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって，ユーザーの権利利益を保護するために必要なこれに代わるべき措置をとれる場合は，この代替策を講じるものとします。"]}
                />
                <Section
                    index="9"
                    title="プライバシーポリシーの変更"
                    paragraph={["本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。",
                                "当社が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。"]}
                />
                <Section
                    index="10"
                    title="お問い合わせ窓口"
                    paragraph={["本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。", "社名： Chief株式会社", "Eメールアドレス： info@indii.jp"]}
                />
                <p>以上</p>
            </Wrapper>
        )
    }
}

export default Policy