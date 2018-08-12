import React, {Component} from 'react';

class LocalVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: ''
        };
    }

    componentDidMount() {
        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        navigator.getUserMedia(
            {video: true, audio: true},
            (stream) => {
                this.setState({
                    video: window.URL.createObjectURL(stream)
                });

                this.props.rtc.addStream(stream);

                this.props.ws.send(JSON.stringify({
                    type: 'ready'
                }));
            },
            (err) => {
                console.log(err);
            }
        );
    }

    render() {
        return (
            <video autoPlay src={this.state.video}/>
        );
    }
}

export default LocalVideo;
