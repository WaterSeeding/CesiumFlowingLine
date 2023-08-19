# Cesium.js 如何来写一条飞线（抛物线）特效？

> Cesium.js 提供了许多功能来绘制可视化地球表面上的各种几何图形。其中之一是 Polyline，它用于绘制线段或折线。
>
> 以下是我绘制的一条飞线案例，它虽然是通过 Polyline 来绘制的，但是还需要额外自定义 GLSL 效果。
>
> - [查看地址](https://cesium-flowing-line.vercel.app/)
> - [仓库地址](https://github.com/WaterSeeding/CesiumFlowingLine)

<br />

## 介绍

![后期处理](<./md/Cesium.js如何来写一条飞线(抛物线)特效？/1.gif>)

如图所示，以两个地点（广州、深圳）形成一条绿色的抛物线，其中有一个青蓝色的锚点在这条抛物线上移动。

<br />

## 设置

1. 两地点通过贝塞尔曲线算法获取飞线轨道数据

```tsx
let positions = setPathData([113.17, 23.8], [114.0, 22.5], 50000);
```

2. 通过飞线轨道数据绘制飞线轨道 Polyline 图形

```tsx
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
  })
);
```

3. 通过飞线轨道数据绘制飞线锚点 Polyline 图形（自定义 GLSL 效果）

```tsx
let FlowingLineMaterial = new Cesium.Material({
  fabric: {
    type: "FlowingLineMaterial",
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
```

这里主要通过GLSL绘制青蓝色的锚点，在一条无形线上移动：

```tsx
let FlowingLineMaterialGLSL =
  "float SPEED_STEP = 0.01; \n" +
  "vec4 drawLight(float xPos, vec2 st, float headOffset, float tailOffset, float widthOffset){ \n" +
  "float lineLength = smoothstep(xPos + headOffset, xPos, st.x) - smoothstep(xPos, xPos - tailOffset, st.x); \n" +
  "float lineWidth = smoothstep(widthOffset, 0.5, st.y) - smoothstep(0.5, 1.0 - widthOffset, st.y); \n" +
  "return vec4(lineLength * lineWidth); \n" +
  "}\n" +
  "czm_material czm_getMaterial(czm_materialInput materialInput) \n" +
  "{ \n" +
  "czm_material m = czm_getDefaultMaterial(materialInput);\n" +
  "float sinTime = sin(czm_frameNumber * SPEED_STEP * speed); \n" +
  "vec4 v4_core;\n" +
  "vec4 v4_color;\n" +
  "float xPos = 0.0; \n" +
  "if (sinTime < 0.0){ \n" +
  "xPos = cos(czm_frameNumber * SPEED_STEP * speed)+ 1.0 - tailsize; \n" +
  "}else{ \n" +
  "xPos = -cos(czm_frameNumber * SPEED_STEP * speed)+ 1.0 - tailsize; \n" +
  "} \n" +
  "v4_color = drawLight(xPos, materialInput.st, headsize, tailsize, widthoffset);\n" +
  "v4_core = drawLight(xPos, materialInput.st, coresize, coresize*2.0, widthoffset*2.0);\n" +
  "m.diffuse = color.xyz + v4_core.xyz*v4_core.w*0.8; \n" +
  "m.alpha = pow(v4_color.w, 3.0); \n" +
  "return m; \n" +
  "} \n";

export { FlowingLineMaterialGLSL };
```

<br />

## 相关资料

- [Cesium](https://cesium.com/)
- [Cesium Documentation](https://cesium.com/docs/)
