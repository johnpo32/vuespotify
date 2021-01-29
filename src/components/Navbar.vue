<template>
  <div>
    <nav class="grey darken-3">
      <div class="nav-wrapper">
        <a href="#!" class="left tit brand-logo">Spotify Minimal</a>
        <ul class="right">
          <li>
            <a @click="logout"><i class="material-icons">power_settings_new</i></a>
          </li>
        </ul>
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
      this.$router.push('/login')
    },
  },
  mounted() {
    M.AutoInit(); // That way, it is only initialized when the component is mounted
  },
};
</script>
<style scoped>
.tit {
  font-size: 2em;
  margin-left: 0.8em;
}
.salir {
  margin-right: 0.8em;
}
</style>