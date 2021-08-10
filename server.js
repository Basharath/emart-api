const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const PORT = app.get('port');

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Started listening at ${PORT}`));
