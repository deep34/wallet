<template>
  <span class="amount" :class="{'sub': sub}">
    <span class="value" v-html="formattedValue"/>
    <sub v-if="currency && sub" class="currency">{{currency}}</sub>
    <span v-else-if="currency" class="currency">{{currency}}</span>
  </span>
</template>

<script>
import { xeStringFromMicroXe } from '@edge/wallet-utils'

export default {
  name: 'Amount',
  props: {
    currency: String,
    short: Boolean,
    sub: Boolean,
    value: [Number, String],
  },
  computed: {
    isXE() {
      // if currency is not specified, we assume XE
      return this.currency === 'XE' || this.currency === '' || this.currency === undefined
    },
    formattedValue() {
      if (this.value === undefined) return '...'
      if (isNaN(this.value)) return '&mdash;'
      if (typeof this.value === 'string') return this.value
      if (this.isXE && !this.short) {
        return xeStringFromMicroXe(this.value * 1e6, true)
      }
      return this.value.toLocaleString('en-US', { maximumFractionDigits: 6 })
    }
  }
}
</script>
