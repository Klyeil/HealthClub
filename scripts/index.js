document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthSpan = document.getElementById('currentMonth');

    if (!calendarGrid || !currentMonthSpan) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    currentMonthSpan.innerText = `${year}. ${String(month + 1).padStart(2, '0')}`;

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(day => {
        const div = document.createElement('div');
        div.className = 'calDay header';
        div.innerText = day;
        calendarGrid.appendChild(div);
    });

    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfWeek; i++) {
        const div = document.createElement('div');
        div.className = 'calDay disabled';
        calendarGrid.appendChild(div);
    }

    for (let i = 1; i <= lastDate; i++) {
        const div = document.createElement('div');
        div.className = 'calDay';
        div.innerText = i;

        const checkDate = new Date(year, month, i);
        const dayOfWeek = checkDate.getDay();

        if (dayOfWeek === 0) {
            div.classList.add('sun');
        } else if (dayOfWeek === 6) {
            div.classList.add('sat');
        }

        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            div.classList.add('today');
        }

        if (month === 4 && i === 17) {
            div.classList.add('holiday');
            div.title = "개교기념일";
        }

        if ((month === 5 && i === 6) || (month === 7 && i === 15) || (month === 11 && i === 25) || (month === 0 && i === 1)) {
            div.classList.add('holiday');
        }

        calendarGrid.appendChild(div);
    }
}