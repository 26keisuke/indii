// import React, { Component } from "react"
// import Feed from "./Search/Controller/Feed"

// class WorkSpace extends Component {
//     render () {
//         return (
//             <Feed placeholder="Indiiで検索"/>
//         )
//     }
// }

// export default WorkSpace

// import React, { Component } from "react"
// import Match from "./Search/Controller/Match"

// class WorkSpace extends Component {
//     render () {
//         return (
//             <Match title="でも" message="ここに入力"　theme="TOPIC" storageId="topic1234" placeholder="Indiiで検索" postAction={() => alert("HERE")}/>
//         )
//     }
// }

// export default WorkSpace


import React, { Component } from "react"
import Unique from "./Search/Controller/Unique"

class WorkSpace extends Component {
    render () {
        return (
            <Unique title="でも" message="ここに入力" theme="POST" storageId="topic12364" placeholder="Indiiで検索" topicId="5e6d8847ea49fa3214872020" postAction={() => alert("HERE")}/>
        )
    }
}

export default WorkSpace