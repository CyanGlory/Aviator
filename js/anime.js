/* eslint-disable id-length */
/* eslint-disable no-mixed-operators */

function normalize(v, vmin, vmax, tmin, tmax) {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  const tv = tmin + pc * dt;
  return tv;
}

function updatePlane() {
  // 让我们在x轴上-100至100之间和y轴25至175之间移动飞机
  // 根据鼠标的位置在-1与1之间的范围，我们使用的 normalize 函数实现（如下）

  const targetX = normalize(this.mousePos.x, -1, 1, -100, 100);
  const targetY = normalize(this.mousePos.y, -1, 1, 25, 175);

  // 更新飞机的位置
  this.airplane.mesh.position.y = targetY;
  this.airplane.mesh.position.x = targetX;
  this.airplane.propeller.rotation.x += 0.3;
}

export default function loop() {
  this.sea.mesh.rotation.z += 0.005;
  this.sky.mesh.rotation.z += 0.01;

  // 更新每帧的飞机
  Reflect.apply(updatePlane, this, []);

  this.renderer.render(this.scene, this.camera);
  // Note: 如果不加 this, 则调用当前 loop 函数, 而不是绑定之后的.
  requestAnimationFrame(this.loop);
}

// 作者先前写的 loop, demo - 1 过程中被替换了
export function oldLoop() {
  // 使螺旋桨旋转并转动大海和云
  this.airplane.propeller.rotation.x += 0.3;
  this.sea.mesh.rotation.z += 0.005;
  this.sky.mesh.rotation.z += 0.01;

  // 渲染场景
  this.renderer.render(this.scene, this.camera);

  // 重新调用 render() 函数
  requestAnimationFrame(loop);
}
