const fs = require('fs');
const filePath = '"C:\Users\polin\Desktop\domashka\веб\lab4\text.txt"'; 
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Ошибка чтения файла:', err);
    return;
  }
  const reversedData = data.split('').reverse().join('');
  fs.writeFile(filePath, reversedData, (err) => {
    if (err) {
      console.error('Ошибка записи в файл:', err);
      return;
    }
    console.log('Готово');
  });
});