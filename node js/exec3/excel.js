// 'https://reqres.in/api/users?page=1'
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name');

async function getUser() {
    const res = await fetch('https://reqres.in/api/users?page=1')
    users = await res.json();
    users = users.data
    console.log(users)
    
    const headingColumnNames = Object.keys(users[0])

    //Write Column Title in Excel file
    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    });

    rowIndex =2
    users.forEach( record => {
        let columnIndex = 1;
        Object.keys(record).forEach(columnName => {
          if (typeof(record[columnName]) == 'string') {
            ws.cell(rowIndex,columnIndex++)
          .string((record [columnName]))
          } else {
            ws.cell(rowIndex,columnIndex++)
          .number((record [columnName]))
          }
        });
        rowIndex++;
    }); 
    wb.write('data.xlsx');
  }

getUser()