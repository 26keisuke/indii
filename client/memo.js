hover: background-color: rgba(233, 233, 238, 0.25);
border: #d2d2d2
light blue: #9EAEE5
dark purple: #626480


2020/1/26 braft => "block is not a blocknode"の問題が出た。他のライブラリを消して言ったらなんかうまく行った。おそらく競合していた。

theme color (gradient)

background: linear-gradient(270deg, #c4c4c4, #636480);
background-size: 400% 400%;

-webkit-animation: AnimationName 25s ease infinite;
-moz-animation: AnimationName 25s ease infinite;
animation: AnimationName 25s ease infinite;

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}


<div className="confirm-report">
    <div className="confirm-report-box">
        <input className="confirm-report-radio" type="radio" name="0"/>
        <label className="confirm-report-label" for="0">問題</label>
    </div>
        <input className="confirm-report-radio" type="radio" name="1"/>
        <label className="confirm-report-label" for="1">問題</label>
    <div className="confirm-report-box">
        <input className="confirm-report-radio" type="radio" name="2"/>
        <label className="confirm-report-label" for="2">問題</label>
    </div>
    <div className="confirm-report-box">
        <input className="confirm-report-radio" type="radio" name="3"/>
        <label className="confirm-report-label" for="3">問題</label>
    </div>
    <div className="confirm-report-box">
        <input className="confirm-report-radio" type="radio" name="4"/>
        <label className="confirm-report-label" for="4">問題</label>
    </div>
</div>


// localhost:3000 からどうしてもauth/googleにいけなかった
// solution => 一回http-middleware-proxyを消してもう一回インストールで直った

other color themes
rgb(112, 69, 81)
rgb(#455964) => defaultのアカウントのバックグラウンド
green: 4CD964
red: FF5F5F

{/* <div className="topic-form-progress-fake-for-circle">
                    <div className="topic-form-progress-circle-fake">
                        <p>1</p>
                    </div>
                    {this.setCircle(0)}
                    <p className="topic-form-progress-name">トピック名を決定</p>
                </div>

                <div className="topic-form-progress-fake-for-bar">
                    <div className="topic-form-progress-bar"/>
                    {this.setBar(0)}
                </div>

                <div className="topic-form-progress-fake-for-circle">
                    <div className="topic-form-progress-circle-fake">
                        <p>2</p>
                    </div>
                    {this.setCircle(1)}
                    <p className="topic-form-progress-name">写真を選択</p>
                </div>

                <div className="topic-form-progress-fake-for-bar">
                    <div className="topic-form-progress-bar"/>
                    {this.setBar(1)}
                </div>

                <div className="topic-form-progress-fake-for-circle">
                    <div className="topic-form-progress-circle-fake">
                        <p>3</p>
                    </div>
                    {this.setCircle(2)}
                    <p className="topic-form-progress-name">タグを追加</p>
                </div>

                <div className="topic-form-progress-fake-for-bar">
                    <div className="topic-form-progress-bar"/>
                    {this.setBar(2)}
                </div>

                <div className="topic-form-progress-fake-for-circle">
                    <div className="topic-form-progress-circle-fake">
                        <p>4</p>
                    </div>
                    {this.setCircle(3)}
                    <p className="topic-form-progress-name">友達を招待する</p>
                </div>

                <div className="topic-form-progress-fake-for-bar">
                    <div className="topic-form-progress-bar"/>
                    {this.setBar(3)}
                </div>

                <div className="topic-form-progress-fake-for-circle">
                    <div className="topic-form-progress-circle-fake">
                        <p>5</p>
                    </div>
                    {this.setCircle(4)}
                    <p className="topic-form-progress-name">プレビュー</p>
                </div> */}