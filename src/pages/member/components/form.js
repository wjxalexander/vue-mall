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
      instance: ''
    };
  },
  created(){
    this.type= this.$route.query.type
    this.instance= this.$route.query.instance
  }
};
