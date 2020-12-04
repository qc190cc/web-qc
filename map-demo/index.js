
var areadata = [
    { key: 'beiJing', name: '北京', projectNum: 81, objectNum: 12003 },
    { key: 'shangHai', name: '上海', projectNum: 70, objectNum: 10562 },
    { key: 'tianJin', name: '天津', projectNum: 66, objectNum: 8693 },
    { key: 'chongQin', name: '重庆', projectNum: 68, objectNum: 8500 },
    { key: 'guangDong', name: '广东', projectNum: 92, objectNum: 14530 },
    { key: 'zheJiang', name: '浙江', projectNum: 88, objectNum: 12003 },
    { key: 'jiangSu', name: '江苏', projectNum: 82, objectNum: 10302 },
    { key: 'siChuan', name: '四川', projectNum: 76, objectNum: 10065 },
    { key: 'heBei', name: '河北', projectNum: 70, objectNum: 11032 },
    { key: 'shanXi', name: '山西', projectNum: 65, objectNum: 8700 },
    { key: 'liaoNing', name: '辽宁', projectNum: 56, objectNum: 7603 },
    { key: 'jiLin', name: '吉林', projectNum: 52, objectNum: 6847 },
    { key: 'heiLongJiang', name: '黑龙江', projectNum: 51, objectNum: 6953 },
    { key: 'anHui', name: '安徽', projectNum: 61, objectNum: 6584 },
    { key: 'fuJian', name: '福建', projectNum: 72, objectNum: 8937 },
    { key: 'jiangXi', name: '江西', projectNum: 50, objectNum: 6701 },
    { key: 'shanDong', name: '山东', projectNum: 72, objectNum: 8405 },
    { key: 'heNan', name: '河南', projectNum: 78, objectNum: 9547 },
    { key: 'huBei', name: '湖北', projectNum: 65, objectNum: 8097 },
    { key: 'huNan', name: '湖南', projectNum: 62, objectNum: 8003 },
    { key: 'haiNan', name: '海南', projectNum: 42, objectNum: 6780 },
    { key: 'guiZhou', name: '贵州', projectNum: 32, objectNum: 4981 },
    { key: 'yunNan', name: '云南', projectNum: 31, objectNum: 4532 },
    { key: 'shanXiS', name: '陕西', projectNum: 45, objectNum: 6983 },
    { key: 'ganSu', name: '甘肃', projectNum: 42, objectNum: 5872 },
    { key: 'qingHai', name: '青海', projectNum: 23, objectNum: 4503 },
    { key: 'neiMengGu', name: '内蒙古', projectNum: 21, objectNum: 4203 },
    { key: 'guangXi', name: '广西', projectNum: 56, objectNum: 7892 },
    { key: 'ningXia', name: '宁夏', projectNum: 31, objectNum: 5610 },
    { key: 'xinJiang', name: '新疆', projectNum: 21, objectNum: 4031 },
    { key: 'xiZang', name: '西藏', projectNum: 19, objectNum: 2933 },
    { key: 'tiWan', name: '台湾', projectNum: 10, objectNum: 2010 }
]
/**
 *  地图渲染
 **/
function Map() {
    this.mapChart = null; // 地图实例
    this.timer = null;  // 定时器
    this.activeNum = -1; // 轮播时被选中的下标
    this.init = function () {
        // 基于准备好的dom，初始化echarts实例
        const dom = document.getElementById("map");
        this.mapChart = echarts.init(dom);
        // 配置项
        const option = {
            tooltip: {
                // 提示框组件
                trigger: "item",
                // triggerOn: 'mousemove|click', // 提示框触发的条件，可选
                alwaysShowContent: false, // 是否永远显示提示框内容
                backgroundColor: "rgba(27, 60, 114, .7)",
                formatter: (params) => {
                    const data = params.data;
                    if (!data) return '';
                    return this.getToolTip(data);
                }
            },
            series: [
                {
                    type: "map",
                    mapType: "china",
                    data: areadata,
                    // zoom: 1.1, // 当前视角的缩放比例
                    roam: "scale", // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                    scaleLimit: {
                        min: 0.5,
                        max: 1.5
                    },
                    itemStyle: { // 地图区域的多边形 图形样式;也可在data里面为每个区域单独配置
                        areaColor: "#0093fd", // 地图区域的颜色
                        borderColor: "#00e2fb",
                        color: "#16bdf5",
                        opacity: 1
                    },
                    emphasis: { // 高亮状态下的多边形和标签样式
                        label: {
                            show: false
                        },
                        itemStyle: {
                            areaColor: "#15bef7"
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        this.mapChart.setOption(option);
        // 点击地图区域的callback
        this.mapChart.on("mouseover", this.mapMouseover);
        this.mapChart.on("mouseout", this.mapMouseout);
        this.setTimer();
    }
    // 处理数字
    this.getNum = (data) => {
        return (data || 0)
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }
    // 获取提示框内容
    this.getToolTip = (data) => {
        const name = data.name;
        const projectNum = this.getNum(data.projectNum); // 调查项目数
        const objectNum = this.getNum(data.objectNum); // 调查对象数
        const isLoop = this.activeNum >= 0;
        if (isLoop) { // 轮播模式
            // 轮播模式下的样式
            return `
                <div style="padding:5px;min-width: 100px;">
                    <div style="font-size: 1.2em;color: rgb(8, 190, 209);">
                        <span>${name}</span>
                        <span style="color:#758daf">
                            <span>(</span>
                            <span>${projectNum}</span>
                            <span>/</span>
                            <span>${objectNum}</span>
                            <span>)</span>
                        </span>
                    </div>
                </div>
            `;
        } else {
            return `
                <div style="padding:5px;min-width: 100px;">
                    <div style="padding: 0 0 5px;font-size: 1.2em;border-bottom: 1px solid rgba(126, 146, 176, 1);color: rgb(8, 190, 209);">
                        <span>${name}</span>
                    </div>
                    <div style="padding: 5px 0 3px;color: rgba(126, 146, 176, 1);">调查项目数</div>
                    <div style="padding: 0 0 3px;font-size: 1.2em;"><span>${projectNum}</span></div>
                    <div style="padding: 5px 0 3px;color: rgba(126, 146, 176, 1);">调查对象数</div>
                    <div style="padding: 0;font-size: 1.2em;"><span>${objectNum}</span></div>
                </div>
            `;
        }
    }
    this.mapMouseover = () => {
        this.setTimer(false);
    }
    this.mapMouseout = () => {
        this.setTimer(true);
    }
    // 开启定时器
    this.setTimer = (value = true) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.highlight(false);
        if (value) {
            this.timer = setInterval(() => {
                const len = areadata.length;
                const num = parseInt(Math.random() * len)
                this.highlight(false);
                this.activeNum = num;
                this.highlight();
            }, 3000);
        } else {
            this.activeNum = -1;
        }
    }
    // 高亮
    this.highlight = (active = true, num = this.activeNum) => {
        if (num < 0) return;
        this.mapChart.setOption({
            series: [
                {
                    emphasis: { // 高亮状态下的多边形和标签样式
                        itemStyle: {
                            areaColor: active ? 'rgb(71 189 229 / 90%)' : "#15bef7"
                        }
                    }
                }
            ]
        });
        this.mapChart.dispatchAction({
            type: active ? 'highlight' : 'downplay',
            dataIndex: num
        })
        this.mapChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: num
        })
    }
}
/**
 *  粒子特效
 **/
function Pointwave() {
    this.amountX = 50;
    this.amountY = 50;
    this.color = '#0a2c9e';
    this.top = 0;
    // dom
    this.indexLiziDom = null;
    this.count = 0;
    // 用来跟踪鼠标水平位置
    this.mouseX = 0;
    this.windowHalfX = null;
    // 相机
    this.camera = null;
    // 场景
    this.scene = null;
    // 批量管理粒子
    this.particles = null;
    // 渲染器
    this.renderer = null;
    this.inArea = false; // 进入区域
    // 渲染间隔
    this.renderTimer = 150;
    this.init = () => {
        const indexLiziDom = document.getElementById('indexLizi');
        this.indexLiziDom = indexLiziDom;
        const SEPARATION = 100
        const SCREEN_WIDTH = indexLiziDom.offsetWidth || window.innerWidth
        const SCREEN_HEIGHT = indexLiziDom.offsetHeight || window.innerHeight
        const container = document.createElement('div')
        this.windowHalfX = window.innerWidth / 2
        container.style.position = 'relative'
        container.style.top = `0`
        container.style.height = `100%`
        indexLiziDom.appendChild(container)

        this.camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000)
        this.camera.position.z = 1000

        this.scene = new THREE.Scene()

        const numParticles = this.amountX * this.amountY
        const positions = new Float32Array(numParticles * 3)
        const scales = new Float32Array(numParticles)
        // 初始化粒子位置和大小
        let i = 0
        let j = 0
        for (let ix = 0; ix < this.amountX; ix++) {
            for (let iy = 0; iy < this.amountY; iy++) {
                positions[i] = ix * SEPARATION - ((this.amountX * SEPARATION) / 2)
                positions[i + 1] = 0
                positions[i + 2] = iy * SEPARATION - ((this.amountY * SEPARATION) / 2)
                scales[j] = 1
                i += 3
                j++
            }
        }

        const geometry = new THREE.BufferGeometry()
        geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.addAttribute('scale', new THREE.BufferAttribute(scales, 1))
        // 初始化粒子材质
        const material = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(this.color) }
            },
            vertexShader: `
            attribute float scale;
            void main() {
              vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
              gl_PointSize = scale * ( 300.0 / - mvPosition.z );
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
            fragmentShader: `
            uniform vec3 color;
            void main() {
              if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
              gl_FragColor = vec4( color, 1.0 );
            }
          `
        })

        this.particles = new THREE.Points(geometry, material)
        this.scene.add(this.particles)

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setClearAlpha(0)
        container.appendChild(this.renderer.domElement)

        window.addEventListener('resize', this.onWindowResize, { passive: false })
        document.addEventListener('mousemove', this.onDocumentMouseMove, { passive: false })
        document.addEventListener('touchstart', this.onDocumentTouchStart, { passive: false })
        document.addEventListener('touchmove', this.onDocumentTouchMove, { passive: false })
    }
    this.render = () => {
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
        this.camera.position.y = 400
        this.camera.lookAt(this.scene.position)
        const positions = this.particles.geometry.attributes.position.array
        const scales = this.particles.geometry.attributes.scale.array
        // 计算粒子位置及大小
        let i = 0
        let j = 0
        for (let ix = 0; ix < this.amountX; ix++) {
            for (let iy = 0; iy < this.amountY; iy++) {
                positions[i + 1] = (Math.sin((ix + this.count) * 0.3) * 100) + (Math.sin((iy + this.count) * 0.5) * 100)
                scales[j] = (Math.sin((ix + this.count) * 0.3) + 1) * 8 + (Math.sin((iy + this.count) * 0.5) + 1) * 8
                i += 3
                j++
            }
        }
        // 重新渲染粒子
        this.particles.geometry.attributes.position.needsUpdate = true
        this.particles.geometry.attributes.scale.needsUpdate = true
        this.renderer.render(this.scene, this.camera)
        this.count += 0.1
    }
    this.animate = () => {
        this.render();
        setTimeout(() => {
            requestAnimationFrame(this.animate);
        }, this.renderTimer)
    }
    this.onDocumentMouseMove = (event) => {
        const info = this.indexLiziDom.getBoundingClientRect();
        if (
            event.clientX > info.left &&
            event.clientX < info.right &&
            event.clientY > info.top &&
            event.clientY < info.bottom
        ) { // 进入区域
            if (!this.inArea) {
                this.inArea = true;
            }
            if (this.renderTimer != 100) {
                this.renderTimer = 100;
            }
            this.mouseX = event.clientX - this.windowHalfX
        } else {
            if (this.inArea) {
                this.inArea = false;
            }
            if (this.renderTimer != 150) {
                this.renderTimer = 150;
            }
        }
    }
    this.onDocumentTouchStart = (event) => {
        if (event.touches.length === 1) {
            this.mouseX = event.touches[0].pageX - this.windowHalfX
        }
    }
    this.onDocumentTouchMove = (event) => {
        if (event.touches.length === 1) {
            event.preventDefault()
            this.mouseX = event.touches[0].pageX - this.windowHalfX
        }
    }
    this.onWindowResize = () => {
        this.windowHalfX = window.innerWidth / 2
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
}
function MainFun() {
    this.dialogShow = false;
    this.init = () => {
        const headerDom = document.getElementById('header-map');
        headerDom.innerHTML = `
            <div class="box" style="z-index: 999;">
                <div id="map" style="width: 70%;height: 100%;"></div>
            </div>
            <div class="box">
                <div id="indexLizi" style="height:100%;"></div>
            </div>
            <div class="btn-dom btn">
                <span>图表</span>
            </div>
            <div class="dialog-dom">
                ${this.getDialogContent()}
            </div>
        `
        headerDom.querySelector('.btn-dom').onclick = showDialog;
        headerDom.querySelector('.close').onclick = showDialog;
        function showDialog() {
            headerDom.className = headerDom.className == 'show' ? '' : 'show';
        }
    }
    this.getDialogContent = () => {
        let con = '';
        for (const item of areadata) {
            con += `
                <div class="table-row">
                    <span class="name ">${item.name}</span><span class="">${item.projectNum}</span><span class="">${item.objectNum}</span>
                </div>
            `
        }
        const content = `
            <div class="table" >
                <div class="close btn">×</div>
                ${con}
            </div>
        `
        return content
    }
}
window.addEventListener('load', function () {
    const map = new Map();
    const poinwave = new Pointwave();
    const main = new MainFun();
    main.init();
    map.init();
    poinwave.init();
    poinwave.animate();
})
