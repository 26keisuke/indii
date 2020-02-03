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


他の組み合わせ
light blue  #379af2
dark blue   #111350
gray        #aeadae
light gray  #e1e0e2
white       #ffffff


                {/* <Link to={"/"} className="side-bar-row" onClick={() => this.handleClick("home")}>
                    <div className={nudge["home"]}></div>
                    <img src={cate["home"] ? images.pressed["home"] : images.unpressed["home"]} className="side-bar-img"/>
                    <p className={cate.home ? "" : "unselected"}>ホーム</p>
                </Link>
                <Link to={"/draft"} className="side-bar-row" onClick={() => this.handleClick("draft")}>
                    <div className={nudge.draft}></div>
                    <img src={cate.draft ? draft_pressed : draft} className="side-bar-img"/>
                    <p className={cate.draft ? "" : "unselected"}>下書き</p>
                </Link>
                <Link to={"/action"} className="side-bar-row" onClick={() => this.handleClick("action")}>
                    <div className={nudge.action}></div>
                    <img src={cate.action ? action_pressed : action} className="side-bar-img"/>
                    <p className={cate.action ? "" : "unselected"}>編集・作成</p>
                </Link>
                <Link to={"/notification"} className="side-bar-row" onClick={() => this.handleClick("notification")}> 
                    <div className={nudge.notification}></div>
                    <img src={cate.notification ? notification_pressed : notification} className="side-bar-img"/>
                    <p className={cate.notification ? "" : "unselected"}>通知</p>
                </Link>
                <Link to={"/setting"} className="side-bar-row" onClick={() => this.handleClick("setting")}>
                    <div className={nudge.setting}></div>
                    <img src={cate.setting ? setting_pressed : setting} className="side-bar-img"/>
                    <p className={cate.setting ? "" : "unselected"}>設定</p>
                </Link> */}
