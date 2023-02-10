const fs = require('fs/promises')

async function phoneNumbers() {
    try {
        let names = await fs.readFile('names.txt','utf-8')
        let numbers = await fs.readFile('numbers.txt','utf-8')
        let result = []

        names = await names.split('\r\n')
        numbers = await numbers.split('\r\n')
        
        for (let i of names) {
            let counter = 0
            let personNumber = []
            for (let j of numbers) {
                if (i.slice(0,4) === j.slice(0,4)) {
                    counter += 1
                    personNumber.push(j.split('- ')[1])
                }
            }

            if (counter == 1) {
                result.push(`${i.split('- ')[1]}'s phone number is ${personNumber[0]}`)
            } else if (counter > 1) {
                result.push(`${i.split('- ')[1]}'s phone numbers are ${personNumber.join(', ')}`)
            } else {
                result.push(`${i.split('- ')[1]} hasn't any phone number`)
            }
        }
        console.log(result)
        await fs.writeFile('result.txt',result.join('\n'),'utf-8')
    } catch(err) {
        console.log(err)
    }
}

phoneNumbers()