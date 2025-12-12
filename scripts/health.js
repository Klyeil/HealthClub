const UNIT_PRICE = 10000;
const BUNDLE_DISCOUNT_UNIT = 1000;
const COUPON_CODE = "X-MAS";

let currentMonths = 0;
let isCouponApplied = false;

function calculateTotal() {
    const basePrice = currentMonths * UNIT_PRICE;

    const bundleCount = Math.floor(currentMonths / 3);
    const bundleDiscount = bundleCount * BUNDLE_DISCOUNT_UNIT;

    let subTotal = basePrice - bundleDiscount;

    let couponDiscount = 0;
    if (isCouponApplied) {
        couponDiscount = subTotal * 0.2;
    }

    const finalTotal = subTotal - couponDiscount;

    document.getElementById('displayBasePrice').innerText = `${basePrice.toLocaleString()}원`;
    document.getElementById('displayBundleDiscount').innerText = `-${bundleDiscount.toLocaleString()}원`;
    document.getElementById('displayCouponDiscount').innerText = `-${couponDiscount.toLocaleString()}원`;
    document.getElementById('displayTotal').innerText = `${finalTotal.toLocaleString()}원`;
}

document.addEventListener('DOMContentLoaded', () => {
    const monthSelect = document.getElementById('monthSelect');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const couponInput = document.getElementById('couponInput');
    const paymentBtn = document.getElementById('paymentBtn');
    const couponMessage = document.getElementById('couponMessage');

    if (monthSelect) {
        monthSelect.addEventListener('change', (e) => {
            currentMonths = parseInt(e.target.value);
            calculateTotal();
        });
    }

    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const code = couponInput.value.trim();

            if (currentMonths === 0) {
                alert('먼저 이용 기간을 선택해주세요.');
                monthSelect.focus();
                return;
            }

            if (code === COUPON_CODE) {
                isCouponApplied = true;
                couponMessage.innerText = "🎉 쿠폰이 적용되었습니다! (20% 할인)";
                couponMessage.className = "message success";

                couponInput.disabled = true;
                applyCouponBtn.disabled = true;
                applyCouponBtn.innerText = "적용됨";

                calculateTotal();
            } else {
                isCouponApplied = false;
                couponMessage.innerText = "유효하지 않은 쿠폰 코드입니다.";
                couponMessage.className = "message error";
                calculateTotal();
            }
        });
    }

    if (paymentBtn) {
        paymentBtn.addEventListener('click', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('로그인이 필요한 서비스입니다.');
                window.location.href = 'loginPage.html';
                return;
            }

            if (currentMonths === 0) {
                alert('이용 기간을 선택해주세요.');
                monthSelect.focus();
                return;
            }

            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (!paymentMethod) {
                alert('결제 수단(현금/카드)을 선택해주세요.');
                return;
            }

            const finalPrice = document.getElementById('displayTotal').innerText;

            if (confirm(`${currentMonths}개월 멤버십(${finalPrice})을 결제하시겠습니까?`)) {

                const userList = JSON.parse(localStorage.getItem('userList')) || [];

                const updatedList = userList.map(user => {
                    if (user.id === currentUser.id) {

                        const today = new Date();
                        const endDate = new Date(today);
                        endDate.setMonth(today.getMonth() + currentMonths);

                        const lockerEndDate = new Date(today);
                        lockerEndDate.setMonth(today.getMonth() + 1);

                        const currentPtCount = user.ptCount || 0;

                        return {
                            ...user,
                            membership: {
                                type: `${currentMonths}개월 이용권`,
                                price: finalPrice,
                                method: paymentMethod.value === 'card' ? '카드' : '현금',
                                startDate: today.toISOString(),
                                endDate: endDate.toISOString()
                            },
                            ptCount: currentPtCount + 2,

                            locker: user.locker && user.locker.number ? user.locker : {
                                number: null,
                                password: null,
                                startDate: today.toISOString(),
                                endDate: lockerEndDate.toISOString()
                            }
                        };
                    }
                    return user;
                });

                localStorage.setItem('userList', JSON.stringify(updatedList));

                alert('결제가 완료되었습니다.\n(혜택: PT 2회 + 사물함 1개월 무료 적용됨)');

                window.location.href = 'index.html';
            }
        });
    }
});