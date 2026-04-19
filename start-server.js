const { spawn } = require('child_process');
const server = spawn('node', ['server.js'], {
    cwd: 'E:\\Gateway Full Web 1\\Backend',
    stdio: 'inherit',
    detached: true
});

server.unref();
console.log('Server started');