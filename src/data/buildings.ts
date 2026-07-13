import type { Building } from '../types/building';

// 1주차: 색 추출 도구(2주차) 없이 손으로 고른 대표색으로 채운 샘플 1개.
// ratio는 면적 비율(0~1)이며, 같은 역할 안에서 색 바 너비로 쓰인다.
// 실제 사진 픽셀 추출값이 아니라 육안 기준 1차 값이다.
export const BUILDINGS: Building[] = [
  {
    id: 'lotte-tower',
    name: '롯데월드타워',
    location: '서울',
    year: 2017,
    architect: 'KPF',
    image: '/buildings/lotte-tower.jpg',
    palette: {
      // 대부분을 차지하는 밝은 유리·금속 파사드
      base: [
        { hex: '#C9CED4', ratio: 0.55 },
        { hex: '#E4E8EC', ratio: 0.25 },
      ],
      // 하늘·주변과 맞닿는 은은한 배경 톤
      background: [{ hex: '#AEBAC6', ratio: 0.2 }],
      // 저층부 조명·사인에서 스며나오는 따뜻한 포인트
      point: [{ hex: '#D9A441', ratio: 0.04 }],
      // 유리 사이로 드러나는 어두운 골조/그림자
      contrast: [{ hex: '#2E333B', ratio: 0.08 }],
    },
  },
];

/** 슬러그(id)로 건물 1개를 찾는다. 없으면 undefined. */
export function getBuildingById(id: string | undefined): Building | undefined {
  return BUILDINGS.find((b) => b.id === id);
}
