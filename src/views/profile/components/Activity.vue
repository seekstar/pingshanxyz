<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/pic/item/4610b912c8fcc3ce98789c329d45d688d43f2072.jpg'">
        <span class="username text-muted">坪山区人民政府</span>
        <span class="description">坪山区文化广电旅游体育局 - 2019年11月14日</span>
      </div>
      <p>
        2019年11月13日，坪山区召开创建全国文明城市暨保护未成年人工作推进会，会议通报了近期专项整治工作情况，区公安分局等9个单位结合自身职责和任务分工，围绕文明城市创建和未成年人保护工作进行了汇报发言。会议肯定了各单位、各街道在前一阶段文明城市创建工作中付出的努力和取得的成绩。会议强调，各单位、各街道要齐抓共管，形成全社会共同保护未成年人的良好氛围。对于下一阶段文明城市创建和未成年人保护工作，会议要求，各单位要提高认识，高度重视，正视问题，推动整改，勇担使命，争当文明城市创建标兵，为未成年人健康成长营造良好的环境，展示“打造城市文明典范、建设现代文明之城”的坪山担当。（信息员：陈凡）
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            分享
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="thumbsup" />
            点赞
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/pic/item/4610b912c8fcc3ce98789c329d45d688d43f2072.jpg'">
        <span class="username text-muted">坪山区人民政府</span>
        <span class="description">深圳侨报 - 2019年11月13日</span>
      </div>
      <p>
        2019年11月12日，“示范深圳 信用先行”深圳社会信用宣传月之坪山区“信用+执法监管”平台推广仪式在创新广场东部之芯举行。区委政法委联合36个区职能部门签署安全生产、纳税信用A级纳税人以及失信被执行人等重点领域多个联合奖惩备忘录，依托“坪山信用网”平台，共同推进以信用为核心的执法监管机制，实施差别化监管和联合奖惩措施，以信用体系建设促进企业自律与良性发展。区委副书记、政法委书记李映中出席仪式并致辞，市发改委、市信用中心相关领导出席活动。
      </p>
      <ul class="list-inline">
        <li>
          <span class="link-black text-sm">
            <i class="el-icon-share" />
            分享
          </span>
        </li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="thumbsup" />
            点赞
          </span>
        </li>
      </ul>
    </div>
    <div class="post">
      <div class="user-block">
        <img class="img-circle" :src="'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/pic/item/4610b912c8fcc3ce98789c329d45d688d43f2072.jpg'">
        <span class="username">坪山区人民政府</span>
        <span class="description">近日新闻概览</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="220px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item+carouselPrefix" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li><span class="link-black text-sm"><i class="el-icon-share" /> 分享</span></li>
        <li>
          <span class="link-black text-sm">
            <svg-icon icon-class="thumbsup" /> 点赞</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'

export default {
  data() {
    return {
      carouselImages: [
        'http://www.szpsq.gov.cn/xxgk/jt/tpxw/201811/W020181210434812533882.jpg',
        'http://www.szpsq.gov.cn/xxgk/jt/tpxw/201911/W020191114383712494675.jpg',
        'http://www.szpsq.gov.cn/xxgk/jt/tpxw/201911/W020191113618986704819.jpg',
        'http://www.szpsq.gov.cn/xxgk/jt/tpxw/201911/W020191111384477167083.jpg'
      ],
      avatarPrefix,
      carouselPrefix
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {

    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username{
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;

    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
