<template>
  <div class="member">
    <div class="columns">
      <div class="column is-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered">
            <el-avatar :size="64" :src="`https://cn.gravatar.com/avatar/${topicUser.id}?s=164&d=monsterid`" />
            <p class="mt-3">{{ topicUser.alias || topicUser.username }}</p>
          </div>
          <div>
            <p class="content">积分：<code>{{ topicUser.score }}</code></p>
            <p class="content">入驻：{{ dayjs(topicUser.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
            <p class="content">简介：{{ topicUser.bio }}</p>
          </div>
        </el-card>
      </div>

      <div class="column">
        <!--用户发布的话题-->
        
        <el-card class="box-card content" shadow="never">
          <div v-if="topics.length===0">
            暂无话题
          </div>

          <div v-else class="topicUser-info">
          <div slot="header" class="has-text-weight-bold">
            <span>话题</span>
          </div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="屠夫技能" name="killer">
            <article v-for="(item, index) in topics" :key="index" class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="item.imgUrl" style="border-radius: 5px;">
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <router-link :to="{name:'post-detailkiller',params:{id:item.id}}">
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                        {{ item.alias }}
                      </router-link>

                      <span class="mr-1">
                        来源:{{ item.resource }}
                      </span>

                      <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                      >
                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                          {{ "#" + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">受欢迎度:{{ item.popularity }}</span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
          <el-tab-pane label="逃生者技能" name="survivor">
            <article v-for="(item, index) in topics" :key="index" class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="item.imgUrl" style="border-radius: 5px;">
                </figure>
              </div>
              <div class="media-content">
                <div class="">
                  <p class="ellipsis is-ellipsis-1">
                    <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                      <router-link :to="{name:'post-detail',params:{id:item.sperkId}}">
                        <span class="is-size-6">{{ item.title }}</span>
                      </router-link>
                    </el-tooltip>
                  </p>
                </div>
                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                  <div class="level-left">
                    <div class="level-left">
                      <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                        {{ item.alias }}
                      </router-link>

                      <span class="mr-1">
                        来源:{{ item.resource }}
                      </span>

                      <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                      >
                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                          {{ "#" + tag.name }}
                        </router-link>
                      </span>

                      <span class="is-hidden-mobile">受欢迎度:{{ item.popularity }}</span>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="media-right" />
            </article>
          </el-tab-pane>
        </el-tabs>
          </div>

          <!--分页-->
          <pagination
            v-show="page.total > 0"
            class="mt-5"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserById"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoByName, getInfo } from '@/api/user'
import pagination from '@/components/Pagination/index'
import { mapGetters } from 'vuex'
import { deleteTopic } from '@/api/post'

export default {
  name: 'Profile',
  components: { pagination },
  data() {
    return {
      topicUser: {},
      topics: {},
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      value3:false,
      tab:'survivor',
      activeName:'killer'
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.init(this.tab)
  },
  methods: {
    init(tab) {
      getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
        const  data  = res.data
        console.log(res)
        console.log(data)
        this.topicUser = data.user
        if(tab.name == "survivor"){
          const  survivor = data.survivor
          this.page.current = survivor.current
          this.page.size = survivor.size
          this.page.total = survivor.size
          this.topics = survivor.records
        }else{
          const  killer = data.killer
          this.page.current = killer.current
          this.page.size = killer.size
          this.page.total = killer.size
          this.topics = killer.records
        }
      })
    },
    handleClick(tab) {
      this.page.current = 1
      this.tab = tab
      this.init(this.tab)
    },
    fetchUserById() {
      // getInfo().then((res) => {
      getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
        const  data  = res.data
        console.log(res)
        console.log(data)
        this.topicUser = data.user
        if(this.value3){
          const  survivor = data.survivor
          this.page.current = survivor.current
          this.page.size = survivor.size
          this.page.total = survivor.size
          this.topics = survivor.records
        }else{
          const  killer = data.killer
          this.page.current = killer.current
          this.page.size = killer.size
          this.page.total = killer.size
          this.topics = killer.records
        }
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

<style scoped>

</style>
