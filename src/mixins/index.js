import * as modules from '@/components/_modules'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      pageAnimated: false
    }
  },
  computed: {
    showDefault () {
      return !(this.data && this.data.viewAttr && this.data.viewAttr.bg)
    }
  },
  mounted () {
    this.pageAnimated = true
    if (this.reload && !this.no_reload_on_mount) {
      this.reload()
    }
    // console.log(this.data)
  },
  components: {...modules},
  methods: {
    setFontsize (id, isHeight = false) {
      let dom = document.getElementById(id)
      if (dom) {
        let width = dom.clientWidth
        let height = dom.clientHeight
        let multiple = 1
        let a = width / height
        if (a > (1920 / 1080)) {
          multiple = (1920 / 1080) / a
        }
        if (a > 1.78) {
          dom.style.fontSize = width / 1920 * 100 * multiple + 'px'
        } else {
          dom.style.fontSize = height / 1080 * 100 + 'px'
        }

        // 如果考虑以高作为判断字体的因素
        if (isHeight) {
          if (a > (1920 / 1080)) {
            multiple = (1920 / 1080) / a
          } else {
            multiple = (1080 / 1920) / (height / width)
          }
          if (a > 1.78) {
            dom.style.fontSize = width / 1920 * 100 * multiple + 'px'
          } else {
            dom.style.fontSize = height / 1080 * 100 * multiple + 'px'
          }
        }
      }
    },
    getProportion (id) {
      let dom = document.getElementById(id)
      if (dom) {
        return dom.clientWidth / 1920
      } else {
        return 1
      }
    },
    defineBg () {
      if (this.data.viewAttr && this.data.viewAttr.bg) {
        return `
          background: url(${this.data.viewAttr.bg}) no-repeat center center;
          background-size: 100% 100%
        `
      }
    }
  }
}
