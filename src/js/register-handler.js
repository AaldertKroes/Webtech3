document.getElementById("submit").addEventListener('click', (evt) => {
    evt.preventDefault();

    const data = new FormData(document.querySelector("form"));
    const sendData = {"username":data.get("username"), "email":data.get("email"), "password":data.get("password")};
    console.log(sendData);

    fetch('http://localhost:8000/register', {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(sendData)})
    .then(res => (res.status === 400 ? invalidRegister() : validRegister()));
    // .then(res => (res.status === 201 ? res.json() : invalidRegister()))
    // .then(json => localStorage.setItem("token", json.token))
    // .then(heh => console.log(localStorage.getItem("token")));
});

function validRegister(){
    document.getElementById("register-valid").innerHTML = "Registration completed, please head to the login page";
}

function invalidRegister(){
    document.getElementById("register-valid").innerHTML = "Registration could not be completed, please try again";
}