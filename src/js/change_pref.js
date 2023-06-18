const token = localStorage.getItem("token")
const data = atob(token.split('.')[1])
const obj = JSON.parse(data)
console.log(obj["sub"])

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

// Aaldert's werk lmao
let currentPlayerId = JSON.parse(atob(localStorage.getItem("token").split('.')[1]))["sub"];
console.log(currentPlayerId);

// Set the two card colors.
let cardColor; let foundCardColor;

const closed_color_el = document.getElementById("card_color");
closed_color_el.addEventListener('input', () => cardColor = closed_color_el.value);

const found_color_el = document.getElementById("found_color");
found_color_el.addEventListener('input', () => foundCardColor = found_color_el.value);

// Set the requested api for images.
let api;
const picture_type = document.getElementById("pictures_shown");
picture_type.addEventListener('input', () => api = picture_type.value);

/**
 * Eventlistener on the 'save'-button to insert the preferences into the database.
 * After the data has been inserted, the user is redirected back to the game board.
 */
document.getElementById("save_preferences").addEventListener('click', (evt) => {
    let sendData = {"api":api, "color_found":foundCardColor, "color_closed":cardColor};

    fetch(`http://localhost:8000/api/player/${currentPlayerId}/preferences`, {
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body:JSON.stringify(sendData)
    })
    .then(res => (res.status === 200 ? console.log(res.json()) : console.log("nope")))
    .then(token => window.location.href = "http://localhost:9000/html/index.html");
});
