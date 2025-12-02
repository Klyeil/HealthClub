async function loadNavBar() {
    const navPlaceholder = document.getElementById('navPlaceholder');

    if (navPlaceholder) {
        try {
            const response = await fetch('navBar.html');
            if (response.ok) {
                const data = await response.text();
                navPlaceholder.innerHTML = data;

                checkLoginStatus();
            } else {
                console.error('Failed to load navBar.html');
            }
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }
}

function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const rightMenu = document.querySelector('.rightMenu');

    if (currentUser && rightMenu) {
        rightMenu.innerHTML = `
            <a href="../pages/myPage.html">마이페이지</a>
            <span class="divider">|</span>
            <a href="../pages/index.html" id="navLogoutBtn">로그아웃</a>
        `;

        document.getElementById('navLogoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            alert('로그아웃 되었습니다.');
            window.location.href = 'index.html';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavBar();
});