import React, { Component } from "react"

class Filter extends Component {
    render() {
        return (
            <div className="search-filter">
                <form className="search-filter-people">
                    <p className="search-filter-title">コンテンツ</p>
                    <div>
                        <p className="search-filter-row">ポスト</p>
                        <input type="radio" name="content" id="c1" defaultChecked/>
                        <label htmlFor="c1"/>
                    </div>
                    <div>
                        <p className="search-filter-row">トーク</p>
                        <input type="radio" name="content" id="c2"/>
                        <label htmlFor="c2"/>
                    </div>
                </form>
                <form className="search-filter-sub">
                    <p className="search-filter-title">時間</p>
                    <div>
                        <p className="search-filter-row">過去全ての投稿</p>
                        <input type="radio" name="time" id="t1" defaultChecked/>
                        <label htmlFor="t1"/>
                    </div>
                    <div>
                        <p className="search-filter-row">過去24時間に作成された投稿</p>
                        <input type="radio" name="time" id="t2"/>
                        <label htmlFor="t2"/>
                    </div>
                    <div>
                        <p className="search-filter-row">過去7日間に作成された投稿</p>
                        <input type="radio" name="time" id="t3"/>
                        <label htmlFor="t3"/>
                    </div>
                </form>
                <form className="search-filter-sub">
                    <p className="search-filter-title">ユーザー</p>
                    <div>
                        <p className="search-filter-row">すべての人</p>
                        <input type="radio" name="people" id="p1" defaultChecked/>
                        <label htmlFor="p1"/>
                    </div>
                    <div>
                        <p className="search-filter-row">フォローしている人のみ</p>
                        <input type="radio" name="people" id="p2"/>
                        <label htmlFor="p2"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter