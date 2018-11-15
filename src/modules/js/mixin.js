import Foot from 'components/Foot.vue'
let mixin = {
  components: {
    'j-foot': Foot,
  },
  filters: {
    completeNum(number) {
      // let value=Math.round(parseFloat(number)*100)/100;
      // let xsd = value.toString().split(".");
      // if (xsd.length == 1) {
      //   value = value.toString() + ".00";
      //   return value;
      // }
      // if (xsd.length > 1) {
      //   if (xsd[1].length < 2) {
      //     value = value.toString() + "0";
      //   }
      //   return value;
      // }
      return Number.parseFloat(number).toFixed(2);
    }
  }
}
export default mixin