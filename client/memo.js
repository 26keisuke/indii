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

black       #3d4245