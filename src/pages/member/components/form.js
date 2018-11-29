
import AddressService from 'js/addressService.js'

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
    this.instance= this.$route.query.instance//通过query拿到的值
    if(this.type==='edit'){
      let add = this.instance
      this.provinceValue = parseInt(add.provinceValue)
      this.name = add.name
      this.tel = add.tel
      this.address = add.address
      this.id = add.id 
    }
  },
  watch:{
    lists:{
      handler(){
        this.$router.go(-1)
      },
      deep: true//深度监听
    },
    //当选择省份的时候监听到他的城市
    provinceValue(val){
      if(val === -1) return 
      let list = this.addressData.list
      //拿到省的列表里的下标
      let index = list.findIndex(item=>{
        return item.value === val
      })
      this.cityList = list[index].children
      this.cityValue = -1
      this.districtValue = -1 
      if(this.type ==='edit'){
        this.cityValue = parseInt(this.instance.cityValue)
      }
    },
    cityValue(val){
      if(val === -1) return 
      let list = this.cityList
      //拿到省的列表里的下标
      let index = list.findIndex(item=>{
        return item.value === val
      })
      this.districtList = list[index].children
      this.districtValue = -1 
      if(this.type==='edit'){
        this.districtValue = parseInt(this.instance.districtValue)
      }
    }
  },
  methods:{
    add(){
      let {name,tel,provinceValue,cityValue,districtValue,address} = this
      let data =  {name,tel,provinceValue,cityValue,districtValue,address} 
      if(this.type === 'add'){
        // data.id = this.id
        // AddressService.add(data).then(res=>{
        //   //回跳
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('addAction',data)
      }
      if(this.type === 'edit'){
        data.id = this.id
        AddressService.update(data).then(res=>{
          //回跳
          this.$router.go(-1)
        })
      }
    },
    remove(){
      if(window.confirm('确认删除')){
        // AddressService.remove(this.id).then(res=>{
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('removeAction',this.id)
      }
    },
    setDefault(){
      // AddressService.remove(this.id).then(res=>{
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('setDefaultAction',this.id)

    }
  },
  computed:{
    lists(){
      return this.$store.state.lists
    }
  }
};
