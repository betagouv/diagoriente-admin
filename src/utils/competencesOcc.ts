const formatOcc = (labels: any[], skills: any[]) => {
  let res: any[] = [];
  const sortByValue = (a: any, b: any) => {
    if (a.value < b.value) {
      return 1;
    }
    if (a.value > b.value) {
      return -1;
    }
    return 0;
  };
  skills.forEach((skill: any) => {
    skill.competences.forEach((elem: any) => {
      if (elem.value > 0) {
        const id = elem._id;
        const exist = res.find((item: any, index: number) => {
          if (item.id === id) {
            return true;
          }
          return false;
        });
        if (exist) {
          res.forEach((x, index) => {
            if (x.id === id) {
              x.value++;
            }
          });
        } else {
          res = [...res, { id, value: 1, color: elem.color, title: elem.title }];
        }
      }
    });
  });
  return res.sort((a, b) => sortByValue(a, b));
};
export default formatOcc;
