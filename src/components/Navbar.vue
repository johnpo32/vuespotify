<template>
  <div>
    <nav class="white">
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo tit">Spotify</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger ic"
          ><i class="material-icons">menu</i></a
        >
        <!-- Navbar para Laptops -->
        <ul v-if="isLogin" class="right hide-on-med-and-down">
          <li>
            <a class="ic" href="#!">{{ nombre }}</a>
          </li>
          <li >
            <a href="#"><img class="imagen" :src="imagen" alt="perfil" /></a>
          </li>
          <li>
            <a class="ic" @click="logout"
              ><i class="material-icons ic">power_settings_new</i></a
            >
          </li>
        </ul>
      </div>
    </nav>
    <!-- Navbar para mobile -->
    <ul v-if="isLogin" class="sidenav" id="mobile-demo">
      <li>
        <a class="ic" href="#!">{{ nombre }}</a>
      </li>
      <li>
        <a href=""><img class="imagenMob" :src="imagen" alt="perfil" /></a>
      </li>
      <li>
        <a class="ic" @click="logout"
          ><i class="material-icons ic">power_settings_new</i></a
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      if (this.$route.path !== "/login") {
        this.$store.commit("CLEAR");
        this.$router.push("/login");
      }
    },
  },
  computed: {
    imagen() {
      if (this.$store.getters.imagen == "")
        return "https://firebasestorage.googleapis.com/v0/b/salchiapp.appspot.com/o/default%2Fprofile-42914_640.png?alt=media&token=cba47453-67f7-42f4-81da-f8f26c8ce9b1";
      else return this.$store.getters.imagen;
    },
    nombre() {
      if (this.$store.getters.nombre == "") return "Usuario";
      else return this.$store.getters.nombre;
    },
    isLogin() {
      if (this.$route.path !== "/login") return true;
      else return false;
    },
  },
};
</script>
<style scoped>
.imagen {
  width: 2.3em;
  border-radius: 50%;
  margin: 1.1em 0 0 0;
}
.imagenMob {
  width: 4.3em;
  border-radius: 50%;
}
.ic {
  color: #212121;
}
.tit {
  font-size: 2em;
  font-weight: 700;
  margin-left: 0.8em;
  color: #212121;
}
.salir {
  margin-right: 0.8em;
}
</style>