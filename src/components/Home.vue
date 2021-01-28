<template>
  <div>
    <Navbar />
    <!-- Page Layout here -->
    <div class="row center">
      <br />
      <div class="col s12 m3">
        <img class="imagen" :src="this.imagen" alt="perfil" />
      </div>
      <div class="col s12 m7">
        <div class="row">
          <div class="col s12 m6">
            <h5>{{ nombre }}</h5>
          </div>

          <div class="col s12 m6">
            <h5><a :href="cuenta" target="black">Cuenta</a></h5>
          </div>
        </div>
      </div>
      <!-- Seccion playlist -->
      <div class="col s12 m12">
        <hr />
        <h2>Playlist</h2>
        <br />
      </div>
      <div v-for="(item, index) in playlist" :key="index" class="col s6 m3">
        <img class="portada" :src="item.portada" alt="perfil" />
         
        <a
          class="play waves-effect waves-light grey darken-3 btn"
          ><router-link :to="{name: 'play' , params:{ id: item.id }}">{{ item.nombre}}</router-link></a
        >
        
      </div>
      <div>
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
      playlist: [],
      imgPla: "",
    };
  },
  methods: {
    // Recordar cuenta
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
          this.nombre = response.data.display_name;
          this.cuenta = response.data.external_urls.spotify;
          this.imagen = response.data.images[0].url;
        })
        .catch(() => {
          console.log("session expirada");
        });
    },
    // Playlist disponibles
    playList() {
      var param = this.$route.hash.split("=");
      this.$store.commit("SET_token", param[1]);
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + param[1],
          },
        })
        .then((response) => {
          console.log(response.data.items[0].id);
          //   sacar solo las variables que sE necEsitan
          var play = response.data.items;
          for (let i in play) {
            for (let j in play[i].images) {
              if (j == 0) {
                this.playlist.push({
                  id: play[i].id,
                  nombre: play[i].name,
                  portada: play[i].images[j].url,
                });
              }
            }
          }
        })
        .catch((e) => {
          console.log("session expirada", e);
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
  background-color: #fff;
}
.imagen {
  width: 40%;
  border-radius: 50%;
}
.play {
  margin: 0.5em 0;
  width: 100%;
}
.portada {
  width: 100%;
}
.center {
  text-align: center;
}
.x {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}
</style>