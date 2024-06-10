const container = document.querySelector(".container");

const comments = [
    {
        name: "Zee JKT 48",
        profilePic: "/src/public/assets/img/profil-1.jpg",
        comment: "This is a great website!"
    },
    {
        name: "Unknown",
        profilePic: "/src/public/assets/img/profil-1.jpg",
        comment: "I found this website very useful."
    },
    {
        name: "Bapakmu",
        profilePic: "/src/public/assets/img/profil-1.jpg",
        comment: "Amazing experience, highly recommend!"
    }
];

let currentIndex = 0;

function displayComment(index) {
    const commentContainer = document.getElementById('comment-container');
    const comment = comments[index];

    if (commentContainer) {
        commentContainer.innerHTML = `
            <img src="${comment.profilePic}" alt="${comment.name}">
            <h3>${comment.name}</h3>
            <p>"${comment.comment}"</p>
        `;
    }
}

const Landing = () => {
    const element = document.createElement('div');
    element.classList.add('Landing');
    element.innerHTML = (`
        <h1>Welcome</h1>
        <div id="comment-container"></div>
        <div class="navigation-buttons">
            <button id="prev-button">Previous</button>
            <button id="next-button">Next</button>
        </div>
        <button id="logout-button">Logout</button>
    `);

    container.innerHTML = "";
    container.appendChild(element);

    displayComment(currentIndex);

    const nextButton = element.querySelector('#next-button');
    const prevButton = element.querySelector('#prev-button');
    const logoutButton = element.querySelector('#logout-button');

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % comments.length;
        displayComment(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + comments.length) % comments.length;
        displayComment(currentIndex);
    });

    logoutButton.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            alert("Successfully logged out");
            location.reload();
        }).catch((error) => {
            alert(error.message);
        });
    });
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        Landing();
    } else {
        window.location.href = "login.html"; // Assuming you have a login page
    }
});
