let users = []

for (let i of [1,2]) {
    fetch(`https://reqres.in/api/users?page=${i}`)
    .then(res => console.log(res))
    .then(responseData => {
        for (let i of responseData.data) {
            users.push(i)
        }
    })
}

console.log(users)