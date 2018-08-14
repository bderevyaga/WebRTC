import React, {Component} from 'react';
import './Video.css';
import LocalVideo from "./LocalVideo/LocalVideo";
import RemoteVideo from "./RemoteVideo/RemoteVideo";

class Video extends Component {
    render() {
        return (
            <div className='videos'>
                <LocalVideo ws={this.props.ws} rtc={this.props.rtc}/>
                <RemoteVideo ws={this.props.ws} rtc={this.props.rtc}/>
                <div className="controls">
                    <input type="button" value="Start"/>
                    <input type="button" value="Stop"/>
                    <input type="button" value="Next"/>
                </div>
            </div>
        );
    }
}

export default Video;
