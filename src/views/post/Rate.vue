<template>
  <div>
    <el-card>
      <div class="block">
        <span class="demonstration">喜欢这个技能吗？</span>
        <el-rate v-model="value1"></el-rate>
      </div>
      <div class="block">
        <span class="demonstration">平时会带这个技能吗？</span>
        <el-rate v-model="value2"></el-rate>
      </div>
      <el-button round @click="postScore">提交</el-button>
      <el-button round @click="postTest">测试</el-button>
    </el-card>
  </div>
</template>


<script>
import {postRate} from '@/api/post'
import { mapGetters } from 'vuex'

  export default {
      name:'Rate',
      props:{
          topicId: {
      type: String,
      default: null
    }
      },
    data() {
      return {
        value1: null,
        value2: null,
        colors: ['#99A9BF', '#F7BA2A', '#FF9900']  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
      }
    },
    computed: {
      ...mapGetters(['token', 'user'])
    },
    methods: {
        postScore(){

            postRate(parseInt(this.topicId),this.user.id,this.value1,this.value2).then((value)=>{
              const {data} = value;
              this.$emit('refresh',data );
            })
        },
        postTest(){
          console.log(123)
        }
    }
  }
</script>