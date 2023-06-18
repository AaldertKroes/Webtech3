const token = localStorage.getItem("token")
const data = atob(token.split('.')[1])
console.log(token);
console.log(data);
console.log(Object.keys(data))

// document.getElementById("submit").addEventListener('click', (evt) =>{
//     evt.preventDefault();
//
//     const data = new FormData(document.querySelector('form'));
//     const sendData = {"username":data.get("username"), "password":data.get("password")};
//
//     fetch('http://localhost:8000/api/login_check', {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(sendData)})
//         .then(res => (res.status === 401 ? invalidCredentials() : res.json()))
//         .then(json => localStorage.setItem("token", json.token))
//         .then(token => window.location.href = "http://localhost:9000/html/index.html");
//
//     var jwt = localStorage.getItem("token");
//     console.log(jwt);
//     //window.location.href = "http://localhost:9000/html/index.html";
// });

document.getElementById("submit").addEventListener('click', (evt) => {
    const data = new FormData(document.querySelector('form'));
    // const sendData = {"mail"}
    console.log(data)
})

// fetch('https://localhost:8000/api/players', {
//     method: "GET",
//     headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
// })
//     .then(res => (res.status === 201 ? res.json() : function () {}))
//     .then(json => console.log(json))

// console.log(atob(token. split('.')[1]))
