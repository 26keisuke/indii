import React, { Component } from "react"

class Filter extends Component {
    render() {
        return (
            <div className="search-filter">
                <form className="search-filter-people">
                    <p className="search-filter-title">ユーザー</p>
                    <div>
                        <p className="search-filter-row">すべての人</p>
                        <input type="radio" name="people" id="p1" defaultChecked/>
                        <label for="p1"/>
                    </div>
                    <div>
                        <p className="search-filter-row">フォローしている人のみ</p>
                        <input type="radio" name="people" id="p2"/>
                        <label for="p2"/>
                    </div>
                </form>
                <form className="search-filter-sub">
                    <p className="search-filter-title">時間</p>
                    <div>
                        <p className="search-filter-row">過去全ての投稿</p>
                        <input type="radio" name="time" id="t1" defaultChecked/>
                        <label for="t1"/>
                    </div>
                    <div>
                        <p className="search-filter-row">過去24時間に作成された投稿</p>
                        <input type="radio" name="time" id="t2"/>
                        <label for="t2"/>
                    </div>
                    <div>
                        <p className="search-filter-row">過去7日間に作成された投稿</p>
                        <input type="radio" name="time" id="t3"/>
                        <label for="t3"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter