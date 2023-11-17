<template>
  <!-- 登录界面 -->
  <div class="login">
    <!-- 上方头部使用 NavBar 导航栏  -->
    <van-nav-bar title="会员中心" left-text="" right-text="" left-arrow
    @click-left="$router.go(-1)"/>
    

    <!-- 剩余主体部分 -->

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" v-model="mobile" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" v-model="picCode" placeholder="请输入图形验证码" type="text">
          <!--  点击重新切换验证码 -->
          <img :src="picUrl" @click="getPicCode()" alt="">
        </div>
        <div class="form-item">
          <input class="inp" v-model="smsCode" placeholder="请输入短信验证码" type="text">

          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : second + `秒后重新发送`}}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="loginFn()">登录</div>
    </div>
  </div>

</template> 

<script>
  // 导入相关内容
  import { getPicCode,getMsCode,loginClick } from '@/api/login'
  import  { mapMutations } from 'vuex'
  export default{  
    data() {
      return {
        //1. 设置获取图形验证码的参数
        piccode: '', // 用户输入的图形验证码
        picKey: '', //请求传入图形验证码的唯一标识
        picUrl: '', // 存储请求渲染的图片地址

        //2. 设置 获取短信验证码 倒计时
        totalSecond: 60, // 总秒数
        second: 60, // 倒计时的秒数
        timer: null, // 定时器 id

        // 设置接收输入框的内容,并且使用v-model进行绑定
        mobile: '', // 手机号
        picCode: '' ,// 图形验证码

        //3.  设置点击登录接口需要的参数
        isParty: false, // 是否存在第三方用户信息boolean
            // 手机号上面有接收  
        partyData:{}, // 三方登录信息，默认为：{} 可选
        smsCode: '',  // 短信验证码， 测试环境验证码为：246810
      }
    },
    name: 'LoginPage',
    methods: {
      ...mapMutations('user', ['setUserInfo']),
      // 获取图形验证码
      async getPicCode(){
      // 使用自己封装的axios来使用， 这样就不会污染原始的axios请求
      // 将所有的请求全部放到api模块去实现
        const res = await getPicCode()
        this.picUrl = res.data.base64
        this.picKey = res.data.key
      },
      // 获取短信验证码
      async getCode () {
        if(!this.validFn()){ 
          return 
        }
      
        if (!this.timer && this.second === this.totalSecond) {
            // 发送获取短信验证码的请求
          const res = await getMsCode(this.picCode, this.picKey, this.mobile)
            // 这里其实可以省略， 因为我们已经配置了响应拦截器
          if(res.status != 200 ) {
            this.$toast('图形验证码错误')
            return
          }
          // 开启倒计时
          this.timer = setInterval(() => {
            this.second--

            if (this.second < 1) {
              clearInterval(this.timer)
              this.timer = null // 重置定时器id
              this.second = this.totalSecond // 归位
            }
          }, 1000)

          // 发送请求，获取验证码
          this.$toast('发送成功，请注意查收')
        }
      },


      // 校验手机号 和 图形验证码输入是否正确
      validFn(){
        if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
          this.$toast('请输入正确的手机号')
          return false
        }
        // 这个逻辑有问题。 随便输入4位都可以通过
        if (!/^\w{4}$/.test(this.picCode)) {
          this.$toast('请输入正确的图形验证码')
          return false
        }
        return true
      },
      
      // 点击登录的js逻辑
      async loginFn() { 
        if (!this.validFn()) {
          return
        }
        if (!/^\d{6}$/.test(this.smsCode)) {
          this.$toast('请输入正确的手机验证码')
          return
        }
        //1. 获取相关参数

        //2. 调用请求信息
        const res = await loginClick(this.isParty, this.mobile, this.partyData, this.smsCode)
        console.log(res)
        //2.1 将登录信息存储到state中
        this.setUserInfo(res.data)

        console.log("登录成功")
        //3. 路由转发
        //3.1 判断地址栏是否存在回弹地址 如果存在那么就需要跳转到对应的回弹地址上
        if(this.$route.query.backUrl){
          this.$router.replace(this.$route.query.backUrl)
        }else{
          this.$router.push('/')
        }
        this.$toast('登录成功')

      }

    },

  


    async created() { 
      // 通过调用方法来实现图片验证码的显示
      //
      this.getPicCode()
    },

    // 离开页面的时候销毁定时器
    destroyed () {
      clearInterval(this.timer)
    }

  }
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>