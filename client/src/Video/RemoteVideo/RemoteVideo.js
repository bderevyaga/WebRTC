import React, {Component} from 'react';

class RemoteVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: ''
        };
    }

    componentDidMount() {
        this.props.rtc.onaddstream = (e) => {
            this.setState({
                video: window.URL.createObjectURL(e.stream)
            });
        };

        this.props.rtc.onicecandidate = (event) => {
            if (event.candidate) {
                this.props.ws.send(JSON.stringify({
                    type: "candidate",
                    data: event.candidate
                }));
            }
        };
    }

    render() {
        return (
            <video autoPlay src={this.state.video}/>
        );
    }
}

export default RemoteVideo;
