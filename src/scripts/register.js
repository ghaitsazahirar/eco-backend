const container = document.querySelector(".container");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "homepage.html";
        Dashboard();
    } else {
        Landing();
    }
});

const Landing = () => {
    const element = document.createElement("div");
    element.classList.add("Landing");
    element.innerHTML = (`
        <a href="index.html" class="icon-back">
            <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1>Daftar</h1>
        <p>Daftarkan dirimu untuk pengalaman menarik lainnya!</p>
        <img src="../public/assets/img/register-img.png" alt="login">
        <div class="form-group-">
                <label for="name">Nama</label>
                <div class="form-group-login">
                    <input type="text" id="name" name="name" placeholder="Masukkan Nama" required>
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <div class="form-group-login">
                    <input type="email" id="email" name="email" placeholder="Masukkan Email" required>
                    <i class="fa-solid fa-envelope"></i>
                </div>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <div class="form-group-login">
                    <input type="password" id="password" name="password" placeholder="Masukkan Password" required>
                    <i class="fa-solid fa-unlock"></i>
                </div>
            </div>
        
        <div class="btn-register">
            <button data-button="register">Register</button>
            <button data-button="login">Google Login</button>
        </div>
    `);

    container.innerHTML = "";
    container.appendChild(element);

    const email = element.querySelector("#email");
    const password = element.querySelector("#password");

    const registerBtn = element.querySelector(`[data-button="register"]`);
    const loginBtn = element.querySelector(`[data-button="login"]`);

    registerBtn.onclick = () => {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((cred) => {
            alert(`Berhasil Membuat Akun ${cred.user.uid}`);
        })
        .catch((error) => {
            alert(error);
        });
    }

    loginBtn.onclick = () => {
        container.innerHTML = '';
        container.appendChild(element);
        loginBtn.onclick = () => loginGoogle();

        const loginGoogle = () => {
        const provider =  new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
    }
}

const Dashboard = (user) => {
    const element = document.createElement("div");
    element.classList.add("Dashboard");
    element.innerHTML = (`
        <button data-button="logout">Logout</button>
    `);

    container.innerHTML = "";
    container.appendChild(element);

    const logout = element.querySelector(`[data-button="logout"]`);
    logout.onclick = () => firebase.auth().signOut().then(() => {
        alert("Berhasil Logout");
    }).catch((err) => alert(err));
}