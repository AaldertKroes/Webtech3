document.getElementById("submit").addEventListener('click', (evt) =>{
    evt.preventDefault();

    const data = new FormData(document.querySelector('form'));
    const sendData = {"username":data.get("username"), "password":data.get("password")};
    
    fetch('http://localhost:8000/api/login_check', {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(sendData)})
    .then(res => (res.status === 401 ? invalidCredentials() : res.json()))
    .then(json => localStorage.setItem("token", json.token));

    var jwt = localStorage.getItem("token");
    console.log(jwt);
});

/**
 * A method to let the user know the login credentials do not match a record in the database.
 */
function invalidCredentials(){
    document.getElementById("invalid-credentials").innerHTML = "Username and Password do not match.";
}