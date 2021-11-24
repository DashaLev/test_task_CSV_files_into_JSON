const fs = require('fs');
const JSZip = require('jszip');
const path = require('path');

const { normalizeRowOfDate, normalizeUser } = require('./helpers/user-data.normalize');

// const pathToZip = path.join(__dirname,'input_directory')
// const pathToJson = path.join(__dirname, 'output_directory');

// fs.readdir(pathToZip, function (err, data) {
//
//     if (err) {
//         console.error(err);
//         return;
//     }
//
//     data.forEach(element => {
//         const fileExtension = path.extname(element)
//
//         if (fileExtension !== '.zip') {
//             console.log(`You added ${fileExtension} file, only '.zip' allowed`);
//             return;
//         }
//
//         fs.readFile(path.join(pathToZip, element), function(err, data) {
//             if (err) {
//                 console.error(err);
//                 return;
//             }
//
//             JSZip.loadAsync(data).then(async function (zip) {
//
//                 let jsonArr = [];
//
//                 for (const file of Object.keys(zip.files)) {
//
//                     const fileData = await zip.file(file).async('string');
//
//                     const fileDataArr = fileData.split('\r\n');
//
//                     fileDataArr.pop();
//
//                     const headerFileData = normalizeRowOfDate(fileDataArr.shift());
//
//                     fileDataArr.forEach(function (dataItem) {
//
//                         const userObj = {}
//
//                         const rowUserData = normalizeRowOfDate(dataItem)
//
//                         for (let i = 0; i < headerFileData.length; i++) {
//                             userObj[headerFileData[i]] = rowUserData[i];
//                         }
//                         const normalizedUser = normalizeUser(userObj);
//
//                         jsonArr.push(normalizedUser);
//                     });
//                 }
//
//                 const data = JSON.stringify(jsonArr);
//
//                 fs.writeFile(path.join(pathToJson, 'users.json'), data,{ flag: 'a+' }, (err) => {
//                     if (err) {
//                         console.error(err)
//                     }
//                 })
//             });
//         });
//     })
// });

const pathToZip = path.join(__dirname, 'input_directory');
const pathToJson = path.join(__dirname, 'output_directory');

fs.readdir(pathToZip, function (err, data) {

    if (err) {
        console.error(err);
        return;
    }

    data.forEach(element => {
        const fileExtension = path.extname(element)

        if (fileExtension !== '.zip') {
            console.log(`You added ${fileExtension} file, only '.zip' allowed`);
            return;
        }

        fs.readFile(path.join(pathToZip, element), function(err, data) {
            if (err) {
                console.error(err);
                return;
            }

            JSZip.loadAsync(data).then(async function (zip) {

                let jsonArr = [];

                for (const file of Object.keys(zip.files)) {

                    const fileData = await zip.file(file).async('string');

                    const fileDataArr = fileData.split('\r\n');

                    fileDataArr.pop();

                    const headerFileData = normalizeRowOfDate(fileDataArr.shift());

                    fileDataArr.forEach(function (dataItem) {

                        const userObj = {}

                        const rowUserData = normalizeRowOfDate(dataItem)

                        for (let i = 0; i < headerFileData.length; i++) {
                            userObj[headerFileData[i]] = rowUserData[i];
                        }
                        const normalizedUser = normalizeUser(userObj);

                        jsonArr.push(normalizedUser);
                    });
                }

                const data = JSON.stringify(jsonArr);

                fs.writeFile(path.join(pathToJson, 'users.json'), data,{ flag: 'a+' }, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            });
        });
    });
});
