const fs = require('fs');

const newLine = "Це новий рядок для додавання до файлу.\n";


function appendToFile(filePath, data) {
    fs.appendFile(filePath, data, (err) => {
        if (err) throw err;
        console.log('Рядок успішно додано до файлу.');
    });
}


const filePath = 'text.txt';


appendToFile(filePath, newLine);
