async function loadNavBar() {
    const navPlaceholder = document.getElementById('navPlaceholder');

    if (navPlaceholder) {
        try {
            const response = await fetch('navBar.html');
            if (response.ok) {
                const data = await response.text();
                navPlaceholder.innerHTML = data;
            } else {
                console.error('Failed to load navBar.html');
            }
        } catch (error) {
            console.error('Error loading navigation:', error);
        }
    }
}

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', () => {
    loadNavBar();
});