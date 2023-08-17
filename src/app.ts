import "./app.css";
import * as Cesium from "cesium";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";

import { setPathData } from './FlowingLineMaterial/common/setPathData';
import { setFlyLine } from './FlowingLineMaterial/setFlyLine';

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

let camera = new Camera(
  viewer,
  gui,
  {
    position: {
      longitude: 112.764563,
      latitude: 21.155502,
      height: 83476,
    },
    headingPitchRoll: {
      heading: 16.019172,
      pitch: -26.09177,
      roll: 0.150147,
    },
  },
  true,
);

let positions = setPathData([113.17, 23.8], [114.0, 22.5], 50000);
let colors = [];
let length = positions.length;
for (let i = 0; i < length; ++i) {
  let alpha = 0;
  if (i < length / 2) {
    alpha = (i / length) * 2 * 0.6 + 0.2;
  } else {
    alpha = ((length - i) / length) * 2 * 0.6 + 0.2;
  }
  colors.push(
    Cesium.Color.fromRandom({
      red: 0.0,
      green: 1.0,
      blue: 0.0,
      alpha: alpha,
    }),
  );
}

viewer.scene.primitives.add(
  new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: positions,
        width: 2.0,
        vertexFormat: Cesium.PolylineColorAppearance.VERTEX_FORMAT,
        colors: colors,
        colorsPerVertex: true,
      }),
    }),
    appearance: new Cesium.PolylineColorAppearance(),
  }),
);

setFlyLine(viewer, positions);
