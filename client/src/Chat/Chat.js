import React, {Component} from 'react';
import './Chat.css';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            chat: []
        };

        this.textChange = this.textChange.bind(this);
        this.send = this.send.bind(this);
    }

    componentDidMount() {
        this.channel = this.props.rtc.createDataChannel('chat');

        this.props.rtc.ondatachannel = (event) => {
            const channel = event.channel;

            channel.onmessage = (event) => {
                this.state.chat.push(<li className="to">{event.data}</li>);
                this.setState({chat: this.state.chat});
            }
        }
    }

    textChange(event) {
        this.setState({text: event.target.value});
    }

    send() {
        this.state.chat.push(<li className="from">{this.state.text}</li>);
        this.setState({chat: this.state.chat});
        this.channel.send(this.state.text);
        this.state.text = '';
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.chat}
                </ul>
                <div>
                    <input type="text" value={this.state.text} onChange={this.textChange}/>
                    <input type="button" value="Sent" onClick={this.send}/>
                </div>
            </div>
        );
    }
}

export default Chat;