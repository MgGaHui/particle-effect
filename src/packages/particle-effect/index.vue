<template>
  <div class="root-particle">
    <canvas ref="canvas"
            v-bind="$attrs"
            v-on="$listeners"></canvas>
  </div>
</template>

<script>/**/
import {debounce, requestAnimationFrame} from '@/utils/common-util'

let canvasInstance = null
// x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
const warea = {x: null, y: null, max: 20000}
// 粒子数组
const dots = []

export default {
  name: 'particle-effect',
  data() {
    return {}
  },
  mounted() {
    this.init()
    // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
    setTimeout(() => {
      this.animate()
    }, 100)
  },
  methods: {
    init() {
      this.resize()
      this.initListener()
      this.addParticle()
    },
    getCanvas() {
      return canvasInstance || (canvasInstance = this.$refs['canvas'])
    },
    resize() {
      const canvas = this.getCanvas()
      canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    },
    clearCanvas() {
      const canvas = this.getCanvas()
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },
    // 添加粒子
    addParticle() {
      // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
      const canvas = this.getCanvas()
      for (let i = 0; i < 300; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const xa = Math.random() * 2 - 1
        const ya = Math.random() * 2 - 1
        dots.push({
          x: x,
          y: y,
          xa: xa,
          ya: ya,
          max: 6000
        })
      }
    },
    // 每一帧循环的逻辑
    animate() {
      const canvas = this.getCanvas()
      const ctx = canvas.getContext('2d')
      this.clearCanvas()
      // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
      const ndots = [warea].concat(dots)

      dots.forEach(function (dot) {
        // 粒子位移
        dot.x += dot.xa
        dot.y += dot.ya

        // 遇到边界将加速度反向
        dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1
        dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1

        // 绘制点
        ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1)

        // 循环比对粒子间的距离
        const length = ndots.length
        for (let i = 0; i < length; i++) {
          const d2 = ndots[i]

          if (dot === d2 || d2.x === null || d2.y === null) continue

          const xc = dot.x - d2.x
          const yc = dot.y - d2.y

          // 两个粒子之间的距离
          const dis = xc * xc + yc * yc

          // 距离比
          let ratio
          // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
          if (dis < d2.max) {
            // 如果是鼠标，则让粒子向鼠标的位置移动
            if (d2 === warea && dis > (d2.max / 2)) {
              dot.x -= xc * 0.03
              dot.y -= yc * 0.03
            }

            // 计算距离比
            ratio = (d2.max - dis) / d2.max

            // 画线
            ctx.beginPath()
            ctx.lineWidth = ratio / 2
            ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')'
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(d2.x, d2.y)
            ctx.stroke()
          }
        }

        // 将已经计算过的粒子从数组中删除
        ndots.splice(ndots.indexOf(dot), 1)
      })
      requestAnimationFrame(this.animate)
    },
    initListener() {
      const resize = debounce(this.resize, 300)
      window.addEventListener('resize', resize)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('resize', resize)
      })
      // 鼠标活动时，获取鼠标坐标
      const mousemove = function (e) {
        e = e || window.event
        warea.x = e.clientX
        warea.y = e.clientY
      }
      window.addEventListener('mousemove', mousemove)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('mousemove', mousemove)
      })
      const mouseout = function () {
        warea.x = null
        warea.y = null
      }
      window.addEventListener('mouseout', mouseout)
      this.$once('hook:beforeDestroy', function () {
        window.removeEventListener('mouseout', mouseout)
      })
    }
  }
}
</script>

<style scoped>
  .root-particle {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
</style>
