const backgroundColor = [
  { color: 'rgba(255, 0, 0, 0.5)' },
  { color: 'rgba(75,192,192,0.5)' },
  { color: 'rgba(255,215,0,0.5)' },
  { color: 'rgba(211,211,211,0.5)' },
  { color: 'rgba(0, 100, 255, 0.5)' },
  { color: 'rgba(154, 99, 36, 0.5)' },
  { color: 'rgba(145, 30, 180, 0.5)' },
  { color: 'rgba(250, 190, 190, 0.5)' },
  { color: 'rgba(128, 0, 0, 0.5)' },
  { color: 'rgba(128, 128, 0, 0.5)' },
];

const format = (global: any[], value: any[]): any => {
  let res: any[] = [];

  global.forEach((element: any, index: number) => {
    if (value[index].value !== 0) {
      res = [...res, Object.assign(Object.assign(value[index], element), backgroundColor[index])];
    }
  });
  return res;
};

export default format;
