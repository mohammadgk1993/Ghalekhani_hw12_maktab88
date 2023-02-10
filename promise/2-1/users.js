let users = []

for (let i of [1,2]) {
    fetch(`https://reqres.in/api/users?page=${i}`)
    .then(res => res.json())
    .then(responseData => {
        for (let i of responseData.data) {
            users.push(i)
        }
    })
}

console.log(users)

// (async () => {
//     const result = await fetch(`https://reqres.in/api/users?page=1`)
//     console.log(result)
// })()

// (async function() {
//     try {
//     const response = await fetch("https://reqres.in/api/users?page=1");
//     const data = await response.json();
//     console.log(data);
//     } catch (error) {
//     console.error(error);
//     }
//     })();