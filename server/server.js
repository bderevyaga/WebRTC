const WebSocketServer = require('ws').Server;

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({port: PORT});

const users = {};

wss.on('connection', (connection) => {
    connection.name = Math.random().toString(36).substring(2);
    users[connection.name] = {
        con: connection
    };

    console.log("User connected: ", connection.name);

    connection.on('message', (message) => {
        const meg = JSON.parse(message);

        console.log(connection.name, meg.type, meg.data);

        switch(meg.type) {
            case 'ready':
                users[connection.name].ready = true;
                break;
            case 'offer':
                send(users[users[connection.name].friend].con, {
                    type: 'offer',
                    data: meg.data
                });
                break;
            case 'candidate':
                send(users[users[connection.name].friend].con, {
                    type: 'candidate',
                    data: meg.data
                });
                break;
            case 'answer':
                send(users[users[connection.name].friend].con, {
                    type: 'answer',
                    data: meg.data
                });
                break;
                
            default:
                break;
        }

    });

    connection.on("close", () => {
        delete users[connection.name];

        console.log("User close: ", connection.name);
    });
});

setInterval(() => {
    const ready = Object.keys(users).filter((key) => users[key].ready);

    if (ready.length > 1) {
        const user1 = ready.splice(Math.floor(Math.random() * ready.length), 1)[0];
        const user2 = ready.splice(Math.floor(Math.random() * ready.length), 1)[0];

        users[user1].ready = false;
        users[user2].ready = false;

        users[user1].friend = user2;
        users[user2].friend = user1;

        send(users[user1].con, {
            type: 'init'
        });
    }
}, 500);

function send(connection, message) {
    connection.send(JSON.stringify(message));
}
