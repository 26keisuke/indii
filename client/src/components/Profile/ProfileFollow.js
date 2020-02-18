import React, { Component } from "react"
import { connect } from "react-redux"

import People from "../People/People"

class ProfileFollow extends Component {

    render() {
        return (
            <div className="profile-wrapper-extra">
                <div className="profile-follow-box">
                    <div className="profile-follow-wrapper">
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </div>
                    <div className="profile-follow-wrapper">
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </div>
                    <div className="profile-follow-wrapper">
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </div>
                    <div className="profile-follow-wrapper">
                        <People
                            id={"123456789"}
                            name={"飯塚啓介"} 
                            job={"Chief株式会社 CEO"} 
                            intro={"2011年にLinkedInから公開されたオープンソースの分散メッセージングシステムである．Kafkaはウェブサービスなど..."}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    }
}

export default connect(mapStateToProps, null)(ProfileFollow)