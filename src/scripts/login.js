const container = document.querySelector(".container");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        window.location.href = "homepage.html";
    } else {
        Landing();
    }
});

const Landing = () => {
    const element = document.createElement('div');
    element.classList.add('Landing');
    element.innerHTML = (`
        <a href="#" class="icon-back-1" id="backButton">
            <i class="fa-solid fa-arrow-left"></i>
        </a>
        <h1>Masuk</h1>
        <p>Masukkan Email dan Password yang telah kamu daftarkan!</p>
        <img src="../public/assets/svg/sign in-svg.svg" alt="login">
        <form>
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
                    <i class="fa-solid fa-lock"></i>
                </div>
            </div>
            <p class="forget-password-i"><a href="forgotpass.html" id="forgotpass">Lupa password?</a></p>
            <div class="btn-login">
                <button id="login" data-button="signin">Login</button>
            </div>
            <div class="separator">atau</div>
            <div class="btn-register">
                <button class="register-button" id="registerButton">Daftar</button>
            </div>
        </form>
    `);

    container.innerHTML = "";
    container.appendChild(element);

    const loginBtn = element.querySelector(`[data-button="signin"]`);
    loginBtn.onclick = async (e) => {
        e.preventDefault();  // Prevent form submission

        const email = element.querySelector("#email").value;
        const password = element.querySelector("#password").value;

        try {
            console.log("Attempting to sign in with email:", email);
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log("User signed in successfully:", user);

            const dt = new Date();
            const userRef = firebase.database().ref('user/' + user.uid);

            await userRef.update({
                last_login: dt.toString(),
            });

            console.log("Last login updated successfully");
            alert("Berhasil login");

        } catch (error) {
            console.error("Error during sign in or update:", error);
            alert("Daftar dulu ya!");
        }
    };

    const registerBtn = element.querySelector("#registerButton");
    registerBtn.onclick = (e) => {
        e.preventDefault();
        window.location.href = 'register.html';
    };

    const forgotpass = element.querySelector("#forgotpass");
    forgotpass.onclick = (e) => {
        e.preventDefault();
        const email = element.querySelector("#email").value;
        sendPasswordResetEmail(firebase.auth(), email)
        .then(() => {
            alert("Password reset email sent, check your inbox.");
         })
        .catch((error) => {
            alert(error);
         })
    };
};
