const fs = require('fs');
const path = require('path');
const { spawn } = require('node:child_process');

function goInsideRecursively(dir, parentPath = __dirname) {
    const children = [];
    dir.forEach((d) => {
        if (['node_modules', '.idea', '.git'].includes(d)) {
            return;
        }
        if (fs.lstatSync(path.join(parentPath, d)).isDirectory()) {
            children.push(d);
        } else {
            if (d === 'package.json') {
                console.log('npm update called at', path.join(parentPath, d));
                const ls = spawn((process.platform === 'win32' ? 'npm.cmd' : 'npm'), ['install', '--package-lock-only'], { cwd: parentPath });
                ls.stdout.on('data', (data) => {
                    console.log(`${path.join(parentPath, d)} install: ${data}`);
                });
                ls.stderr.on('data', (data) => {
                    console.error(`${path.join(parentPath, d)} stderr: ${data}`);
                });
                ls.stdout.on('close', () => {
                    const ls2 = spawn((process.platform === 'win32' ? 'npm.cmd' : 'npm'), ['audit', 'fix'], { cwd: parentPath });
                    ls2.stdout.on('data', (data) => {
                        console.log(`${path.join(parentPath, d)} audit: ${data}`);
                    });
                    ls2.stderr.on('data', (data) => {
                        console.error(`${path.join(parentPath, d)} stderr: ${data}`);
                    })
                });
            }
        }
    })
    children.forEach((c) => {
        const dir = fs.readdirSync(path.join(parentPath, c));
        goInsideRecursively(dir, path.join(parentPath, c));
    });
}

const dir = fs.readdirSync('.');
goInsideRecursively(dir);
