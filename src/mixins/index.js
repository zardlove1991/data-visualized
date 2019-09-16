import * as modules from '@/components/_modules'
export default {
  data () {
    return {
      pageAnimated: false
    }
  },
  mounted () {
    this.pageAnimated = true
    if (this.reload && !this.no_reload_on_mount) {
      this.reload()
    }
  },
  components: {...modules},
  methods: {
    setFontsize (id) {
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
      }
    },
    getProportion (id) {
      let dom = document.getElementById(id)
      if (dom) {
        return dom.clientWidth / 1920
      } else {
        return 1
      }
    }
  }
}
