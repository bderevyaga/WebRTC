import React, {Component} from 'react';
import './Chat.css';

class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            chat: []
        };

        this.input = this.input.bind(this);
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

    input(event) {
        this.setState({text: event.target.value});
    }

    send() {
        this.channel.send(this.state.text);

        this.setState({
            chat: [...this.state.chat, <li className="from">{this.state.text}</li>],
            text: ''
        });
    }

    render() {
        return (
            <div className="chat">
                <ul>
                    {this.state.chat}
                </ul>
                <div>
                    <input type="text" value={this.state.text} onChange={this.input}/>
                    <input type="button" value="Sent" onClick={this.send}/>
                </div>
            </div>
        );
    }
}

export default Chat;