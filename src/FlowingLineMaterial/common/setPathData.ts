import * as Cesium from "cesium";

// 贝赛尔曲线算法
// 参数：
// anchorpoints: [{ x: 116.30, y: 39.60 }, { x: 37.50, y: 40.25 }, { x: 39.51, y: 36.25 }]
const CreateBezierPoints = (anchorpoints: any[], pointsAmount: number) => {
  let points = [];
  for (let i = 0; i < pointsAmount; i++) {
    let point = MultiPointBezier(anchorpoints, i / pointsAmount);
    points.push([point.x, point.y]);
  }
  return points;
};

// 生成贝塞尔曲线
const getBSR = (pointStart: number[], pointEnd: number[], point3: number[]) => {
  let ps = [
    { x: pointStart[0], y: pointStart[1] },
    { x: pointEnd[0], y: pointEnd[1] },
    { x: point3[0], y: point3[1] },
  ];
  // 100 每条线由100个点组成
  let guijipoints = CreateBezierPoints(ps, 100);
  return guijipoints;
};

const MultiPointBezier = (points: any[], t: number) => {
  let len = points.length;
  let x = 0,
    y = 0;
  let erxiangshi = function (start: number, end: number) {
    let cs = 1,
      bcs = 1;
    while (end > 0) {
      cs *= start;
      bcs *= end;
      start--;
      end--;
    }
    return cs / bcs;
  };
  for (let i = 0; i < len; i++) {
    let point = points[i];
    x +=
      point.x *
      Math.pow(1 - t, len - 1 - i) *
      Math.pow(t, i) *
      erxiangshi(len - 1, i);
    y +=
      point.y *
      Math.pow(1 - t, len - 1 - i) *
      Math.pow(t, i) *
      erxiangshi(len - 1, i);
  }
  return { x: x, y: y };
};

const getBSRPoints = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  h: number,
) => {
  let pointStart = [y1, 0];
  let pointEnd = [(y2 + y1) / 2, h];
  let point3 = [y2, 0];
  let arr = getBSR(pointStart, pointEnd, point3);
  let arr3d = [];
  for (let i = 0; i < arr.length; i++) {
    let x = ((x2 - x1) * (arr[i][0] - y1)) / (y2 - y1) + x1;
    arr3d.push([x, arr[i][0], arr[i][1]]);
  }
  return arr3d;
};

// 将数据转换为cesium polyline positions格式
const getBSRxyz = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  h: number,
) => {
  let arr3d = getBSRPoints(x1, y1, x2, y2, h);
  let arrAll = [];
  for (let ite of arr3d) {
    arrAll.push(ite[0]);
    arrAll.push(ite[1]);
    arrAll.push(ite[2]);
  }
  return Cesium.Cartesian3.fromDegreesArrayHeights(arrAll);
};

export const setPathData = (
  pointStart: number[],
  pointEnd: number[],
  h: number,
) => {
  pointStart = pointStart;
  pointEnd = pointEnd;
  h = h;

  let pathData = getBSRxyz(pointStart[0], pointStart[1], pointEnd[0], pointEnd[1], h);
  return pathData;
};
