const fs = require('fs');
const fse = require('fs-extra');
const childProcess = require('child_process');

//Cleanup
console.log('Cleaning up old build files');
if (fs.existsSync('./dist')) {
  fse.removeSync('./dist');
}
if (fs.existsSync('./client/build')) {
  fse.removeSync('./client/build');
}

if (fs.existsSync('./server/dist')) {
  fse.removeSync('./server/dist');
}
console.log('Creating new Build');
//Build UI and Server
// childProcess.execSync('babel server/src/index.js --out-dir dist', { stdio: "inherit" });
// childProcess.execSync('cd client && react-scripts build', { stdio: 'inherit' });
// childProcess.execSync('cd server && babel ./src --out-dir dist', { stdio: 'inherit' });

// console.log('Moving build to dist folder');
// //Move built code of UI and Server
// fse.moveSync('./client/build', './dist/client', { overwrite: true });
// fse.copyFileSync('./server', './dist/server', { overwrite: true });
