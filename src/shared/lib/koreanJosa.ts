/**
 * 한글 단어의 마지막 글자의 종성 여부를 판단
 * @param word 한글 단어
 * @returns 종성이 있으면 true, 없으면 false
 */
export function hasFinalConsonant(word: string): boolean {
  if (!word) return false;
  const lastChar = word[word.length - 1];
  const charCode = lastChar.charCodeAt(0);

  // 한글 범위 확인 (AC00 ~ D7A3)
  if (charCode < 0xac00 || charCode > 0xd7a3) {
    return false;
  }

  // 종성 계산: (charCode - 0xac00) % 28
  // 28로 나눈 나머지가 0이 아니면 종성이 있음
  return (charCode - 0xac00) % 28 !== 0;
}

/**
 * 한글 단어에 맞는 조사를 자동으로 선택
 * @param word 한글 단어
 * @param options 조사 옵션
 * @returns 조사 객체 { 은는, 이가, 을를, 과와 }
 */
export function josa(
  word: string,
  options: {
    eunNeun?: { 종성: string; 무종성: string };
    iGa?: { 종성: string; 무종성: string };
    eulReul?: { 종성: string; 무종성: string };
    gwaWa?: { 종성: string; 무종성: string };
  } = {}
): { 은는: string; 이가: string; 을를: string; 과와: string } {
  const {
    eunNeun = { 종성: "은", 무종성: "는" },
    iGa = { 종성: "이", 무종성: "가" },
    eulReul = { 종성: "을", 무종성: "를" },
    gwaWa = { 종성: "과", 무종성: "와" },
  } = options;

  const hasCoda = hasFinalConsonant(word);

  return {
    은는: hasCoda ? eunNeun.종성 : eunNeun.무종성,
    이가: hasCoda ? iGa.종성 : iGa.무종성,
    을를: hasCoda ? eulReul.종성 : eulReul.무종성,
    과와: hasCoda ? gwaWa.종성 : gwaWa.무종성,
  };
}

/**
 * 편의 함수: 단어 + "은/는" 자동 선택
 */
export function eunNeun(word: string): string {
  const particle = hasFinalConsonant(word) ? "은" : "는";
  return `${word}${particle}`;
}

/**
 * 편의 함수: 단어 + "이/가" 자동 선택
 */
export function iGa(word: string): string {
  const particle = hasFinalConsonant(word) ? "이" : "가";
  return `${word}${particle}`;
}

/**
 * 편의 함수: 단어 + "을/를" 자동 선택
 */
export function eulReul(word: string): string {
  const particle = hasFinalConsonant(word) ? "을" : "를";
  return `${word}${particle}`;
}

/**
 * 편의 함수: 단어 + "과/와" 자동 선택
 */
export function gwaWa(word: string): string {
  const particle = hasFinalConsonant(word) ? "과" : "와";
  return `${word}${particle}`;
}
