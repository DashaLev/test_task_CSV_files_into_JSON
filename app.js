const path = require('path');

const { transformFiles } = require('./helpers/transform-files');
const { createFolder } = require('./helpers/create-folders');

createFolder(__dirname)

const pathToZip = path.join(__dirname, 'input_directory');
const pathToJson = path.join(__dirname, 'output_directory');

transformFiles(pathToZip, pathToJson)
