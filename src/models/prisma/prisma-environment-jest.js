const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const { execSync } = require('child_process');
const { resolve } = require('path');

const prismaCli = './node_modules/.bin/prisma';

require('dotenv').config({
    path: resolve(__dirname, '..', '.env.test')
})

class CustomEnvironment extends NodeEnvironment {
    constructor(config) {
        super(config);
        this.connectionString = `${process.env.DATABASE_URL}`
      }

      setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        execSync(`${prismaCli} migrate dev`) 
      }

     



}

module.exports = CustomEnvironment;

