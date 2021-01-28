<template>
  <div>
    <Navbar />
    <!-- Page Layout here -->
    <div class="row margen">
      <div class="col s12 m3">
        <!-- navigation panel -->
        <div class="row center">
          <div class="col s12 m12 bordeCol">
            <img class="imagen" :src="this.imagen" alt="perfil" />
          </div>
          <div class="col s12 m12">
            <h5>{{ nombre }}</h5>
          </div>
          <div class="col s12 m12">
            <h6><a :href="cuenta" target="black">Cuenta</a></h6>
          </div>
        </div>
      </div>

      <div class="col s12 m6">
        <!-- page content  -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar";
export default {
  components: { Navbar },
  data() {
    return {
      nombre: "",
      cuenta: "",
      imagen: "",
    };
  },
  methods: {
    reload() {
      var param = this.$route.hash.split("=");
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + param[1],
          },
        })
        .then((response) => {
          //console.log(response.data);
          this.nombre = response.data.display_name;
          this.cuenta = response.data.external_urls.spotify;
          this.imagen = response.data.images[0].url;
        })
        .catch(() => {
          console.log("session expirada");
        });
    },
    playList() {
      var param = this.$route.hash.split("=");
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + param[1],
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => {
          console.log("session expirada");
        });
    },
  },
  mounted() {
    this.reload();
    this.playList();
    // var param = this.$route.hash.split("=");
    // console.log(param[1]);
  },
};
</script>

<style>
.margen {
  padding: 0;
  margin: 2em;
}
.imagen {
  max-width: 6em;
  border-radius: 50%;
}
.bordeCol {
  border-right: 1px solid #eeeeee;
}
</style>