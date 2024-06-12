document.addEventListener('DOMContentLoaded', () => {
    fetch('../public/data/challenges.json')
        .then(response => response.json())
        .then(data => {
            const dailyChallenge = getRandomChallenge(data.daily);
            const baseChallenge = getRandomChallenge(data.base);
            const weeklyChallenge = getRandomChallenge(data.weekly);

            if (dailyChallenge) displayChallenge(dailyChallenge, 'daily');
            if (baseChallenge) displayChallenge(baseChallenge, 'base');
            if (weeklyChallenge) displayChallenge(weeklyChallenge, 'weekly');
        })
        .catch(error => console.error('Error loading challenges:', error));

    // Check if user is logged in and update profile
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Jika pengguna sudah login, panggil viewProfile untuk menampilkan profil
            viewProfile();
        } else {
            console.log("Tidak ada pengguna yang login.");
        }
    });
});

function getRandomChallenge(challenges) {
    if (!challenges || challenges.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
}

function displayChallenge(challenge, type) {
    const recommendationContainer = document.getElementById('challenge-recommendations');
    if (!recommendationContainer) {
        console.error('Element with ID "challenge-recommendations" not found.');
        return;
    }

    const challengeDiv = document.createElement('div');
    challengeDiv.classList.add('challenge-recommendation-container-homepage');

    challengeDiv.innerHTML = `
        <div class="recommendation-challenge" onclick="navigateToDetail('${challenge.name}')">
            <div class="recommendation-challenge-text">
                <h3 class="kind-of-challenge-${type}">${challenge.kind}</h3>
                <h2>${challenge.name}</h2>
                <p>${challenge.description}</p>
            </div>
            <div class="recommendation-challenge-images">
                <img src="${challenge.image}" alt="">
            </div>
        </div>
    `;

    recommendationContainer.appendChild(challengeDiv);
}

function viewProfile() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const userId = user.uid;
            const userRef = firebase.database().ref('users/' + userId);

            userRef.once('value').then(snapshot => {
                const userData = snapshot.val();
                if (userData) {
                    document.getElementById("username").textContent = userData.name || "User";
                    document.getElementById("userPoints").textContent = userData.points || 0;
                    
                    const profileElement = document.createElement('div');
                    profileElement.classList.add('profile-details');
                    profileElement.innerHTML = `
                        <p>Name: ${userData.name}</p>
                        <p>Email: ${user.email}</p>
                        <button onclick="logout()">Logout</button>
                    `;

                    document.getElementById("profile").appendChild(profileElement);
                }
            }).catch(error => {
                console.error("Error retrieving user data: ", error);
            });
        } else {
            console.log("No user is signed in.");
        }
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        alert("Berhasil Logout");
        window.location.href = "index.html";
    }).catch(error => {
        console.error("Error signing out: ", error);
    });
}

// Make functions available globally
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;
window.navigateToDetail = navigateToDetail;
window.logout = logout;
