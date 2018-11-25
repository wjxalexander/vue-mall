
export default {
  data() {
    return {
      name: "",
      tel: "",
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address:'',
      id: '',
      //路由信息对象
      type: '',
      instance: '',
      addressData:require('js/address.json'),
      cityList: null, 
      districtList: null
    };
  },
  created(){
    this.type= this.$route.query.type
    this.instance= this.$route.query.instance
  },
  watch:{
    //当选择省份的时候监听到他的城市
    provinceValue(val){
      if(val === -1) return 
      let list = this.addressData.list
      //拿到省的列表里的下标
      let index = list.findIndex(item=>{
        return item.value = val
      })
      this.cityList = list[index].children
    }
  }
};
