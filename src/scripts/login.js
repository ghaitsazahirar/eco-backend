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
        <button data-button="login" >Google Login</button>
        `);

    container.innerHTML = '';
    container.appendChild(element);

    const loginBtn = element.querySelector(`[data-button="login"]`);
    loginBtn.onclick = () => loginGoogle();

    const loginGoogle = () => {
        const provider =  new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
}