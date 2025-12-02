document.addEventListener('DOMContentLoaded', () => {
    const noticeData = [
        { id: 1, type: 'normal', title: '이번달 휴무일 안내', date: '2025.12.01', views: 1, content: "12 / 7, 14, 21, 25, 28일 휴무입니다." }
    ];

    const noticeList = document.getElementById('noticeList');
    if (noticeList) {
        noticeData.forEach(item => {
            const row = document.createElement('div');
            row.className = 'noticeItem';

            let titleHtml = item.title;
            if (item.type === 'notice') {
                titleHtml = `<span class="noticeTag">[공지]</span> ${item.title}`;
            }

            row.innerHTML = `
                <span class="colTitle">${titleHtml}</span>
                <span class="colDate">${item.date}</span>
                <span class="colViews">${item.views}</span>
            `;

            row.addEventListener('click', () => {
                window.location.href = `noticeDetailpage.html?id=${item.id}`;
            });

            noticeList.appendChild(row);
        });
    }

    const detailContainer = document.getElementById('noticeDetailContainer');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));

        const post = noticeData.find(item => item.id === postId);

        if (post) {
            document.getElementById('postTitle').innerText = post.title;
            document.getElementById('postDate').innerText = post.date;
            document.getElementById('postViews').innerText = `조회수 ${post.views}`;
            document.getElementById('postContent').innerText = post.content;

            if (post.type === 'notice') {
                document.getElementById('attachFileArea').style.display = 'flex';
            }
        } else {
            alert('존재하지 않는 게시글입니다.');
            window.location.href = 'noticePage.html';
        }
    }
});