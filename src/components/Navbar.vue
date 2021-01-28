<template>
<div>
  
  <nav class="grey darken-3">
    <div class="nav-wrapper">
      <a href="#!" class="left tit brand-logo">Spotify Minimal</a>
    </div>
  </nav>
</div>
</template>
<script>
import M from "materialize-css";
export default {
  methods: {
    logout() {
      this.$store.commit("CLEAR");
    },
  },
  mounted() {
    M.AutoInit(); // That way, it is only initialized when the component is mounted
  },
};
</script>
<style scoped>
.tit {
  font-size: 1.5em;
  margin-left: 0.4em;
}
.salir {
  margin-right: 0.8em;
}
</style>