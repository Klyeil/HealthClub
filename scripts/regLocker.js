document.addEventListener('DOMContentLoaded', () => {
    const lockerGrid = document.getElementById('lockerGrid');
    const selectionInfo = document.getElementById('selectionInfo');
    const registerForm = document.getElementById('registerForm');
    const selectedLockerNum = document.getElementById('selectedLockerNum');
    const lockerPassword = document.getElementById('lockerPassword');
    const registerBtn = document.getElementById('registerBtn');

    let selectedLockerId = null;
    const occupiedLockers = [102, 105, 108, 115, 120, 122, 130, 135];

    function createLockerGrid() {
        for (let i = 1; i <= 36; i++) {
            const lockerId = 100 + i;
            const lockerDiv = document.createElement('div');
            lockerDiv.classList.add('lockerItem');
            lockerDiv.innerText = lockerId;
            lockerDiv.dataset.id = lockerId;

            if (occupiedLockers.includes(lockerId)) {
                lockerDiv.classList.add('occupied');
            } else {
                lockerDiv.addEventListener('click', () => selectLocker(lockerId));
            }

            lockerGrid.appendChild(lockerDiv);
        }
    }

    function selectLocker(id) {
        document.querySelectorAll('.lockerItem').forEach(item => item.classList.remove('selected'));

        const target = document.querySelector(`.lockerItem[data-id="${id}"]`);
        if (target) target.classList.add('selected');

        selectedLockerId = id;
        selectionInfo.style.display = 'none';
        registerForm.style.display = 'block';
        selectedLockerNum.innerText = `No. ${id}`;
        lockerPassword.value = '';
        lockerPassword.focus();
    }

    registerBtn.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = 'loginPage.html';
            return;
        }

        const password = lockerPassword.value;
        if (password.length !== 4) {
            alert('비밀번호 4자리를 입력해주세요.');
            return;
        }

        if (confirm(`${selectedLockerId}번 사물함을 등록하시겠습니까?`)) {
            const userList = JSON.parse(localStorage.getItem('userList')) || [];

            const updatedList = userList.map(user => {
                if (user.id === currentUser.id) {
                    return {
                        ...user,
                        locker: {
                            number: selectedLockerId,
                            password: password,
                            startDate: new Date().toISOString(),
                            endDate: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString()
                        }
                    };
                }
                return user;
            });

            localStorage.setItem('userList', JSON.stringify(updatedList));

            alert('사물함 등록이 완료되었습니다.');
            window.location.href = 'mypage.html';
        }
    });

    createLockerGrid();
});