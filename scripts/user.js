const initialUserList = [
    {
        id: "test",
        password: "123",
        name: "김헬스",
        phone: "010-1234-5678",
        joinedAt: "2024-01-01T12:00:00.000Z",
        membership: {
            type: "12개월 이용권",
            price: "116,000원",
            method: "카드",
            startDate: "2024-01-01T00:00:00.000Z",
            endDate: "2024-12-31T00:00:00.000Z"
        },
        locker: {
            number: 101,
            password : "4829",
            startDate: "2024-01-01T00:00:00.000Z",
            endDate: "2024-12-31T00:00:00.000Z"
        }
    },
    {
        id: "admin",
        password: "admin",
        name: "관리자",
        phone: "010-0000-0000",
        joinedAt: "2024-01-01T00:00:00.000Z"
    }
];

function initUserList() {
    const existingData = localStorage.getItem('userList');
    if (!existingData && typeof initialUserList !== 'undefined') {
        localStorage.setItem('userList', JSON.stringify(initialUserList));
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    alert('로그아웃 되었습니다.');
    window.location.href = '../pages/index.html';
}

function formatDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

document.addEventListener('DOMContentLoaded', () => {
    initUserList();
    const userPhoneInput = document.getElementById('userPhone');
    if (userPhoneInput) {
        userPhoneInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/[^0-9]/g, '');

            if (val.length > 11) {
                val = val.substring(0, 11);
            }

            let result = '';
            if (val.length < 4) {
                result = val;
            } else if (val.length < 8) {
                result = val.substr(0, 3) + '-' + val.substr(3);
            } else {
                result = val.substr(0, 3) + '-' + val.substr(3, 4) + '-' + val.substr(7);
            }

            e.target.value = result;
        });
    }


    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userId = document.getElementById('userId').value;
            const userPassword = document.getElementById('userPassword').value;
            const userName = document.getElementById('userName').value;
            const userPhone = document.getElementById('userPhone').value;

            const newUser = {
                id: userId,
                password: userPassword,
                name: userName,
                phone: userPhone,
                joinedAt: new Date().toISOString()
            };

            const existingUsers = JSON.parse(localStorage.getItem('userList')) || [];

            if (existingUsers.some(user => user.id === userId)) {
                alert('이미 존재하는 아이디입니다.');
                return;
            }

            existingUsers.push(newUser);
            localStorage.setItem('userList', JSON.stringify(existingUsers));

            alert('회원가입이 완료되었습니다.');
            window.location.href = 'loginPage.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userIdInput = document.getElementById('userId').value;
            const userPasswordInput = document.getElementById('userPassword').value;
            // const expiryTime = 12 * 60 * 60 * 1000;
            // const nowTime = new Date().getDate();

            const userList = JSON.parse(localStorage.getItem('userList')) || [];
            const user = userList.find(u => u.id === userIdInput && u.password === userPasswordInput);

            if (user) {
                const currentUser = { id: user.id, name: user.name, phone: user.phone };
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                alert(`${user.name}님 환영합니다!`);
                window.location.href = '../pages/index.html';
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        });
    }

    const profileNameElement = document.getElementById('profileName');

    if (profileNameElement) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '../pages/loginPage.html';
            return;
        }

        const userList = JSON.parse(localStorage.getItem('userList')) || [];
        const myData = userList.find(u => u.id === currentUser.id) || currentUser;

        if(document.getElementById('profileName')) document.getElementById('profileName').innerText = myData.name;
        if(document.getElementById('profileId')) document.getElementById('profileId').innerText = `@${myData.id}`;
        if(document.getElementById('profilePhone')) document.getElementById('profilePhone').innerText = myData.phone || '-';

        if (myData.joinedAt && document.getElementById('profileJoinDate')) {
            document.getElementById('profileJoinDate').innerText = formatDate(new Date(myData.joinedAt));
        }


        const membershipContent = document.getElementById('membershipContent');
        const noMembershipContent = document.getElementById('noMembershipContent');

        if (myData.membership) {
            if(membershipContent) membershipContent.style.display = 'block';
            if(noMembershipContent) noMembershipContent.style.display = 'none';

            const startDate = new Date(myData.membership.startDate);
            const endDate = new Date(myData.membership.endDate);
            const today = new Date();
            const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

            if(document.getElementById('planName')) document.getElementById('planName').innerText = myData.membership.type;
            if(document.getElementById('planPeriod')) document.getElementById('planPeriod').innerText = `${formatDate(startDate)} ~ ${formatDate(endDate)}`;
            if(document.getElementById('planPrice')) document.getElementById('planPrice').innerText = myData.membership.price;
            if(document.getElementById('planMethod')) document.getElementById('planMethod').innerText = myData.membership.method;

            const dDayBadge = document.getElementById('dDayBadge');

            if (dDayBadge) {
                if (diffDays > 0) {
                    dDayBadge.innerText = `D-${diffDays}`;
                    dDayBadge.style.backgroundColor = "#2ecc71";
                } else if (diffDays === 0) {
                    dDayBadge.innerText = "Today";
                    dDayBadge.style.backgroundColor = "#2ecc71";
                } else {
                    dDayBadge.innerText = "만료됨";
                    dDayBadge.style.backgroundColor = "#e74c3c";
                }
            }
        } else {
            if(membershipContent) membershipContent.style.display = 'none';
            if(noMembershipContent) noMembershipContent.style.display = 'block';
        }

        if (document.getElementById('ptCountDisplay')) {
            const count = myData.ptCount || 0;
            document.getElementById('ptCountDisplay').innerText = `${count}회`;
        }

        const lockerContent = document.getElementById('lockerContent');
        const lockerVoucherContent = document.getElementById('lockerVoucherContent');
        const noLockerContent = document.getElementById('noLockerContent');
        const lockerStatusBadge = document.getElementById('lockerStatusBadge');

        if(lockerContent) lockerContent.style.display = 'none';
        if(lockerVoucherContent) lockerVoucherContent.style.display = 'none';
        if(noLockerContent) noLockerContent.style.display = 'none';
        if(lockerStatusBadge) lockerStatusBadge.style.display = 'none';

        if (myData.locker) {
            if (myData.locker.number) {
                if(lockerContent) lockerContent.style.display = 'block';
                if(lockerStatusBadge) {
                    lockerStatusBadge.style.display = 'inline-block';
                    lockerStatusBadge.innerText = '사용중';
                }

                if(document.getElementById('lockerNumber')) document.getElementById('lockerNumber').innerText = `No. ${myData.locker.number}`;
                if(document.getElementById('lockerPassword')) document.getElementById('lockerPassword').innerText = myData.locker.password || "****";

                if(document.getElementById('lockerPeriod')) {
                    const lStart = new Date(myData.locker.startDate);
                    const lEnd = new Date(myData.locker.endDate);
                    document.getElementById('lockerPeriod').innerText = `${formatDate(lStart)} ~ ${formatDate(lEnd)}`;
                }
            }
            else {
                if(lockerVoucherContent) lockerVoucherContent.style.display = 'block';
                if(lockerStatusBadge) {
                    lockerStatusBadge.style.display = 'inline-block';
                    lockerStatusBadge.innerText = '미등록';
                    lockerStatusBadge.style.backgroundColor = '#f1c40f';
                    lockerStatusBadge.style.color = '#fff';
                }
            }
        }
        else {
            if(noLockerContent) noLockerContent.style.display = 'block';
        }

        const ptReservationList = document.getElementById('ptReservationList');
        const noPtReservation = document.getElementById('noPtReservation');

        if (ptReservationList && noPtReservation) {
            if (myData.reservations && myData.reservations.length > 0) {
                noPtReservation.style.display = 'none';
                ptReservationList.innerHTML = '';

                const sortedList = myData.reservations.sort((a, b) => new Date(b.date) - new Date(a.date));

                sortedList.forEach(res => {
                    const div = document.createElement('div');
                    div.className = 'ptItem';
                    div.innerHTML = `
                        <div class="ptInfoLeft">
                            <span class="ptDate">${res.date}</span>
                            <span class="ptTime">${res.time}</span>
                            <span class="ptTrainer">트레이너: ${res.trainer}</span>
                        </div>
                        <span class="ptStatus">예약확정</span>
                    `;
                    ptReservationList.appendChild(div);
                });
            } else {
                ptReservationList.innerHTML = '';
                noPtReservation.style.display = 'block';
            }
        }
    }

    const myPageLogoutBtn = document.getElementById('myPageLogoutBtn');
    if (myPageLogoutBtn) {
        myPageLogoutBtn.addEventListener('click', () => {
            logout();
        });
    }
});