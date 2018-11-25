import fetch from 'js/fetch.js'
import url from 'js/api.js'
import axios from 'axios'
class Address{
  static list(){
    return axios.get(url.addressLists)
  }

  static add(data){
    return fetch(url.addressAdd,data)
  }

  static remove(id){
    return fetch(url.addressRemove,id)
  }

  static update(data){
    return fetch(url.addressUpdate,data)
  }

  static setDefault(id){
    return fetch(url.addressSetDefault,id)
  }
}
export default Address