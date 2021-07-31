const app = require('./app');
const http = require('http');

app.set('port', process.env.PORT || 3000);
const PORT = app.get('port');

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Started listening at ${PORT}`));
