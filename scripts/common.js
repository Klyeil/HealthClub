async function loadNavBar() {
    const navPlaceholder = document.getElementById('navPlaceholder');

    if (navPlaceholder) {
        try {
            const response = await fetch('../pages/navBar.html');
            if (response.ok) {
                const data = await response.text();
                navPlaceholder.innerHTML = data;

                checkLoginStatus();
                updateMenuByMembership();
                highlightCurrentMenu();
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
            <a href="mypage.html" class="authBtn mypage">${currentUser.name}님</a>
            <a href="#" id="navLogoutBtn" class="authBtn login" style="margin-left:10px;">로그아웃</a>
        `;

        document.getElementById('navLogoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

function updateMenuByMembership() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const userList = JSON.parse(localStorage.getItem('userList')) || [];
    const user = userList.find(u => u.id === currentUser.id);

    if (user && user.membership) {
        const healthLink = document.querySelector('a[href*="regHealthPage.html"]');

        if (healthLink) {
            healthLink.innerText = "PT 예약";
            healthLink.href = "../pages/ptBookingPage.html";
        }
    }
}

function highlightCurrentMenu() {
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.navItem');

    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            link.style.color = '#2ecc71';
            link.style.fontWeight = '800';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNavBar();
});