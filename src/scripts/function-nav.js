// src/scripts/function-nav.js

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    
    navMenu.classList.toggle('active');
    headerContent.classList.toggle('blur');
}

function closeMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const headerContent = document.querySelector('.header-content');
    
    navMenu.classList.remove('active');
    headerContent.classList.remove('blur');
}

function navigateToChallenge(type) {
    window.location.href = 'kategoritantangan.html?type=' + type;
}

function viewProfile() {
    // Menunggu perubahan status autentikasi pengguna
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Menampilkan informasi pengguna
            const profileContainer = document.createElement('div');
            profileContainer.classList.add('profile-button');
            
            profileContainer.innerHTML = `
                <h2>Profil Pengguna</h2>
                <p><strong>Nama:</strong> ${user.displayName || "N/A"}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <button id="logout-btn">Logout</button>
            `;

            // Hapus kontainer profil sebelumnya jika ada
            const existingProfileContainer = document.querySelector('.profile-container');
            if (existingProfileContainer) {
                existingProfileContainer.remove();
            }

            document.body.appendChild(profileContainer);

            // Menambahkan event listener untuk tombol logout
            document.getElementById('logout-btn').addEventListener('click', () => {
                firebase.auth().signOut().then(() => {
                    alert("Berhasil Logout");
                    // Menghapus kontainer profil setelah logout
                    profileContainer.remove();
                }).catch((error) => {
                    console.error("Error saat logout: ", error);
                    alert("Error saat logout: " + error.message);
                });
            });
        } else {
            alert("Tidak ada pengguna yang login");
        }
    });
}


function navigateToDetail(challengeName) {
    window.location.href = `detailtantangan.html?name=${encodeURIComponent(challengeName)}`;
}

// Make functions available globally
window.toggleMenu = toggleMenu;
window.closeMenu = closeMenu;
window.navigateToChallenge = navigateToChallenge;
window.viewProfile = viewProfile;
window.navigateToDetail = navigateToDetail;
