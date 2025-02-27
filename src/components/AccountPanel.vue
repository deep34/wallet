<template>
  <div class="account-panel">

    <div class="container">
      <div class="account-panel__left">
        <div class="account-panel__address">
          <h3 class="mb-1">Address</h3>
          <span>{{ address }}</span>
        </div>

        <div class="account-panel__balance">
          <h3 class="mb-1">Balance</h3>
          <h1><Amount :value="balance / 1e6" currency="XE" sub/></h1>
        </div>
      </div>

      <div class="account-panel__right">
        <div class="account-panel__buttons">
          <button class="w-full button button--success" @click="openSend">
            <span class="w-12 button__icon">
              <ArrowUpIcon/>
            </span>
            Send
          </button>

          <button class="w-full button button--outline-success" @click="openExchange">
            <span class="button__icon w-15">
              <SwitchHorizontalIcon/>
            </span>
            Exchange
          </button>
        </div>
      </div>
    </div>

    <div class="account-panel__modals">
      <SendModal :close="reset" :visible="modal === 'send'"/>
      <ExchangeModal :close="reset" :openDeposit="openDeposit" :openWithdraw="openWithdraw" :openSell="openSell" :visible="modal === 'exchange'"/>
      <DepositModal :close="reset" :visible="modal === 'deposit'"/>
      <WithdrawModal :close="reset" :visible="modal === 'withdraw'"/>
      <SellModal :close="reset" :visible="modal === 'sell'"/>
    </div>
  </div>
</template>

<script>
import Amount from './Amount.vue'
import DepositModal from './tx/DepositModal'
import ExchangeModal from './tx/ExchangeModal'
import SendModal from './tx/SendModal'
import SellModal from './tx/SellModal'
import WithdrawModal from './tx/WithdrawModal'
import { mapState } from 'vuex'
import { ArrowUpIcon, SwitchHorizontalIcon } from '@heroicons/vue/outline'

export default {
  name: 'AccountPanel',
  components: {
    Amount,
    ArrowUpIcon,
    DepositModal,
    ExchangeModal,
    SendModal,
    SellModal,
    SwitchHorizontalIcon,
    WithdrawModal,
  },
  computed: mapState(['address', 'balance']),
  data() {
    return {
      modal: ''
    }
  },
  methods: {
    reset() {
      this.modal = ''
    },
    openDeposit() {
      this.modal = 'deposit'
    },
    openExchange() {
      this.modal = 'exchange'
    },
    openSell() {
      this.modal = 'sell'
    },
    openSend() {
      this.modal = 'send'
    },
    openWithdraw() {
      this.modal = 'withdraw'
    },
  }
}

</script>

<style scoped>
.account-panel {
  @apply bg-black-100 pt-16 pb-30;
}

.account-panel__left,
.account-panel__right {
  @apply w-full;
}

.account-panel__address {
  @apply text-gray text-sm2 mb-7 w-full;
}

.account-panel__address span {
  @apply text-white break-all block;
}

.account-panel__balance h3 {
  @apply text-green mb-5;
}

.account-panel__balance h1 {
  @apply text-white mb-0 font-normal;
}

.account-panel__balance h1 :deep(sub) {
  @apply bottom-0 text-half;
}

.account-panel__buttons {
  @apply grid gap-6 grid-cols-1 w-full flex-shrink-0 mt-12;
}

.account-panel__buttons button {
  @apply w-full;
}

.account-panel__balance {
  @apply flex-grow mb-6;
}

.account-panel__modals {
  width: 1px;
}

@screen md {
  .account-panel .container {
    @apply flex flex-row justify-between items-end;
  }

  .account-panel__left,
  .account-panel__right {
    @apply w-auto;
  }

  .account-panel__address {
    @apply pr-9 my-12;
  }

  .account-panel__address span {
    @apply inline;
  }

  .account-panel__buttons {
    @apply grid grid-cols-2 mt-0;
  }

  .account-panel__buttons > button {
    width: 170px;
  }

  .account-panel__balance {
    @apply mb-0;
  }
}
</style>
