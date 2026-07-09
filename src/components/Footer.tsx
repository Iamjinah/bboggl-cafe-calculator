import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="app-footer">
      <p>본 계산기는 단순 참고용이며 실제 수익은 상권, 운영 방식, 세금, 계절, 인건비에 따라 달라질 수 있습니다.</p>
      <Link to="/privacy" className="footer-link">
        개인정보처리방침
      </Link>
    </footer>
  );
}

export default Footer;
