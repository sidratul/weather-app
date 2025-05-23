const fs = require('fs');
const dotenv = require('dotenv');

const envFile = '.env';
const targetPath = `./src/environments/environment.ts`;

dotenv.config({ path: envFile });

const envVars = process.env;

const environmentFileContent = `
export const environment = {
  ${
    Object.keys(envVars)
      .map(key => `${key}: '${envVars[key]}'`)
      .join(',\n      ')
  }
};
`;

fs.writeFileSync(targetPath, environmentFileContent);

console.log(`Environment variables written to ${targetPath}`);
