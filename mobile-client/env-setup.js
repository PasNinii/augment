const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

exec('ls', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});

exec('pwd', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});

exec('echo $ANGULAR_OUTPUT_PATH', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
});

const writeJsonFile = (name = 'environment.json') => {
  const ENVIRONMENT_VARIABLES = {
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENT_ID,
    audience: process.env.AUDIENCE,
  };

  fs.writeFile(
    path.join(`${__dirname}/src/environments/${name}`),
    JSON.stringify(ENVIRONMENT_VARIABLES),
    (err) => {
      if (err) {
        throw new Error(err);
      }
    }
  );
};

writeJsonFile();
