import { useEffect } from 'react';
import { useLocale } from '../i18n/LocaleContext';

// 검색 리치 스니펫(FAQ)용 구조화 데이터의 원본이자 화면 FAQ의 원본 — 한 곳에서 관리
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: '연봉과 실수령액은 왜 이렇게 차이가 나나요?',
    a: '연봉은 세전 금액이고, 실수령액은 여기서 국민연금·건강보험·장기요양보험·고용보험(4대보험)과 소득세·지방소득세를 뗀 뒤 실제 통장에 들어오는 돈입니다. 연봉이 오를수록 공제 비율도 커져서, 보통 연봉의 8~15% 정도가 빠집니다.',
  },
  {
    q: '4대보험 요율은 어떻게 되나요?',
    a: '2025년 기준 근로자 부담분은 국민연금 4.5%, 건강보험 3.545%, 장기요양보험은 건강보험료의 12.95%, 고용보험 0.9%입니다. 국민연금은 기준소득월액 상한(637만 원)이 있어 그 이상 벌어도 보험료가 더 늘지 않습니다.',
  },
  {
    q: '비과세액은 무엇이고 왜 넣어야 하나요?',
    a: '식대처럼 세금과 4대보험을 매기지 않는 급여 항목이 비과세액입니다. 대표적으로 식대는 월 20만 원까지 비과세입니다. 비과세액이 클수록 과세 대상 급여가 줄어 실수령액이 늘어나므로, 정확히 계산하려면 본인 급여명세서의 비과세 항목을 넣어야 합니다.',
  },
  {
    q: '부양가족 수는 실수령액에 어떤 영향을 주나요?',
    a: '부양가족(본인 포함)이 많을수록 인적공제가 커져 과세표준이 낮아지고, 그만큼 소득세가 줄어 실수령액이 늘어납니다. 이 계산기는 1명당 연 150만 원의 기본공제를 반영합니다.',
  },
  {
    q: '이 계산기의 소득세는 급여명세서와 정확히 같나요?',
    a: '실제 급여의 소득세는 회사가 국세청 근로소득 간이세액표로 매달 원천징수하고, 이듬해 연말정산에서 최종 정산합니다. 이 계산기는 연간 세액을 추정해 12로 나눈 참고값이라 실제 명세서와 몇 천 원 차이가 날 수 있습니다. 전체적인 실수령 규모를 가늠하는 용도로 활용하세요.',
  },
];

function SalaryGuide() {
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
      <h2 className="guide-title">연봉 실수령액, 이렇게 계산됩니다</h2>

      <div className="guide-block guide-lead">
        <p>
          연봉 계약서에 적힌 숫자와 매달 통장에 찍히는 숫자는 다릅니다. 그 사이에서{' '}
          <strong>4대보험과 세금</strong>이 빠져나가기 때문입니다. 이 계산기는 연봉·비과세액·부양가족 수만
          넣으면 <strong>매달 실제로 받는 실수령액</strong>과 항목별 공제 내역을 바로 보여줍니다. 회원가입도
          비용도 없이 30초면 충분합니다. 이직·연봉 협상 전에, 위에 숫자를 넣어 확인해보세요.
        </p>
      </div>

      <div className="guide-block">
        <h3>💸 연봉에서 빠지는 것들</h3>
        <p>
          세전 월급에서 먼저 <strong>국민연금·건강보험·장기요양보험·고용보험</strong>(4대보험)이 빠지고,
          이어서 <strong>소득세와 지방소득세</strong>가 원천징수됩니다. 이 여섯 항목을 다 뺀 금액이
          실수령액입니다. 특히 국민연금과 건강보험은 급여의 4% 안팎씩 차지해, 두 가지만으로도 공제의 큰 축을
          이룹니다.
        </p>
      </div>

      <div className="guide-block">
        <h3>📊 2025년 기준 근로자 부담 요율</h3>
        <div className="guide-table-wrap">
          <table className="guide-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>근로자 부담 요율</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>국민연금</td>
                <td>과세소득의 4.5% (상한 있음)</td>
              </tr>
              <tr>
                <td>건강보험</td>
                <td>과세소득의 3.545%</td>
              </tr>
              <tr>
                <td>장기요양보험</td>
                <td>건강보험료의 12.95%</td>
              </tr>
              <tr>
                <td>고용보험</td>
                <td>과세소득의 0.9%</td>
              </tr>
              <tr>
                <td>소득세·지방소득세</td>
                <td>소득 구간별 누진 (지방세는 소득세의 10%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="guide-block">
        <h3>🧾 실수령액을 조금이라도 늘리려면</h3>
        <p>
          같은 연봉이라도 <strong>비과세 식대·자가운전보조금 등을 챙기면</strong> 과세 대상 급여가 줄어
          실수령액이 늘어납니다. 또 부양가족이 있다면 연말정산에서 인적공제를 빠짐없이 반영하는 것이
          중요합니다. 매달 떼인 세금은 이듬해 <strong>연말정산</strong>으로 정산되므로, 공제 항목을 잘
          챙길수록 돌려받는 금액이 커집니다.
        </p>
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

export default SalaryGuide;
