const carNames = [
  'Audi',
  'BMW',
  'Ford',
  'Honda',
  'Hyundai',
  'Kia',
  'Lada (ВАЗ)',
  'Mazda',
  'Mercedes-Benz',
  'Mitsubishi',
  'Nissan',
  'Renault',
  'Skoda',
  'Toyota',
  'Volkswagen',
  'Buick',
  'Cadillac',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Ford',
  'GMC',
  'Hummer',
  'Jeep',
  'Lincoln',
  'Mercury',
  'Oldsmobile',
  'Pontiac',
  'Tesla',
];

const carModels = [
  'S1',
  'S2',
  'SQ4',
  'TTS',
  'TT RS',
  'Q7',
  'R8',
  'EQE',
  'S',
  'X',
  'Y',
  '1',
  '2',
  '3',
  '4',
  '5',
  'X1',
  'X2',
  'X3',
  'X4',
  'X5',
  'X6',
];

const carsColors = [
  '#E32636',
  '#AB274F',
  '#CD9575',
  '#9966CC',
  '#ED3CCA',
  '#44944A',
  '#A8E4A0',
  '#CCCCFF',
  '#003153',
  '#30D5C8',
  '#F34723',
  '#FFFF00',
  '#1E90FF',
  '#008000',
  '#321414',
  '#4169E1',
];

function getRandomInteger(a: number, b: number) {
  const min = Math.ceil(a < b ? a : b);
  const max = Math.floor(b > a ? b : a);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default () => {
  const data: Array<{ name: string; color: string }> = [];
  for (let i = 0; i < 100; i += 1) {
    const name = `${carNames[getRandomInteger(0, carNames.length)]} ${
      carModels[getRandomInteger(0, carModels.length)]
    }`;
    const color = carsColors[getRandomInteger(0, carsColors.length)];
    data.push({ name, color });
  }
  return data;
};
