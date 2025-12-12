function switchTab(tabName) {
    const buttons = document.querySelectorAll('.tabBtn');

    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById('findIdForm').classList.remove('active');
    document.getElementById('findPwForm').classList.remove('active');

    if (tabName === 'findId') {
        document.getElementById('findIdForm').classList.add('active');
        buttons[0].classList.add('active');
    } else {
        document.getElementById('findPwForm').classList.add('active');
        buttons[1].classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const phoneInputs = ['id_phone', 'pw_phone'];

    phoneInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', (e) => {
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
    });


    const btnFindId = document.getElementById('btnFindId');

    if (btnFindId) {
        btnFindId.addEventListener('click', () => {
            const name = document.getElementById('id_name').value.trim();
            const phone = document.getElementById('id_phone').value.trim();

            if (!name || !phone) {
                alert('이름과 전화번호를 모두 입력해주세요.');
                return;
            }

            const userList = JSON.parse(localStorage.getItem('userList')) || [];
            const user = userList.find(u => u.name === name && u.phone === phone);

            if (user) {
                alert(`회원님의 아이디는 [ ${user.id} ] 입니다.`);
            } else {
                alert('일치하는 회원 정보를 찾을 수 없습니다.');
            }
        });
    }

    const btnResetPw = document.getElementById('btnResetPw');

    if (btnResetPw) {
        btnResetPw.addEventListener('click', () => {
            const id = document.getElementById('pw_id').value.trim();
            const name = document.getElementById('pw_name').value.trim();
            const phone = document.getElementById('pw_phone').value.trim();
            const newPw = document.getElementById('new_pw').value.trim();
            const newPwConfirm = document.getElementById('new_pw_confirm').value.trim();

            if (!id || !name || !phone || !newPw || !newPwConfirm) {
                alert('모든 정보를 입력해주세요.');
                return;
            }

            if (newPw !== newPwConfirm) {
                alert('새 비밀번호가 서로 일치하지 않습니다.');
                return;
            }

            if (newPw.length < 4) {
                alert('비밀번호는 4자리 이상이어야 합니다.');
                return;
            }

            const userList = JSON.parse(localStorage.getItem('userList')) || [];
            let userFound = false;

            const updatedList = userList.map(u => {
                if (u.id === id && u.name === name && u.phone === phone) {
                    userFound = true;
                    return { ...u, password: newPw };
                }
                return u;
            });

            if (userFound) {
                localStorage.setItem('userList', JSON.stringify(updatedList));
                alert('비밀번호가 성공적으로 변경되었습니다.\n로그인 페이지로 이동합니다.');
                window.location.href = 'loginPage.html';
            } else {
                alert('일치하는 회원 정보를 찾을 수 없습니다.\n입력하신 정보를 다시 확인해주세요.');
            }
        });
    }
});