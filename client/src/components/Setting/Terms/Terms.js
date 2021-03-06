import React, { Component } from "react"
import { Link } from "react-router-dom"

import { Wrapper, Section } from "../Policy/Policy"

class Policy extends Component {
    render() {
        return(
            <Wrapper>
                <h1>利用規約</h1>
                <p>本利用規約（以下、「本規約」）はChief株式会社（以下、「当社」といいます。）がユーザーによるIndiiウェブサイト、製品およびサービス（以下、「本サービス」）へのアクセスおよび利用を規定するものです。 本規約をよくお読みになった上で、ご質問がございましたら 当社にお問い合わせください 。本サービスにアクセスして利用すると、本規約およびプライバシーポリシーにご同意いただいたものと見なされます。</p>
                <Section
                    index="1"
                    title="本サービスの使命"
                    paragraph={["Indiiは、Chiefが管理・運営する、知識を共有する市場を作ることを目的としたサービスです。"]}
                />
                <Section
                    index="2"
                    title="コンテンツ"
                    paragraph={["Indiiはユーザーが寄稿、写真、コメント、リンク、その他のアイテムなどのコンテンツ（以下、「コンテンツ」といいます。）を投稿することを許可しています。ユーザーがIndiiに投稿するコンテンツの権利および一切の責任はユーザーに帰属します。当社は、本規約に基づくメディアおよびプラットフォームとしての機能を提供する立場であって、ユーザーに対しコンテンツの著作権の譲渡、貸与等を認めるものではありません。",
                                "Indiiの運営、開発、提供、使用において、Indiiに投稿するコンテンツはIndiiおよびユーザーに非独占権利、無償使用の権利、譲渡、サブライセンス、ワールドワイドのライセンス使用、保管、表示、再生、保存、変更、模倣アイテムの作成、実施、配布する権利を付与するものとします。",
                                "ユーザー自身で作成していないものや権利を所有していないものを投稿する場合、ユーザーは投稿するコンテンツに責任を負うこと、ユーザーに投稿する権利があるコンテンツのみを送信すること、および投稿するコンテンツに関連する第三者のライセンスを完全に遵守することに同意するものとします。",
                                "Indiiの規約またはプライバシーポリシーに違反すると思われるコンテンツを含め、Indiiはあらゆる理由においてコンテンツを削除、変更する権利を有します。"]}
                />
                <Section
                    index="3"
                    title="免責事項"
                    paragraph={["コンテンツの内容の完全性、正確性、網羅性、安全性、特定の目的への適合性等について、当社は、いかなる保証を行うものではありません",
                                "ユーザーの本規約違反又は利用者による第三者の権利侵害に起因し、又は関連して生じた全ての苦情や請求については、ユーザー自身の責任と費用負担で解決するものとし、当社は一切の責任を負いません。"]}
                />
                <Section
                    index="4"
                    title="禁止事項"
                    paragraph={["","以下の表現を含み，または含むと当社が判断する内容を本サービス上に投稿し，または送信する行為","以下を目的とし，または目的とすると当社が判断する行為", ""]}
                    bullet={[["法令または公序良俗に違反する行為","犯罪行為に関連する行為","当社，本サービスの他のユーザー，または第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為","当社のサービスの運営を妨害するおそれのある行為","他のユーザーに関する個人情報等を収集または蓄積する行為","不正アクセスをし，またはこれを試みる行為","他のユーザーに成りすます行為","当社のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為","当社，本サービスの他のユーザーまたは第三者の知的財産権，肖像権，プライバシー，名誉その他の権利または利益を侵害する行為"],
                            ["過度に暴力的な表現","露骨な性的表現","人種，国籍，信条，性別，社会的身分，門地等による差別につながる表現", "自殺，自傷行為，薬物乱用を誘引または助長する表現","その他反社会的な内容を含み他人に不快感を与える表現"],
                            ["営業，宣伝，広告，勧誘，その他営利を目的とする行為（当社の認めたものを除きます。）","性行為やわいせつな行為を目的とする行為","面識のない異性との出会いや交際を目的とする行為","他のユーザーに対する嫌がらせや誹謗中傷を目的とする行為","当社，本サービスの他のユーザー，または第三者に不利益，損害または不快感を与えることを目的とする行為","その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為"],
                            ["宗教活動または宗教団体への勧誘行為","その他，当社が不適切と判断する行為"]]}
                />
                <Section
                    index="5"
                    title="サービスの利用および停止等"
                    paragraph={["当社は、以下のいずれかの事由があると判断した場合、本サービスの一部または全部を停止することがあります。この場合、当社はユーザーに対し何ら通知する義務を負いません。"]}
                    bullet={[["本サービスの障害復旧対応や定期メンテナンスを行う場合","ユーザーが本利用規約に違反した場合","過去に本利用規約違反等によって当社から利用停止等の処分を受けた場合", "その他，当社が本サービスの提供が困難と判断した場合"]]}
                />
                <Section
                    index="6"
                    title="個人情報"
                    paragraph={["Indiiは、本サービスの運営に必要な最低限の個人情報を収集し、合理的な方法により安全に管理します。個人情報の取扱いについては、別途定める プライバシーポリシー に従います。"]}
                />
                <Section
                    index="7"
                    title="パスワードの管理"
                    paragraph={["ユーザーは，自己の責任において，サービスのパスワードを適切に管理するものとします。",
                                "ユーザーは，いかなる場合にも，パスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。",
                                "メールアドレス 及びパスワードが第三者によって使用されたことによって生じた損害は，当社は一切の責任を負わないものとします。"]}
                />
                <Section
                    index="8"
                    title="退会"
                    paragraph={["ユーザーは，当社に問い合わせることで，本サービスから退会できる手続きを進めることができます。その際、当社は退会した利用者の登録情報、コンテンツについて継続して保有する義務を負わないものとします。"]}
                />
                <Section
                    index="9"
                    title="サービス内容および規約の変更"
                    paragraph={["当社は、当社の判断において、サービスの内容の変更をする可能性があります。当社は、本サービスの変更等により利用者に生じたいかなる損害等についても、一切責任を負うものではありません。",
                                "当社は、当社の判断により、本規約を変更することがあります。変更後の本規約は、当社が別途定める場合を除いて、本サイト上に表示した時点より効力を生じるものとします。"]}
                />
                <Section
                    index="10"
                    title="権利義務の譲渡"
                    paragraph={["ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。",
                                "当社は、本サービスに関する事業を合併、事業譲渡その他の事由により第三者に承継させる場合には、当該事業の承継に伴い、本規約等上の地位、本規約等に基づく権利、義務及び利用者の登録情報、コンテンツを当該事業の承継人に譲渡することができるものとし、ユーザーは、かかる譲渡について本項において予め同意したものとします。"]}
                />
                <Section
                    index="11"
                    title="準拠法と裁判管轄"
                    paragraph={["本規約は日本法を準拠法とします。",
                                "本規約の各事項に関連して紛争が生じた場合は、東京地方裁判所を第一審の専属的合意管轄裁判所としす。"]}
                />
                <p>以上</p>
            </Wrapper>
        )
    }
}

export default Policy