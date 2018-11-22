let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  category:'/category/topList',
  ranklist:'/category/rank',
  sublist:'/category/subList',
  searchList:'/search/list',
  details: '/goods/details',
  deals:'/goods/deal',
  addCart: '/cart/add',
  cartList:'/cart/list',
  cartReduce:'/cart/reduce',
  cartRemove:'/cart/remove',
  cartAllRemove:'/cart/mrremove',
  cartUpdate:'/cart/update'
}
//开发环境和直接上线的切换
let host = 'http://rap2api.taobao.org/app/mock/7058'
//所有URL加上host
for(let key in url){
  if(url.hasOwnProperty(key)){
    url[key] = host + url[key]
  }
}
export default url 