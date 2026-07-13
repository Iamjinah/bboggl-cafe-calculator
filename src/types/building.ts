// 건축 색채 도감(Architecture Color Atlas)의 핵심 데이터 타입.
// HANDOFF 4번 스키마를 그대로 코드로 옮긴 것. 이 파일이 "데이터 계약"이다.

/** 팔레트 안의 색 하나 */
export interface ColorSwatch {
  /** "#D9D2C5" 형태의 hex 값 */
  hex: string;
  /** 면적 비율 0~1. 색 바 너비·정렬에 쓰이며 선택값(없을 수 있음) */
  ratio?: number;
}

/**
 * 4개 역할 키는 항상 존재하되, 각 배열 길이는 건물마다 다르다.
 * 빈 배열([]) 자체가 "그 역할 없음"이라는 의미 있는 데이터다.
 */
export interface Palette {
  base: ColorSwatch[];
  background: ColorSwatch[];
  point: ColorSwatch[];
  contrast: ColorSwatch[];
}

/** 팔레트의 4개 역할 키. 화면에서 순회·라벨링할 때 이 배열을 기준으로 삼는다. */
export const PALETTE_ROLES = ['base', 'background', 'point', 'contrast'] as const;
export type PaletteRole = (typeof PALETTE_ROLES)[number];

/** 건물 1개 = 이 객체 1개 */
export interface Building {
  /** URL 슬러그: "lotte-tower" */
  id: string;
  name: string;
  location: string;
  year: number;
  architect: string;
  /** 사진 경로. 예: "/buildings/lotte-tower.jpg" (없으면 페이지가 대체 표시) */
  image: string;
  palette: Palette;
}
