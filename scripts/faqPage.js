const faqData = [
    {
        question: "헬스장 어디가 좋아요?",
        answer: "<p>무조건 가까운 곳이 제일 좋습니다. 저는 헬스장을 먼저 골라놓고 그 근처에 있는 집을 구했어요.<br>여러분의 의지는 유한하다는 것을 꼭 기억하세요.</p>"
    },
    {
        question: "PT 어떻게 골라요?",
        answer: "<p>체육학, 체육지도학 등 관련 학문의 학사 이상 학력을 가진 사람 중 본인과 같은 성별, 비슷한 체형인 사람을 고르세요. 체형이 비슷해야 노하우를 배우기 좋습니다.</p><p>자격증 중 볼만한 것은 국가공인 자격증인 '건강운동관리사'와 '(전문·생활) 스포츠지도사' 외에는 없다고 보시면 됩니다.</p>"
    },
    {
        question: "특정 부위가 아픈데 보호대 사요?",
        answer: "<p>보호대도 사고 자세도 바꾸세요. 좋지 않은 자세에서 오는 통증을 보호대로 억누르면 결국 부상당합니다.</p><p>자세가 좋은데 아프다면 병원가세요.</p>"
    },
    {
        question: "스트랩 뭐 사요? 베르사 그립 사요?",
        answer: "<p>1. 악력 보조 장비는 그립, 후크, 줄 스트랩, 8자 스트랩 등 다양한 종류가 있습니다. 각각 보급형으로 사서 써보고 잘 맞는 종류의 고급품을 사서 쓰시는 것이 좋습니다.</p><p>2. 스트랩을 쓸 때는 쓰더라도 악력 향상을 위한 운동을 병행하는 게 좋습니다. 악력 훈련 없이 성장하다가 스트랩의 악력 보조로 극복할 수 없는 구간에 도달하면 긴 정체기를 겪을 수도 있습니다.</p>"
    },
    {
        question: "벨트 뭐가 좋아요?",
        answer: "<p>1. 복압 보조 장비도 벨크로, 프롱, 레버, 코르셋 등 다양한 장비가 있습니다. 주로 하는 운동의 종류에 맞게 보급품부터 시작해보세요. 초보자가 SBD 레버벨트 사봤자 당근마켓으로 갈 확률이 높습니다. (추천 브랜드 : VALEO)</p><p>2. 벨트 구매 전에 복압 잡는 법을 먼저 숙달하는 것을 추천합니다. 복압을 잡았을 때 복근뿐만 아니라 기립근도 부풀릴 수 있는 수준(브레이싱)으로 키우시면 벨트 없이도 체중 2~3배의 무게를 쉽게 다룰 수 있게 됩니다. (추천 운동 : 데드버그)</p>"
    },
    {
        question: "유산소랑 무산소 중에 뭐가 좋아요?",
        answer: "<p>균형 잡힌 성장과 부상 방지 등 여러 긍정적인 효과를 위해서는 둘 다 하는 것이 제일 좋습니다.</p>"
    },
    {
        question: "정체기 왔는데 어떻게 뚫어요?",
        answer: "<p>횟수 위주로 했다면 중량을, 중량 위주로 했다면 횟수를 늘려보세요.</p><p>근육에는 크게 내구도를 담당하는 지근과 순발력을 담당하는 속근이 있는데 둘 다 고르게 발달시켜야 퍼포먼스가 좋아집니다.</p>"
    },
    {
        question: "운동 루틴 어떻게 짜요?",
        answer: "<p>아무 운동 앱이나 깔아서 아무 프로그램이나 해보세요. 전문가들이 만든 프로그램이고 효과가 입증된 것이 많이 있습니다.</p><p>한 바퀴씩 돌려보고 잘 맞는 프로그램으로 3달, 6달 돌려보면 달라진 몸을 만날 수 있을 겁니다.</p>"
    },
    {
        question: "보충제 꼭 먹어야 해요?",
        answer: "<p>안 먹어도 됩니다. 보충제는 말 그대로 보충을 위한 것이기 때문에 먹는다고 근육이 자라거나 하는 마법 같은 일은 없습니다.</p><p>고기와 채소 등 일반적인 식품을 통해서 영양소를 섭취하는 것이 가장 추천할 만한 방법입니다.</p>"
    },
    {
        question: "닭가슴살 맛없는데 다른 건 없나요?",
        answer: "<p>닭 외에도 돼지, 소 등 살코기가 많은 고기를 먹으면 됩니다.</p><p>생선을 좋아한다면 생선도 좋은 선택이고, 요즘에는 씨몬스터 같은 순살 생선 전문 브랜드도 많으니 식탁을 풍성하게 차려봅시다.</p>"
    },
    {
        question: "마카? 아르기닌? 좋은 건가요?",
        answer: "<p>현재까지 과학적으로 운동능력 향상 효과가 입증된 보충제는 카페인, 크레아틴, 베타알라닌 정도입니다.</p><p>먹어도 되는지 정확하게 알고 싶다면 의사·약사 등 전문가와 상담해보시는 것이 좋습니다.</p>"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('faqListContainer');

    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faqItem');

        faqItem.innerHTML = `
            <div class="faqQuestion">
                <span>${item.question}</span>
                <span class="arrowIcon"></span>
            </div>
            <div class="faqAnswer">
                ${item.answer}
            </div>
        `;

        const questionDiv = faqItem.querySelector('.faqQuestion');

        questionDiv.addEventListener('click', () => {
            const isOpened = faqItem.classList.contains('active');

            document.querySelectorAll('.faqItem').forEach(i => {
                i.classList.remove('active');
            });

            if (!isOpened) {
                faqItem.classList.add('active');
            }
        });

        container.appendChild(faqItem);
    });
});