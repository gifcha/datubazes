var pageName = location.href.split("/").slice(-1);
if (pageName != 'index.html') {
    checkLogin();
}


function checkLogin() {
    const session = sessionStorage.getItem("auth");
    console.log(session);
    if (session != 'true') {
        window.location.replace("index.html");
    }
}

function handleLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (username == 'admin' && password == '1234') {
        sessionStorage.setItem("auth", 'true');
        window.location.replace("ievads.html");
    }
    else {
        alert('Lietotāja vārds vai parole nav pareiza!');
    }
}