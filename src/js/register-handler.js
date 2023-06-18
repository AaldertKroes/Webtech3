document.getElementById("submit").addEventListener('click', (evt) => {
    evt.preventDefault();

    const data = new FormData(document.querySelector("form"));
    const sendData = {"username":data.get("username"), "email":data.get("email"), "password":data.get("password")};

    fetch("http://localhost:8000/register", {method:'POST', headers:{"Content-Type":"application/json"}, body:JSON.stringify(sendData)})
    .then(res => (res.status === 201 ? res.json() : invalidRegister()))
    .then(json => localStorage.setItem("token", json.token))
    .then(heh => console.log(localStorage.getItem("token")));
});

function invalidRegister(){
    document.getElementById("invalid-register").innerHTML = "Registration could not be completed, please try again";
}