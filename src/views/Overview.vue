<template>
  <Header />
  <AccountPanel/>

  <div class="bg-gray-200 py-35">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <NewsPromo />
        <RecentBlocks />
      </div>

      <div class="mt-15">
        <h3>Recent transactions</h3>
        <p v-if="loading">
          Loading...
        </p>
        <p v-if="error">{{error}}</p>

        <p v-if="!loading">
          <Overviews :overviews="overviews" :transactions="transactions" />
        </p>
      </div>

      <div class="w-full text-right" v-if="transactions.length">
        <a href="/transactions" class="button button--success">View all</a>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Overviews from "@/components/Overviews"
import AccountPanel from "@/components/AccountPanel"
import TransactionsTable from "@/components/TransactionsTable"
import NewsPromo from "@/components/NewsPromo"
import RecentBlocks from "@/components/RecentBlocks"
import { mapState } from 'vuex'
import { fetchTransactions } from '../utils/api'

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {
  name: 'Overview',
  title: 'Overview',
  data: function () {
    return {
      transactions: [],
      loading: true,
      error: '',
      polling: null,
      overviews: [],
      transactionRefreshInterval: 5000
    }
  },
  components: {
    AccountPanel,
    Overviews,
    TransactionsTable,
    Header,
    NewsPromo,
    RecentBlocks
  },
  computed: mapState(['address']),
  mounted() {
    this.initialise()
  },
  unmounted() {
    clearInterval(this.polling)
  },
  methods: {
    async initialise() {
      await this.updateTransactions()
      this.pollData()
    },
    async updateTransactions() {
      const { transactions, metadata } = await fetchTransactions(this.address, { limit: 5 })

      // Update this.transactions & this.metadata only once promise has resolved
      this.transactions = transactions
      this.metadata = metadata
      this.loading = false
    },
    pollData() {
      this.polling = setInterval(() => {
        this.updateTransactions()
      }, this.transactionRefreshInterval)
    }
  }
}
</script>