/* eslint-disable id-length */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-statements */
import {
  CylinderGeometry,
  Matrix4,
  MeshPhongMaterial,
  FlatShading,
  Mesh,
  Object3D,
  BoxGeometry,
} from 'three';

export const Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

export function Sea() {
  // 创建一个圆柱几何体
  // 参数为：顶面半径, 底面半径, 高度, 半径分段, 高度分段
  const geom = new CylinderGeometry(600, 600, 800, 40, 10);

  // 在 x 轴旋转几何体
  geom.applyMatrix(new Matrix4().makeRotationX(-Math.PI / 2));

  // 创建材质
  const mat = new MeshPhongMaterial({
    color: Colors.blue,
    transparent: true,
    opacity: 0.6,
    flatShading: FlatShading,
  });

  // 为了在 js 创建一个物体, 我们必须创建网格用来组合几何体和一些材质
  this.mesh = new Mesh(geom, mat);

  // 允许大海对象接收阴影
  this.mesh.receiveShadow = true;
}


export function AirPlane() {
  this.mesh = new Object3D();
  // 创建机舱
  const geomCockpit = new BoxGeometry(60, 50, 50, 1, 1, 1);
  const matCockpit = new MeshPhongMaterial({
    color: Colors.red,
    flatShading: FlatShading,
  });
  const cockpit = new Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  this.mesh.add(cockpit);

  // 创建引擎
  const geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
  const matEngine = new MeshPhongMaterial({
    color: Colors.white,
    flatShading: FlatShading,
  });
  const engine = new Mesh(geomEngine, matEngine);
  engine.position.x = 40;
  engine.castShadow = true;
  engine.receiveShadow = true;
  this.mesh.add(engine);

  // 创建机尾
  const geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
  const matTailPlane = new MeshPhongMaterial({
    color: Colors.red,
    flatShading: FlatShading,
  });
  const tailPlane = new Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-35, 25, 0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  this.mesh.add(tailPlane);

  // 创建机翼
  const geomSideWing = new BoxGeometry(40, 8, 150, 1, 1, 1);
  const matSideWing = new MeshPhongMaterial({
    color: Colors.red,
    flatShading: FlatShading,
  });
  const sideWing = new Mesh(geomSideWing, matSideWing);
  sideWing.castShadow = true;
  sideWing.receiveShadow = true;
  this.mesh.add(sideWing);

  // 创建螺旋桨
  const geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);
  const matPropeller = new MeshPhongMaterial({
    color: Colors.brown,
    flatShading: FlatShading,
  });
  this.propeller = new Mesh(geomPropeller, matPropeller);
  this.propeller.castShadow = true;
  this.propeller.receiveShadow = true;

  // 创建螺旋桨的桨叶
  const geomBlade = new BoxGeometry(1, 100, 20, 1, 1, 1);
  const matBlade = new MeshPhongMaterial({
    color: Colors.brownDark,
    flatShading: FlatShading,
  });

  const blade = new Mesh(geomBlade, matBlade);
  blade.position.set(8, 0, 0);
  blade.castShadow = true;
  blade.receiveShadow = true;
  this.propeller.add(blade);
  this.propeller.position.set(50, 0, 0);
  this.mesh.add(this.propeller);
}


function Cloud() {
  // 创建一个空的容器放置不同形状的云
  this.mesh = new Object3D();

  // 创建一个正方体, 这个形状会被复制创建云
  const geom = new BoxGeometry(20, 20, 20);

  // 创建材质, 一个简单的白色材质就可以达到效果
  const mat = new MeshPhongMaterial({
    color: Colors.white,
  });

  // 随机多次复制几何体
  const nBlocs = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < nBlocs; i += 1) {
    // 通过复制几何体创建网格
    const m = new Mesh(geom, mat);

    // 随机设置每个正方体的位置和旋转角度
    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;

    // 随机设置正方体的大小
    const s = Math.random() * 0.9 + 0.1;
    m.scale.set(s, s, s);

    // 允许每个正方体生成投影和接收阴影
    m.castShadow = true;
    m.receiveShadow = true;

    // 将正方体添加至开始时我们创建的容器中
    this.mesh.add(m);
  }
}

// 定义一个天空对象
export function Sky() {
  // 创建一个空的容器
  this.mesh = new Object3D();

  // 选取若干朵云散布在天空中
  this.nClouds = 20;

  // 把云均匀地散布, 我们需要根据统一的角度放置它们
  const stepAngle = Math.PI * 2 / this.nClouds;

  // 创建云对象
  for (let i = 0; i < this.nClouds; i += 1) {
    const c = new Cloud();

    // 设置每朵云的旋转角度和位置
    // 因此我们使用了一点三角函数
    const a = stepAngle * i; // 这是云的最终角度
    const h = 750 + Math.random() * 200; // 这是轴的中心和云本身之间的距离

    // 三角函数！！！希望你还记得数学学过的东西 :)
    // 假如你不记得:
    // 我们简单地把极坐标转换成笛卡坐标
    c.mesh.position.y = Math.sin(a) * h;
    c.mesh.position.x = Math.cos(a) * h;

    // 根据云的位置旋转它
    c.mesh.rotation.z = a + Math.PI / 2;

    // 为了有更好的效果，我们把云放置在场景中的随机深度位置
    c.mesh.position.z = -400 - Math.random() * 400;

    // 而且我们为每朵云设置一个随机大小
    const s = 1 + Math.random() * 2;
    c.mesh.scale.set(s, s, s);

    // 不要忘记将每朵云的网格添加到场景中
    this.mesh.add(c.mesh);
  }
}

