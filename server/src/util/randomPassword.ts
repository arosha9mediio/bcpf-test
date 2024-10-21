export const generateRandomPassword = (length = 8): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  let password = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    password += chars[index];
  }

  return password;
};

// 20 Korean Adjectives (형용사)
const adjectives = [
  '빠른',
  '용감한',
  '호기심 많은',
  '대담한',
  '부드러운',
  '사나운',
  '우아한',
  '신비로운',
  '장난기 많은',
  '조용한',
  '반짝이는',
  '다정한',
  '생생한',
  '재치있는',
  '열정적인',
  '고상한',
  '두려움 없는',
  '충직한',
  '자랑스러운',
  '지혜로운',
];

// 20 Korean Animal/Plant Names (동식물명)
const animalsPlants = [
  '사자',
  '호랑이',
  '독수리',
  '상어',
  '돌고래',
  '코끼리',
  '참나무',
  '장미',
  '백합',
  '매',
  '악어',
  '표범',
  '기린',
  '코알라',
  '대나무',
  '고래',
  '연꽃',
  '까마귀',
  '재규어',
  '나비',
];

// Function to generate random combinations
export function randomNickName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimalPlant =
    animalsPlants[Math.floor(Math.random() * animalsPlants.length)];
  return `${randomAdjective} ${randomAnimalPlant}`;
}
