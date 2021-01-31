<template>
  <div id="app" >
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from "./components/Navbar";
import M from 'materialize-css'
export default {
  name: "App",
  components: { Navbar },
  mounted () {
    M.AutoInit()
},
};
</script>

<style lang="scss">
#app,
body {
  height: 100%;
  background-color: #212121;
}
$color: red;
.principal {
  background-color: #fff;
}
</style>
