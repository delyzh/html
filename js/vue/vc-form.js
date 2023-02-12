Vue.component('vc-form', {
  template: `<form>
<label v-for="(item, index) in formItems">{{item.name || item.prop}}
    <input v-if="item.type === 'number'" type="number" v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
    <input v-else  v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
</label>
</form>`,
  props: {
    formItems: {
      type: Array,
      default: [],
      required: true,
    },
    modelValue: {
      type: Object,
      default: {},
      required: true,
    },
    storageKey: {
      type: String,
      default: null,
      required: false,
    }
  },
  data() {
    return {
      formData: {...this.modelValue},
    }
  },
  methods: {
    inputChange(val, item) {
      this.$emits('update:modelValue')
      this.$emits('change', item.name, val, item)
    }
  }
})