import { useEffect } from 'react';
import { useLocale } from '../i18n/LocaleContext';

// 검색 리치 스니펫(FAQ)용 구조화 데이터의 원본이자 화면 FAQ의 원본 — 한 곳에서 관리
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '카페 음료 원가율은 보통 얼마인가요?',
    a: '개인 카페 기준 음료 원가율은 대체로 30~35% 수준입니다. 원두·우유·시럽 등 재료비가 여기에 들어가며, 디저트를 함께 팔면 품목별 원가율이 달라져 전체 평균은 더 높아질 수 있습니다. 프랜차이즈는 본사 매입 단가에 따라 편차가 큽니다.',
  },
  {
    q: '하루 몇 잔을 팔아야 손해를 보지 않나요?',
    a: '고정비를 한 잔당 마진(판매가 − 원가)과 영업일수로 나누면 하루 손익분기점 판매잔 수가 나옵니다. 예를 들어 월 고정비가 480만 원, 한 잔 마진이 3,000원, 월 26일 영업이라면 하루 약 62잔을 팔아야 본전입니다. 위 계산기에 본인 숫자를 넣으면 바로 확인할 수 있습니다.',
  },
  {
    q: '카페 순이익률은 어느 정도가 적정한가요?',
    a: '소형 개인 카페의 순이익률은 일반적으로 매출의 15~25% 범위로 봅니다. 다만 임대료가 높은 상권이거나 초기 대출 이자가 크면 이보다 낮아지고, 테이크아웃 위주로 인건비·임대료를 줄이면 더 높아질 수 있습니다.',
  },
  {
    q: '고정비에서 가장 큰 비중을 차지하는 항목은 무엇인가요?',
    a: '대부분의 카페에서 인건비와 임대료가 고정비의 큰 축을 차지합니다. 특히 사람을 많이 쓰는 좌석형 카페는 인건비 비중이 높고, 역세권·1층 매장은 임대료 부담이 큽니다. 이 두 가지를 어떻게 설계하느냐가 손익분기점을 크게 좌우합니다.',
  },
  {
    q: '손익분기점을 낮추려면 어떻게 해야 하나요?',
    a: '객단가를 올리거나(세트·사이드 메뉴), 원가율을 관리하거나, 인건비를 줄이거나(키오스크·효율적 동선), 고정비를 낮추는(임대료 협상, 소형 매장) 방향이 있습니다. 매출을 늘리는 것뿐 아니라 비용 구조를 바꾸는 것도 똑같이 중요합니다.',
  },
  {
    q: '이 계산기 결과는 얼마나 믿어도 되나요?',
    a: '입력한 값에 대한 수학적 계산은 정확하지만, 실제 수익은 상권·계절·운영 방식·세금 등 계산기에 담지 않은 변수의 영향을 받습니다. 창업 결정 전 방향을 잡는 참고용으로 활용하시고, 세부 사업계획은 전문가 상담과 함께 세우시길 권합니다.',
  },
];

function CafeGuide() {
  const { locale } = useLocale();

  // FAQ 구조화 데이터(JSON-LD)를 head에 주입 — 구글 검색결과에 FAQ 리치 스니펫 후보로 노출
  useEffect(() => {
    if (locale !== 'ko') return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [locale]);

  // 콘텐츠는 한국어부터 — 영어 가이드는 이후 단계에서 추가
  if (locale !== 'ko') return null;

  return (
    <section className="guide">
      <h2 className="guide-title">카페 수익, 이렇게 계산됩니다</h2>

      <div className="guide-block">
        <h3>☕ 매출은 결국 세 숫자의 곱</h3>
        <p>
          카페 월매출은 <strong>객단가(음료 1잔 평균 판매가) × 하루 판매 잔 수 × 월 영업일수</strong>로 정해집니다.
          즉 매출을 늘리는 길은 더 비싸게 팔거나, 더 많이 팔거나, 더 많은 날 여는 것뿐입니다. 이 세 숫자 중 무엇을
          바꿀 수 있는지 먼저 따져보면 현실적인 목표가 잡힙니다.
        </p>
      </div>

      <div className="guide-block">
        <h3>📊 원가율·비용 구조 한눈에 보기</h3>
        <p>
          매출에서 어떤 비용이 얼마나 빠져나가는지 대략적인 기준을 알면 내 숫자가 지나치게 낙관적인지 판단할 수
          있습니다. 아래는 개인 카페에서 흔히 이야기되는 일반적인 범위입니다(상권·운영 방식에 따라 편차가 큽니다).
        </p>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>매출 대비 대략 비중</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>재료비(원가)</td>
                <td>30~35%</td>
              </tr>
              <tr>
                <td>인건비</td>
                <td>20~30%</td>
              </tr>
              <tr>
                <td>임대료</td>
                <td>10~20%</td>
              </tr>
              <tr>
                <td>기타(공과금·소모품 등)</td>
                <td>5~10%</td>
              </tr>
              <tr>
                <td>남는 순이익(대략)</td>
                <td>15~25%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="guide-block">
        <h3>📈 규모별 수익 예시</h3>
        <p>
          아래는 이해를 돕기 위한 <strong>가상의 예시</strong>일 뿐, 보장된 수치가 아닙니다. 실제 값은 위 계산기에
          본인 상황을 넣어 확인하세요.
        </p>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>유형</th>
                <th>월매출(예시)</th>
                <th>예상 순이익(예시)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>소형 테이크아웃 위주</td>
                <td>800~1,200만 원</td>
                <td>150~300만 원</td>
              </tr>
              <tr>
                <td>동네 좌석형 카페</td>
                <td>1,500~2,500만 원</td>
                <td>300~600만 원</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="guide-block">
        <h3>🚀 손익분기점을 낮추는 5가지 방법</h3>
        <ul className="guide-list">
          <li>
            <strong>객단가 올리기</strong> — 세트·사이드 메뉴, 사이즈 업으로 한 명당 결제액을 키웁니다.
          </li>
          <li>
            <strong>원가율 관리</strong> — 폐기 줄이기, 매입처 조정으로 재료비 비중을 낮춥니다.
          </li>
          <li>
            <strong>인건비 효율화</strong> — 키오스크·효율적 동선으로 같은 매출을 더 적은 인력으로 냅니다.
          </li>
          <li>
            <strong>테이크아웃·배달 확대</strong> — 좌석 회전 한계를 넘어 판매량을 늘립니다.
          </li>
          <li>
            <strong>고정비 협상·규모 조절</strong> — 임대료 협상, 소형 매장 선택으로 매달 나가는 돈을 줄입니다.
          </li>
        </ul>
      </div>

      <div className="guide-block">
        <h3>❓ 자주 묻는 질문</h3>
        <div className="guide-faq">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="guide-faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CafeGuide;
