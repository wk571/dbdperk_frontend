<template>
  <el-card class="box-card" shadow="never">
    <div slot="header">
      <span>🥂 秘密圣所</span>
    </div>
    <div>
      <p v-for="(item, index) in list1" :key="index" class="block">
        <el-card>{{ item }}</el-card>
      </p>
    </div>
  </el-card>
</template>

<script>
import { getList } from '@/api/promote'
import {sacredPlace} from '@/api/post'

export default {
  name: 'Promotion',
  data() {
    return {
      list: [],
      list1: []
    }
  },
  created() {
    this.getSacredPlace()
  },
  methods: {
    fetchList() {
      getList().then((response) => {
        const { data } = response
        this.list = data
      })
    },
    getSacredPlace(){
      sacredPlace().then((response) =>{
        console.log(response.data)
        const  data1  = response.data
        console.log(data1)
        console.log(data1.data)
        this.list1 = data1.data
        console.log(this.list1)
      })
    }
  }
}
</script>

<style scoped>
</style>
