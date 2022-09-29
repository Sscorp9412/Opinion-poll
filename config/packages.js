const fs = require('fs');
const system = require('./system');
const CONFIG = require('./configs.json');
const applicationPath = () => {
    const dirname = __dirname;
    const path = dirname.substring(0, dirname.indexOf(CONFIG.currentFolder));
    return {
        path: {
            frontend: path + CONFIG.frontend,
            backend: path + CONFIG.backend
        },
        currentDir: {
            path: __dirname,
            name: 'config'
        }
    }
}

global.application = applicationPath();

const writeBackendCommands = () => {
    const path = application.path;
    // backend command
    const CMD_BACKEND = `${CONFIG.CMD.GO_DIR} ${path.backend} ${CONFIG.CMD.AND} ${CONFIG.NPM.install} ${CONFIG.CMD.AND} ${CONFIG.CMD.BACK_DIR}`;
    // frontend command
    const CMD_FRONTEND = `${CONFIG.CMD.GO_DIR} ${path.frontend} ${CONFIG.CMD.AND} ${CONFIG.NPM.install} ${CONFIG.CMD.AND} ${CONFIG.CMD.BACK_DIR}`;
    return `${CMD_BACKEND + CONFIG.CMD.NEW_LINE + CMD_FRONTEND}`;
}

fs.writeFile(CONFIG.bashFileName, writeBackendCommands(), (err) => {
    if(err)
        throw err;
    else {
        const filepath = __dirname + '/' + CONFIG.bashFileName;
        system(`chmod +x ${filepath} && ${filepath}`).then((stdout) => {
            console.log(stdout);
        }).catch((error) => {
            console.log(error);
        })
    }
});