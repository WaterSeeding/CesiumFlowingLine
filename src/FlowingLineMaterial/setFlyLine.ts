import * as Cesium from "cesium";
import { FlowingLineMaterialGLSL } from './common/FlowingLineMaterialGLSL';

export const setFlyLine = (
  viewer: Cesium.Viewer,
  positions: Cesium.Cartesian3[],
) => {
  let scene = viewer.scene;
  let FlowingLineMaterial = new Cesium.Material({
    fabric: {
      type: 'FlowingLineMaterial',
      uniforms: {
        color: new Cesium.Color(0.0, 1.0, 0.0, 0.5), // light color
        speed: 1.5, // flowing speed, speed > 0.0
        headsize: 0.05, // 0.0 < headsize < 1.0
        tailsize: 0.5, // 0.0 < tailsize < 1.0
        widthoffset: 0.1, // 0.0 < widthoffset < 1.0
        coresize: 0.05, // 0.0 < coresize < 1.0
      },
      source: FlowingLineMaterialGLSL,
    },
  });

  let primitive = new Cesium.Primitive({
    geometryInstances: new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: positions,
        width: 20.0,
        vertexFormat: Cesium.VertexFormat.ALL,
      }),
    }),
    appearance: new Cesium.PolylineMaterialAppearance({
      material: FlowingLineMaterial,
    }),
  });

  scene.primitives.add(primitive);
};
