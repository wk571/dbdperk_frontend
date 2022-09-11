<template>
  <div class="columns">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
        class="box-card"
        shadow="never"
      >
<div class="column is-three-quarters">
  <el-row>
  <el-col :span="8"> 
    <div class="column is-one-quarter media-left">
      <figure class="image is-48x48">
        <img :src="topic.imgUrl" style="border-radius: 5px;">
      </figure>
    </div> 
  </el-col>
  <el-col :span="16">
        <div
          class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ topic.title }}</p>
          <div class="has-text-grey is-size-7 mt-3" >
            <span>{{ topic.resource }}</span>
            <el-divider direction="vertical"/>
            <span>出现频率：{{ topic.appearance }}</span> 
            <el-divider direction="vertical" />
            <span>受欢迎指数：{{ topic.popularity }}</span>
          </div>
        </div>
  </el-col>
</el-row>
    
</div>
        

        <!--Markdown-->
        <div id="preview" />

        <!--标签-->
        <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                <router-link
                  v-for="(tag, index) in tags"
                  :key="index"
                  :to="{ name: 'tag', params: { name: tag.name } }"
                >
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + tag.name }}
                  </b-tag>
                </router-link>
              </b-taglist>
            </p>
          </div>
          <!-- <div
            v-if="token && user.id === topicUser.id"
            class="level-right"
          >
            <router-link
              class="level-item"
              :to="{name:'topic-edit',params: {id:topic.id}}"
            >
              <span class="tag">编辑</span>
            </router-link>
            <a class="level-item">
              <span
                class="tag"
                @click="handleDelete(topic.id)"
              >删除</span>
            </a>
          </div> -->
        </nav>
      </el-card>
      <lv-commentsKiller :slug="topic.id" /> 
    </div>
    <div class="column">
      <div v-if="token">
        <KillerRate
          v-if="this.rateData.rated == 0"
          :topic-id="topic.id"
          @refresh="refreshTopic"
        />

      <isRated 
      v-if="this.rateData.rated == 1"
      :faPop="this.rateData.data.popularity" :faApp="this.rateData.data.appearance"
      :topicId="topic.id"
      @refresh1="refreshTopic"/>
      </div>
      <!--作者-->
      <!-- <author
        v-if="rateData.rated == 0"
        :user="topicUser"
      /> -->
      <!--推荐-->
      <Recommend
        v-if="flag"
        :topic-id="topic.id"
      />
    </div>
  </div>
</template>

<script>
import { deleteTopic, getTopicKiller, getKillerRated } from '@/api/post'
import { mapGetters } from 'vuex'
import Author from '@/views/post/Author'
import Recommend from '@/views/post/Recommend'
import LvCommentsKiller from '@/components/Comment/KillerComments'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import KillerRate from './KillerRate.vue'
import isRated from './isRated'

export default {
  name: 'TopicDetail',
  components: { Author, Recommend, LvCommentsKiller,KillerRate,isRated },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      flag: false,
      topic: {
        content: '',
        id: this.$route.params.id,
        title: '你好',
        view: '1'
      },
      rateData: {
        rated: '',
        date: ''
      },
      isRated:{},
      tags: [],
      topicUser: {}
    }
  },
  mounted() {
    this.fetchTopic()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // 初始化
    async fetchTopic() {
      getTopicKiller(this.$route.params.id).then(response => {
        const { data } = response
        console.log(data)
        document.title = data.topic.title
        this.topic = data.topic
        console.log(this.topic)
        this.tags = data.tags
        this.topicUser = data.user
        
        // this.comments = data.comments
        this.renderMarkdown(this.topic.content)
        this.flag = true
      })
      if(this.token){
        getKillerRated(this.topic.id,this.user.id).then(response =>{
        // const { rateD } = response
        // console.log(response)
        this.rateData.rated = response.data.rated
        this.rateData.data = response.data.data 
        console.log(123456)
        console.log(this.rateData.rated)
      })
      }
    },
    refreshTopic(){
      this.$router.go(0);
      getTopic(this.$route.params.id).then(response => {
        const { data } = response
        document.title = data.topic.title

        this.topic = data.topic
        this.tags = data.tags
        this.topicUser = data.user
        
        // this.comments = data.comments
        this.renderMarkdown(this.topic.content)
        this.flag = true
      })
    },
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
</style>
