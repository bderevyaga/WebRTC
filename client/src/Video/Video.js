import React, {Component} from 'react';
import './Video.css';
import LocalVideo from "./LocalVideo/LocalVideo";
import RemoteVideo from "./RemoteVideo/RemoteVideo";

class Video extends Component {
    render() {
        return (
            <div>
                <LocalVideo ws={this.props.ws} rtc={this.props.rtc}/>
                <RemoteVideo ws={this.props.ws} rtc={this.props.rtc}/>
            </div>
        );
    }
}

export default Video;
