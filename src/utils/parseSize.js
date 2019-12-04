const renderSizeName = key => {
  switch (key) {
    case 'shoulder':
      return '어깨 넓이';
    case 'chest':
      return '가슴 넓이';
    case 'arm':
      return '팔길이';
    case 'waist':
      return '허리 넓이';
    case 'crotch':
      return '밑위';
    case 'hip':
      return '골반 넓이';
    case 'leg':
      return '다리 길이';
    case 'thigh':
      return '허벅지';
    default:
      return 'N/A';
  }
};

const removeEmptyStrings = obj => {
  const newObj = {};
  Object.keys(obj).forEach(prop => {
    if (obj[prop] !== '') {
      newObj[prop] = obj[prop];
    }
  });
  return newObj;
};

const extractSize = obj => {
  const sizeObj = {};
  Object.keys(obj).forEach(prop => {
    if (prop.substring(0, 4) === 'size') {
      sizeObj[prop] = obj[prop];
    }
  });
  return sizeObj;
};

const splitSizeToArray = sizeObj => {
  const size = {};
  Object.keys(sizeObj).forEach(prop => {
    size[prop] = sizeObj[prop].split(/[\s,]+/);
  });
  return size;
};

const makeSizeObj = (sizeObj, sizeDetail) => {
  const sizeLabelArray = [];
  const sizeContentObj = {};
  const finalSizeContentArray = [];
  Object.keys(sizeObj).forEach(prop => {
    if (prop === 'size_label') {
      sizeObj[prop].forEach((x, index) =>
        sizeLabelArray.push({ id: index, name: x }),
      );
    } else {
      sizeContentObj[prop] = sizeObj[prop];
    }
  });

  Object.keys(sizeContentObj).forEach(prop => {
    const key = prop.substring(5, prop.length);
    const target = sizeDetail.filter(x => x.key === key);
    const userSize = Math.round(target[0].measurement);
    sizeContentObj[prop].forEach((size, sizeIndex) =>
      finalSizeContentArray.push({
        id: sizeIndex,
        key,
        size: Number(size),
        name: renderSizeName(key),
        userSize,
      }),
    );
  });

  return { sizeLabel: sizeLabelArray, sizeContent: finalSizeContentArray };
};

export const getSizeGraphData = (itemDetail, sizeDetail) => {
  const transformedItem = removeEmptyStrings(itemDetail);
  const sizeObj = extractSize(transformedItem);
  const sizeArray = splitSizeToArray(sizeObj);
  const { sizeLabel, sizeContent } = makeSizeObj(sizeArray, sizeDetail);

  return {
    sizeLabel,
    sizeContent,
  };
};
