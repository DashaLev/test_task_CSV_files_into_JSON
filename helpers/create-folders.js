const fs = require('fs');
const path = require("path");

module.exports = {
    createFolder: (mkdirPath) => {
        const folders = ['input_directory', 'output_directory'];

        folders.forEach(folder => {

            try {
                if (!fs.existsSync(folder)){
                    fs.mkdir(path.join(mkdirPath, folder), {recursive: true}, err => {
                        if (err) return err;
                    });
                }
            } catch (err) {
                console.error(err)
            }

        });
    }
};

