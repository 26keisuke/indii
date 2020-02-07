import React, { Component } from "react"

import FilterController from "../../Filter/Filter"

class Filter extends Component {
    render() {
        return (
            <FilterController
                title={["ユーザー","時間"]}
                section={[["すべての人", "フォローしている人のみ"],["過去全ての投稿", "過去24時間に作成された投稿", "過去7日間に作成された投稿"]]}
                name={["people", "time"]}
            />
        )
    }
}

export default Filter