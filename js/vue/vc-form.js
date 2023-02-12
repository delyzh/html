export default {
  template: `<form>
  <template v-for="(item, index) in formItems">

    <label>{{item.name || item.prop}}
      <input v-if="item.type === 'number'" type="number" v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
      <input v-else  v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
    </label>
    <br/>
  </template>
</form>`,
  name: 'vc-form',
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
    const cache = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    return {
      formData: {...this.modelValue, ...cache},
    }
  },
  beforeMount() {
    const cache = JSON.parse(localStorage.getItem(this.storageKey) || 'null');
    if (cache != null) {
      this.$emit('update:modelValue', this.formData)
    }
  },
  methods: {
    inputChange(val, item) {
      this.$emit('update:modelValue', this.formData)
      this.$emit('change', item.name, val, item)
      if (this.storageKey) {
        localStorage.setItem(this.storageKey, JSON.stringify(this.formData))
      }
    }
  }
}