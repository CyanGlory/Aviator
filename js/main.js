/* eslint-disable id-length */
/* eslint-disable no-mixed-operators */

import { createEnv, createLights, createEntity } from './setting';
import loop from './anime';

class Aviator {
  constructor() {
    // 环境
    this.scene = {};
    this.camera = {};
    this.renderer = {};
    // 数据
    this.HEIGHT = undefined;
    this.WIDTH = undefined;
    this.container = {};
    this.mousePos = { x: 0, y: 0 };
    // 物体实例
    this.sea = {};
    this.sky = {};
    this.airplane = {};

    // window.addEventListener('load', this.init, false);
    // 改动至 html 类外部了.(见文件尾)

    this.createEnv = createEnv.bind(this);
    this.createLights = createLights.bind(this);
    this.createEntity = createEntity.bind(this);
    
    this.loop = loop.bind(this);
  }

  init() {
    // 创建环境: 场景, 相机, 渲染器
    this.createEnv();
    // 添加光源
    this.createLights();
    
    // 添加物体: 飞机, 海洋, 天空
    this.createEntity();

    // 监听鼠标移动
    document.addEventListener('mousemove', this.handleMouseMove, false);
    // 监听屏幕缩放, 缩放屏幕更新相机和渲染器的尺寸
    window.addEventListener('resize', this.handleWindowResize, false);
    // 调用循环函数, 在每帧更新对象的位置和渲染场景
    this.loop();
  }

  // 更新渲染器的高度和宽度以及相机的纵横比
  handleWindowResize() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;

    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.aspect = WIDTH / HEIGHT;
    this.camera.updateProjectionMatrix();
  }
  
  handleMouseMove(event) {
    // 这里我把接收到的鼠标位置的值转换成归一化值，在-1与1之间变化
    // 这是x轴的公式:
    const tx = event.clientX / this.WIDTH * 2 - 1;
  
    // 对于 y 轴，我们需要一个逆公式
    // 因为 2D 的 y 轴与 3D 的 y 轴方向相反
    const ty = event.clientY / this.HEIGHT * 2 + -1;
    this.mousePos = { x: tx, y: ty };
  }
}

window.addEventListener('load', () => {
  new Aviator().init();
}, false);
