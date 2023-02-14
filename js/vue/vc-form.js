export default {
  template: `<form>
  <template v-for="(item, index) in formItems">

    <label v-if="item.type === 'number'">{{item.name || item.prop}}
      <input type="number" v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
    </label>
    <div v-else-if="item.type === 'radio'">{{item.name || item.prop}}
      <label v-for="(option, ind) in item.options" :key="ind" style=" margin-left:1rem;">
        {{option.name}}
        <input type="radio" :name="item.prop"  v-model="formData[item.prop]" :value="option.value" @change="(val) => inputChange(val, item)">
      </label>
    </div>
    <button v-else-if="item.type === 'button'" @click="item.click">{{item.name || item.prop}}</button>
    <label v-else>{{item.name || item.prop}}
      <input v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
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