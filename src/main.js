import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'
import Qs from 'qs'
//QS是axios库中带的，不需要我们再npm安装一个

Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;
Vue.prototype.HOST = '/api'

Vue.config.productionTip = false
router.beforeEach(function (to, from, next) {

  if (to.meta.needLogin) {
    //页面是否登录

    var user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.username) {
        next();
      } else {
        next({
          name: "login"
        });
      }

    } else {
      next({
        name: "login"
      });
    }



  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
