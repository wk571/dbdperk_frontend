<template>
  <footer class="footer has-text-grey-light has-background-grey-darker">
    <div class="container">
      <div class="">
        <span>死亡不是解脱</span>

        <span style="float: right">
          <router-link :to="{path:'/admin/login'}">
            管理员登录（建设中）
          </router-link>
          |
          <a href="/?lang=zh_CN">中文</a> |
          <a href="/?lang=en_US">English</a>
        </span>
      </div>
      <div class="">
        <span>Death is Not an Escape</span>

        <span style="float: right">
          <router-link :to="{path:'/admin/login'}">
            声明
          </router-link>
          <!-- |
          <a href="/?lang=zh_CN">中文</a> |
          <a href="/?lang=en_US">English</a> -->
        </span>
      </div>

      <!-- <div>
        <span>Death is not an escape</span>
        <div style="float: right">
          <template>
            <b-taglist attached>
              <b-tag type="is-dark" size="is-normal">Design</b-tag>
              <b-tag type="is-info" size="is-normal">{{ author }}</b-tag>
            </b-taglist>
          </template>
        </div>
      </div> -->
    </div>
    <back-top></back-top>
  </footer>
</template>

<script>
import BackTop from "@/components/Backtop/BackTop";

export default {
  name: "Footer",
  components: {
    BackTop
  },
  data() {
    return {
      title: "© " + new Date().getFullYear() + ' 豆约翰',
      author: '豆约翰',
    };
  },
};
</script>

<style scoped>

footer {
  margin-top: 120px;
  height: 150px;
}
footer a{
  color: #bfbfbf;
}

</style>