<template>
  <div>
    <el-card>
      <div class="block">
        <span class="demonstration">您对这个技能的喜爱程度：</span>
        <el-rate v-model="faPop"></el-rate>
      </div>
      <div class="block">
        <span class="demonstration">您携带这个技能的频率：</span>
        <el-rate v-model="faApp"></el-rate>
      </div>
      <el-button round @click="deleteScore">重新评分</el-button>
      <el-button round @click="postTest">测试</el-button>
    </el-card>
  </div>
</template>


<script>
import { deleteRated } from '@/api/post'
import { mapGetters } from 'vuex'

  export default {
      name:'isRated',
      props:['faPop','faApp','topicId'],
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
        deleteScore(){
            // console.log(456789)
            // console.log(this.user)
            // console.log(this.value1)
            // console.log(this.value2)
            deleteRated(this.topicId,this.user.id,this.faPop,this.faApp).then((value)=>{
              const {data} = value;
              this.$emit('refresh1',data );
            })
        },
        postTest(){
          console.log(123)
        }
    }
  }
</script>