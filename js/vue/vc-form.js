export default {
  template: `<form class="vc-form">
  <template v-for="(item, index) in formItems">

    <label v-if="item.type === 'number'"><span class="label-text">{{item.name || item.prop}}</span>
      <input type="number" v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
    </label>
    <div v-else-if="item.type === 'radio'" class="vc-form-radio"><span class="label-text">{{item.name || item.prop}}</span>
      <label v-for="(option, ind) in item.options" :key="ind" style=" margin-left:1rem;">
        {{option.name}}
        <input type="radio" :name="item.prop"  v-model="formData[item.prop]" :value="option.value" @change="(val) => inputChange(val, item)">
      </label>
    </div>
    <label class="vc-form-radio" v-else-if="item.type === 'checkbox'">
      <span class="label-text">{{item.name || item.prop}}</span>
      <el-checkbox-group v-model="formData[item.prop]" @change="(val) => inputChange(val, item)">
        <el-checkbox  v-for="(option, ind) in item.options" :key="ind" :label="option.value">{{option.name}}</el-checkbox>
      </el-checkbox-group>
    </label>
    <button class="vc-form-radio" v-else-if="item.type === 'button'" @click="item.click"><span class="label-text">{{item.name || item.prop}}</span> </button>
    <label v-else>{{item.name || item.prop}}
      <input v-model="formData[item.prop]" @change="(val) => inputChange(val, item)"/>
    </label>
    <div v-else-if="item.type === 'html'">{{item.value}}</div>
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