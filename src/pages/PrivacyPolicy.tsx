import { Link } from 'react-router-dom';

const EFFECTIVE_DATE = '2026년 7월 9일';
const CONTACT_EMAIL = '0.1kjina1024@gmail.com';

function PrivacyPolicy() {
  return (
    <div className="app-shell">
      <div className="policy-page">
        <h1>개인정보처리방침</h1>
        <p className="policy-updated">시행일자: {EFFECTIVE_DATE}</p>

        <p>
          카큘레이터(이하 &quot;사이트&quot;)는 이용자의 개인정보를 소중히 여기며, 관련 법령을 준수하기 위해 다음과
          같이 개인정보처리방침을 안내합니다.
        </p>

        <h2>1. 수집하는 개인정보 항목 및 방법</h2>
        <p>
          본 사이트는 회원가입이나 로그인 없이 이용할 수 있으며, 계산기에 입력한 값(월세, 판매가 등)은 서버로
          전송되거나 저장되지 않고 이용자의 브라우저 안에서만 계산됩니다. 다만 광고 게재 및 방문 통계를 위해
          아래와 같이 쿠키를 통한 정보가 자동으로 수집될 수 있습니다.
        </p>

        <h2>2. 쿠키(Cookie)의 사용</h2>
        <p>
          본 사이트는 Google AdSense를 통해 광고를 게재하며, Google을 비롯한 제3자 공급업체는 쿠키를 사용하여
          이용자가 본 사이트 또는 다른 사이트를 방문한 기록을 바탕으로 광고를 게재합니다. 이용자는{' '}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noreferrer">
            Google 광고 설정
          </a>{' '}
          에서 맞춤 광고를 위한 쿠키 사용을 거부할 수 있으며,{' '}
          <a href="https://www.aboutads.info" target="_blank" rel="noreferrer">
            www.aboutads.info
          </a>{' '}
          에서 맞춤 광고에 사용되는 제3자 공급업체의 쿠키를 거부할 수도 있습니다. 브라우저 설정을 통해 쿠키
          저장을 거부할 수도 있으나, 이 경우 일부 서비스 이용에 제한이 있을 수 있습니다.
        </p>

        <h2>3. 개인정보의 보유 및 이용 기간</h2>
        <p>
          본 사이트는 별도의 회원 정보를 수집·저장하지 않으므로 자체적으로 보유하는 개인정보가 없습니다. 광고
          쿠키를 통해 수집되는 정보의 보유 기간은 Google을 비롯한 각 광고 공급업체의 정책을 따릅니다.
        </p>

        <h2>4. 개인정보처리방침의 변경</h2>
        <p>
          법령 및 서비스 변경사항에 따라 본 방침의 내용이 변경될 수 있으며, 변경 시 본 페이지를 통해 고지합니다.
        </p>

        <h2>5. 문의처</h2>
        <p>
          개인정보 관련 문의사항은 아래 이메일로 연락해 주시기 바랍니다.
          <br />
          이메일: {CONTACT_EMAIL}
        </p>

        <Link to="/" className="policy-back-link">
          ← 계산기로 돌아가기
        </Link>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
