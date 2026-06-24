const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const file = fs.readFileSync(
    path.join(__dirname, '..', 'openapi.yaml'),
    'utf8'
);
const swaggerDocument = yaml.parse(file);

module.exports = swaggerDocument;
