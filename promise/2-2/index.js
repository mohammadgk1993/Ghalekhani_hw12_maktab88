const fs = require('fs')

function readFile() {
    return new Promise((resolve,reject) => {
        fs.readFile('user-data.json','utf-8',function(err,data) {
            if (err) reject(err)
            resolve(data)
        })
    })
}

function writeFile(newData) {
    return new Promise((resolve,reject) => {
        fs.writeFile('user-data.json',newData,function(err,data) {
            if (err) reject(err)
            else {
                resolve(data)
            }
        })
    })
}

function deleteUser(userId) {
    let newData
    readFile().then(data => {
        if (JSON.parse(data).some(user => user.uid == userId)) {
            newData = JSON.parse(data).filter(user => user.uid != userId)
            writeFile(JSON.stringify(newData))
        } else {
            console.log('Invalid uid or input Type (input must be type of number)')
        }
    })
}

function createUser(newUser) {
    let newData
    readFile().then(data => {
        if (Object.keys(newUser).length == Object.keys(JSON.parse(data)[0]).length) {
            if (Object.keys(newUser).every((item,index) => item == Object.keys(JSON.parse(data)[0])[index])) {
                if (JSON.parse(data).some(user => user.uid == newUser.uid && !isNaN(newUser.uid))) {
                    console.log('this uid is already exist or the Entered uid is not a Number!')
                } else if (JSON.parse(data).some(user => user.uid != newUser.uid || !isNaN(newUser.uid))){
                    newData = JSON.parse(data)
                    newData.push(newUser)
                    writeFile(JSON.stringify(newData))
                }
            } else {
                console.log('invalid keys')
            }
        } else {
            console.log('input must be object and have a length of 6')
        }
    })
}

function updateUser(newUser) {
    let newData
    readFile().then(data => {
        if (Object.keys(newUser).length == Object.keys(JSON.parse(data)[0]).length) {
            if (Object.keys(newUser).every((item,index) => item == Object.keys(JSON.parse(data)[0])[index])) {
                if (JSON.parse(data).some(user => user.uid == newUser.uid && !isNaN(newUser.uid))) {
                    newData = JSON.parse(data)
                    let replaceIndex = newData.findIndex(item => item.uid == newUser.uid)
                    newData.splice(replaceIndex,1,newUser)
                    writeFile(JSON.stringify(newData))
                } else {
                    console.log('this uid is not exist or the Entered uid is not a Number!')
                }
            } else {
                console.log('invalid keys')
            }
        } else {
            console.log('input must be object and have a length of 6')
        }
    })
}

// readFile()

// deleteUser(112233)

// createUser(
//     {"uid":119933,
// "firstname":"ali",
// "lastname":"ahmadi",
// "city":"abhar",
// "postalCode":"3345673232",
// "phoneNumber":"04111334452",
// "position":"analyzer"
// })

// updateUser({
//      "uid": 112233,
//      "firstname": "amirhossein",
//      "lastname": "kazemi nia",
//      "city": "isfahan",
//      "postalCode": "2345672345",
//      "phoneNumber": "03111234234",
//      "position": "ui designer",
// })