document.addEventListener('DOMContentLoaded', () => {
    const lockerGrid = document.getElementById('lockerGrid');
    const selectionInfo = document.getElementById('selectionInfo');
    const registerForm = document.getElementById('registerForm');
    const selectedLockerNum = document.getElementById('selectedLockerNum');
    const lockerPassword = document.getElementById('lockerPassword');
    const registerBtn = document.getElementById('registerBtn');

    let currentSelected = null;

    const totalLockers = 42;
    const occupiedLockers = [3, 7, 12, 15, 22, 28, 33, 40];

    for (let i = 1; i <= totalLockers; i++) {
        const div = document.createElement('div');
        div.className = 'lockerItem';
        div.innerText = i;

        if (occupiedLockers.includes(i)) {
            div.classList.add('occupied');
            div.title = '사용중';
        } else {
            div.addEventListener('click', () => selectLocker(i, div));
        }

        lockerGrid.appendChild(div);
    }

    function selectLocker(num, element) {
        if (currentSelected) {
            currentSelected.classList.remove('selected');
        }

        currentSelected = element;
        currentSelected.classList.add('selected');

        selectionInfo.style.display = 'none';
        registerForm.style.display = 'block';
        selectedLockerNum.innerText = `No. ${num}`;

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

        const pwd = lockerPassword.value;
        if (pwd.length !== 4) {
            alert('비밀번호 숫자 4자리를 입력해주세요.');
            return;
        }

        const lockerNumber = selectedLockerNum.innerText.replace('No. ', '');

        if (confirm(`${lockerNumber}번 사물함을 등록하시겠습니까?\n(1개월 무료 이용)`)) {
            const userList = JSON.parse(localStorage.getItem('userList')) || [];

            const updatedList = userList.map(user => {
                if (user.id === currentUser.id) {
                    const today = new Date();
                    const endDate = new Date(today);
                    endDate.setMonth(today.getMonth() + 1);

                    return {
                        ...user,
                        locker: {
                            number: parseInt(lockerNumber),
                            password: pwd,
                            startDate: today.toISOString(),
                            endDate: endDate.toISOString()
                        }
                    };
                }
                return user;
            });

            localStorage.setItem('userList', JSON.stringify(updatedList));

            alert('사물함 등록이 완료되었습니다.');
            window.location.href = '../pages/myPage.html';
        }
    });
});