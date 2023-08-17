//片元着色器，直接从源码复制
let SkyBoxFS = `uniform samplerCube u_cubeMap;
  in vec3 v_texCoord;
  out vec4 v_fragColor;
  void main()
  {
  vec4 color = texture(u_cubeMap, normalize(v_texCoord));
  v_fragColor = vec4(czm_gammaCorrect(color).rgb, czm_morphTime);
  }
`;

//顶点着色器有修改，主要是乘了一个旋转矩阵
let SkyBoxVS =
  ' uniform mat3 u_rotateMatrix;\n\
    in vec3 position;\n\
    out vec3 v_texCoord;\n\
    void main()\n\
    {\n\
    vec3 p = czm_viewRotation * u_rotateMatrix * (czm_temeToPseudoFixed * (czm_entireFrustum.y * position));\n\
    gl_Position = czm_projection * vec4(p, 1.0);\n\
    v_texCoord = position.xyz;\n\
    }\n\
  ';

export { SkyBoxFS, SkyBoxVS };
