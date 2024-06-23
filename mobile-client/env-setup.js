const fs = require('fs');
const path = require('path');

const writeJsonFile = (name = 'environment.json') => {
  const ENVIRONMENT_VARIABLES = {
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENT_ID,
    audience: process.env.AUDIENCE,
  };

  console.log(__dirname);
  console.log(ENVIRONMENT_VARIABLES);

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
