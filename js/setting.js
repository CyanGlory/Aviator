/* eslint-disable id-length */
/* eslint-disable no-multi-spaces */
/**
 * 创建环境
 * 获得屏幕的宽和高, 用它们设置相机的纵横比, 还有渲染器的大小
 */
import { Scene, Fog, PerspectiveCamera, WebGLRenderer, HemisphereLight, DirectionalLight } from 'three';

import { Sea, AirPlane, Sky } from './Entity';

export function createEnv() {
  this.HEIGHT = window.innerHeight;
  this.WIDTH = window.innerWidth;

  const createScene = () => {
    // 创建场景
    this.scene = new Scene();

    // 在场景中添加雾的效果, 这会影响到哪些远处的方块的颜色
    // 所以, 样式上使用和背景一样的颜色
    this.scene.fog = new Fog(0xf7d9aa, 100, 950);
  };

  const createCamera = () => {
    // 创建相机
    const fieldOfView = 60;
    const aspectRatio = this.WIDTH / this.HEIGHT;
    const nearPlane = 1;
    const farPlane = 10000;

    /**
     * PerspectiveCamera 透视相机
     * @param fieldOfView 视角
     * @param aspectRatio 纵横比
     * @param nearPlane 近平面
     * @param farPlane 远平面
     */
    this.camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
    );

    // 设置相机的位置
    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;
  };

  const createRenderer = () => {
    // 创建渲染器
    this.renderer = new WebGLRenderer({
      alpha: true,      // 在 css 中设置背景色透明显示渐变色, 关闭后, css 背景色将失效
      antialias: true,  // 开启抗锯齿, 但这样会降低性能。不过, 由于我们的项目基于低多边形的, 那还好 :)
    });

    // 定义渲染器的尺寸, 在这里它会填满整个屏幕
    this.renderer.setSize(this.WIDTH, this.HEIGHT);

    // 打开渲染器的阴影地图, 将影响圆柱体的阴影
    this.renderer.shadowMap.enabled = true;

    // 在 HTML 创建的容器中添加渲染器的 DOM 元素
    this.container = document.getElementById('world');
    this.container.appendChild(this.renderer.domElement);
  };

  createScene();
  createCamera();
  createRenderer();
}

export function createLights() {
  // 半球光就是渐变的光
  // 第一个参数是天空的颜色, 第三个参数是光源的强度
  const hemisphereLight = new HemisphereLight(0xaaaaaa, 0x000000, 0.9);

  // 方向光是从一个特定的方向的照射
  // 类似太阳，即所有光源是平行的
  // 第一个参数是关系颜色，第二个参数是光源强度
  const shadowLight = new DirectionalLight(0xffffff, 0.9);

  // 设置光源的方向。
  // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
  shadowLight.position.set(150, 350, 350);

  // 开启光源投影
  shadowLight.castShadow = true;

  // 定义可见域的投射阴影
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  // 为了使这些光源呈现效果，只需要将它们添加到场景中
  this.scene.add(hemisphereLight);
  this.scene.add(shadowLight);
}

// 实例化大海对象, 并添加至场景
function createSea() {
  this.sea = new Sea();

  // 在场景底部, 稍微推挤一下
  this.sea.mesh.position.y = -600;

  // 添加大海的网格至场景
  this.scene.add(this.sea.mesh);
}


// 现在我们实例化天空对象，而且将它放置在屏幕中间稍微偏下的位置。
function createSky() {
  this.sky = new Sky();
  this.sky.mesh.position.y = -600;

  this.scene.add(this.sky.mesh);
}

function createPlane() {
  this.airplane = new AirPlane();
  this.airplane.mesh.scale.set(0.25, 0.25, 0.25);
  this.airplane.mesh.position.y = 100;
  this.scene.add(this.airplane.mesh);
}

export function createEntity() {
  Reflect.apply(createSea, this, []);
  Reflect.apply(createSky, this, []);
  Reflect.apply(createPlane, this, []);
}
