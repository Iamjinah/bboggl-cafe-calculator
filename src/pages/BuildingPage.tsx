import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBuildingById } from '../data/buildings';
import { PALETTE_ROLES } from '../types/building';
import type { ColorSwatch, PaletteRole } from '../types/building';

// 역할별 한글 라벨과 한 줄 설명. PALETTE_ROLES 순서대로 화면에 노출된다.
const ROLE_LABELS: Record<PaletteRole, { title: string; desc: string }> = {
  base: { title: '베이스', desc: '건물의 대부분을 차지하는 바탕색' },
  background: { title: '배경', desc: '하늘·주변과 맞닿는 톤' },
  point: { title: '포인트', desc: '좁은 면적의 강조색' },
  contrast: { title: '대비', desc: '바탕과 대조를 이루는 색' },
};

// hex의 밝기를 계산해 글자색(검정/흰색)을 정한다. 밝은 배경엔 검정, 어두운 배경엔 흰색.
function readableTextColor(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // 상대 휘도 근사식 (sRGB 가중치)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#1a1a1a' : '#ffffff';
}

function BuildingPage() {
  const { id } = useParams<{ id: string }>();
  const building = getBuildingById(id);
  // 어떤 hex를 방금 복사했는지 — 짧은 "복사됨" 피드백에 쓴다.
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  // 사진이 아직 없거나 로드 실패하면 대체 표시로 전환.
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    // 1주차 SEO: 건물 이름 기반 title + description.
    // (도감 전용이라 카페용 useSeoMeta 대신 최소한만 직접 세팅)
    if (!building) return;
    document.title = `${building.name} 색채 도감 | 건축 색채 도감`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        'content',
        `${building.name}(${building.location}, ${building.year}, ${building.architect})의 색 조합을 베이스·배경·포인트·대비 역할별로 정리한 색채 도감.`,
      );
    }
  }, [building]);

  if (!building) {
    return (
      <div className="atlas-page">
        <p className="atlas-empty">건물을 찾을 수 없습니다.</p>
        <Link to="/buildings/lotte-tower" className="atlas-back">
          롯데월드타워 보기 →
        </Link>
      </div>
    );
  }

  async function handleCopy(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex((cur) => (cur === hex ? null : cur)), 1200);
    } catch {
      // 클립보드 접근이 막힌 환경(예: http, 권한 거부)에서는 조용히 무시
    }
  }

  return (
    <div className="atlas-page">
      {/* 1) 사진 + 기본 정보 */}
      <figure className="atlas-photo">
        {imageFailed ? (
          <div className="atlas-photo-fallback" aria-hidden="true">
            사진 준비 중
          </div>
        ) : (
          <img src={building.image} alt={building.name} onError={() => setImageFailed(true)} />
        )}
      </figure>

      <header className="atlas-head">
        <h1 className="atlas-name">{building.name}</h1>
        <p className="atlas-meta">
          {building.location} · {building.year} · {building.architect}
        </p>
      </header>

      {/* 2) 역할별 색 띠 */}
      <section className="atlas-palette">
        {PALETTE_ROLES.map((role) => {
          const swatches: ColorSwatch[] = building.palette[role];
          const label = ROLE_LABELS[role];
          return (
            <div key={role} className="atlas-role">
              <div className="atlas-role-head">
                <span className="atlas-role-title">{label.title}</span>
                <span className="atlas-role-desc">{label.desc}</span>
              </div>

              {swatches.length === 0 ? (
                <p className="atlas-role-empty">없음</p>
              ) : (
                <div className="atlas-bar">
                  {swatches.map((sw) => (
                    <button
                      key={sw.hex}
                      type="button"
                      className="atlas-swatch"
                      // ratio에 비례해 너비 배분. ratio 없으면 1로 균등 분배.
                      style={{
                        flexGrow: sw.ratio ?? 1,
                        background: sw.hex,
                        color: readableTextColor(sw.hex),
                      }}
                      onClick={() => handleCopy(sw.hex)}
                      title={`${sw.hex} 복사`}
                    >
                      <span className="atlas-swatch-hex">
                        {copiedHex === sw.hex ? '복사됨!' : sw.hex}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <p className="atlas-hint">색을 클릭하면 hex 값이 복사됩니다.</p>
    </div>
  );
}

export default BuildingPage;
