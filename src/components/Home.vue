<template>
  <div>
      <Navbar />
    <p>home</p>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
    name: 'home',
  components: { Navbar },
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    //   LLENAR EL STORE
    //     this.$store.commit("LOAD");
    //     if (this.$store.getters.me != []) this.isLogin = true;
  },
};
</script>

<style>
</style>