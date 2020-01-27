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