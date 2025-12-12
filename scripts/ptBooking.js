document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 가져오기
    const trainerList = document.getElementById('trainerList');
    const timeGrid = document.getElementById('timeGrid');
    const submitBtn = document.getElementById('submitBtn');

    const dateTrigger = document.getElementById('dateTrigger');
    const calendarPopup = document.getElementById('calendarPopup');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const bookingCalGrid = document.getElementById('bookingCalGrid');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const dateConfirmBtn = document.getElementById('dateConfirmBtn');

    const dispTrainer = document.getElementById('displayTrainer');
    const dispDate = document.getElementById('displayDate');
    const dispTime = document.getElementById('displayTime');

    let selectedTrainer = null;
    let selectedDate = null;
    let selectedTime = null;

    let tempSelectedDateStr = null;
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    const trainers = [
        { id: 't1', name: '최영우', position: '팀장', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1740&auto=format&fit=crop' },
        { id: 't2', name: '최정원', position: '시니어', img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1740&auto=format&fit=crop' },
        { id: 't3', name: '김민기', position: '트레이너', img: 'https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?q=80&w=1587&auto=format&fit=crop' }
    ];

    trainers.forEach(t => {
        const div = document.createElement('div');
        div.className = 'trainerItem';
        div.innerHTML = `
            <div class="tProfile"><img src="${t.img}" alt="${t.name}"></div>
            <div class="tName">${t.name}</div>
            <div class="tPos">${t.position}</div>
        `;
        div.addEventListener('click', () => selectTrainer(t.id, t.name, div));
        trainerList.appendChild(div);
    });

    for (let i = 9; i <= 22; i++) {
        const timeStr = `${String(i).padStart(2, '0')}:00`;
        const btn = document.createElement('button');
        btn.className = 'timeBtn';
        btn.innerText = timeStr;
        btn.addEventListener('click', () => selectTime(timeStr, btn));
        timeGrid.appendChild(btn);
    }


    function selectTrainer(id, name, element) {
        selectedTrainer = { id, name };
        document.querySelectorAll('.trainerItem').forEach(item => item.classList.remove('selected'));
        element.classList.add('selected');
        dispTrainer.innerText = `${name} ${trainers.find(t=>t.id===id).position}`;
        checkFormValidity();
    }

    dateTrigger.addEventListener('click', () => {
        calendarPopup.style.display = 'block';
        renderCalendar(currentYear, currentMonth);
    });


    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    function renderCalendar(year, month) {
        bookingCalGrid.innerHTML = '';
        currentMonthYear.innerText = `${year}. ${String(month + 1).padStart(2, '0')}`;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        for (let i = 0; i < firstDay; i++) {
            const div = document.createElement('div');
            bookingCalGrid.appendChild(div);
        }

        for (let i = 1; i <= lastDate; i++) {
            const div = document.createElement('div');
            div.className = 'calCell';
            div.innerText = i;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const checkDate = new Date(year, month, i);

            if (checkDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                div.classList.add('disabled');
            } else {
                div.addEventListener('click', () => {
                    document.querySelectorAll('.calCell').forEach(c => c.classList.remove('selected'));
                    div.classList.add('selected');
                    tempSelectedDateStr = dateStr;
                });
            }

            if (dateStr === todayStr) div.classList.add('today');
            if (dateStr === tempSelectedDateStr) div.classList.add('selected');

            bookingCalGrid.appendChild(div);
        }
    }

    dateConfirmBtn.addEventListener('click', () => {
        if (tempSelectedDateStr) {
            selectedDate = tempSelectedDateStr;
            dateTrigger.value = selectedDate;
            dispDate.innerText = selectedDate;

            selectedTime = null;
            dispTime.innerText = '시간을 다시 선택해주세요';
            document.querySelectorAll('.timeBtn').forEach(btn => btn.classList.remove('selected'));

            checkFormValidity();
            calendarPopup.style.display = 'none';
        } else {
            alert('날짜를 선택해주세요.');
        }
    });

    function selectTime(time, element) {
        if (!selectedDate) {
            alert('날짜를 먼저 선택해주세요.');
            dateTrigger.click();
            return;
        }
        selectedTime = time;
        document.querySelectorAll('.timeBtn').forEach(btn => btn.classList.remove('selected'));
        element.classList.add('selected');
        dispTime.innerText = time;
        checkFormValidity();
    }

    function checkFormValidity() {
        if (selectedTrainer && selectedDate && selectedTime) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    submitBtn.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('로그인이 필요합니다.');
            window.location.href = 'loginPage.html';
            return;
        }

        const userList = JSON.parse(localStorage.getItem('userList')) || [];
        const targetUser = userList.find(u => u.id === currentUser.id);

        if (!targetUser.ptCount || targetUser.ptCount <= 0) {
            alert('PT 잔여 횟수가 부족합니다.\n수강권을 먼저 구매해주세요.');
            return;
        }

        if (confirm(`${selectedDate} ${selectedTime}\n${selectedTrainer.name} 트레이너와 예약하시겠습니까?\n(잔여 횟수 1회 차감)`)) {


            const updatedList = userList.map(user => {
                if (user.id === currentUser.id) {
                    const reservations = user.reservations || [];
                    reservations.push({
                        trainer: selectedTrainer.name,
                        date: selectedDate,
                        time: selectedTime,
                        createdAt: new Date().toISOString()
                    });

                    return {
                        ...user,
                        reservations: reservations,
                        ptCount: user.ptCount - 1
                    };
                }
                return user;
            });

            localStorage.setItem('userList', JSON.stringify(updatedList));

            alert('예약이 확정되었습니다.\n마이페이지에서 확인하실 수 있습니다.');
            window.location.href = 'mypage.html';
        }
    });
});