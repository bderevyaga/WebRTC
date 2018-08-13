import React, {Component} from 'react';
import Video from "./Video/Video";
import Chat from "./Chat/Chat";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        const configuration = {
            "iceServers": [{"url": "stun:stun2.1.google.com:19302"}]
        };

        const RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection;

        this.state = {
            ws: new WebSocket('ws://127.0.0.1:9090'),
            rtc: new RTCPeerConnection(configuration, {optional: [{RtpDataChannels: true}]})
        };

        this.state.ws.onmessage = (msg) => {
            const data = JSON.parse(msg.data);

            switch(data.type) {
                case 'init':
                    this.init();
                    break;
                case 'offer':
                    this.handleOffer(data.data);
                    break;
                case 'answer':
                    this.handleAnswer(data.data);
                    break;
                case 'candidate':
                    this.handleCandidate(data.data);
                    break;
                default:
                    break;
            }
        }
    }

    init() {
        this.state.rtc.createOffer((offer) => {
            this.state.ws.send(JSON.stringify({
                type: 'offer',
                data: offer
            }));

            this.state.rtc.setLocalDescription(offer);
        }, () => {
            alert("Error when creating an offer");
        });
    }

    handleOffer(offer) {
        const RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription;

        this.state.rtc.setRemoteDescription(new RTCSessionDescription(offer));

        this.state.rtc.createAnswer((answer) => {
            this.state.rtc.setLocalDescription(answer);

            this.state.ws.send(JSON.stringify({
                type: 'answer',
                data: answer
            }));

        }, (error) => {
        });
    };

    handleAnswer(answer) {
        const RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription;

        this.state.rtc.setRemoteDescription(new RTCSessionDescription(answer));
    };

    handleCandidate(candidate) {
        const RTCIceCandidate = window.RTCIceCandidate || window.webkitRTCIceCandidate;

        this.state.rtc.addIceCandidate(new RTCIceCandidate(candidate));
    };

    render() {
        return (
            <div>
                <Video ws={this.state.ws} rtc={this.state.rtc}/>
                <div className="controls">
                    <input type="button" value="Start"/>
                    <input type="button" value="Stop"/>
                    <input type="button" value="Next"/>
                </div>
                <Chat ws={this.state.ws} rtc={this.state.rtc}></Chat>
            </div>
        );
    }
}

export default App;
