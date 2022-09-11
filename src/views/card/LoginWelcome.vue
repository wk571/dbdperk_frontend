<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>💐 欢迎{{this.user.username}}</span>
    </div>
    <div v-if="token != null && token !== ''" class="has-text-centered">
      <b-button type="is-danger" tag="router-link" :to="{path:'/post/create'}" outlined>✍ 建议与反馈</b-button>
    </div>

    <div v-else class="has-text-centered">
      <b-button type="is-primary" tag="router-link" :to="{path:'/register'}" outlined>马上入驻</b-button>
      <b-button type="is-danger" tag="router-link" :to="{path:'/login'}" outlined class="ml-2"> 社区登入</b-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'LoginWelcome',
  computed: {
    ...mapGetters([
      'token','user'
    ])
  }
}
</script>

<style scoped>

</style>