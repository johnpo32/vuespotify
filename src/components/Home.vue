<template>
  <div class="principal">
    <!-- Barra Nav -->

    <!-- Page Layout  -->
    <div class="row center">
      <br />
      <!-- ruta Crud PlayList -->
      <div class="col s12 m4">
        <a
          @click="goCrud"
          class="waves-effect waves-light btn modal-trigger grey darken-3"
          >PlayList</a
        >
      </div>
      <!-- Seccion Listado playlist -->
      <div class="col s12 m12">
        <h3>Playlist</h3>
      </div>
      <div v-for="(item, index) in playlist" :key="index" class="col s6 m3">
        <img class="portada" :src="item.portada" alt="perfil" />
        <a
          @click="goPlayList(item.id)"
          class="play waves-effect waves-light grey darken-3 btn"
          >{{ item.nombre }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
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
    // ruta crud
    goCrud() {
      this.$router.push("/playcrud");
    },
    // ruta playlist
    goPlayList(id) {
      this.$router.push("play/" + id);
    },
    // Recordar cuenta
    reload() {
      this.$store.commit("LOAD");
      var param = this.$route.hash.split("=");
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + param[1],
          },
        })
        .then((response) => {
          // Informacion para el Store y Renderizacion
          this.$store.commit("SET_token", param[1]);
          this.$store.commit("SET_ID", response.data.id);
          this.nombre = response.data.display_name;
          this.cuenta = response.data.external_urls.spotify;
          this.imagen = response.data.images[0].url;
          this.$store.commit("SET_IMAGEN", this.imagen);
          this.$store.commit("SET_NOMBRE", this.nombre);
        })
        .catch(() => {
          console.log("session expirada");
          // bORRAR DATOS DEL STORE
          this.$store.commit("CLEAR");
          this.$router.push("/login");
        });
    },
    // Playlist disponibles
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
          // console.log(response.data.items[0].id);
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
    // refresh() {
    //   fetch(`https://accounts.spotify.com/api/token`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       Authorization:
    //         "Basic " +
    //         (
    //           "d267cedeee0f49f7aa8a7d78dc43ab47" +
    //           ":" +
    //           "7937a13f48b04234a89e80afbc0a7b00"
    //         ).toString("base64"),
    //     },
    //     body: JSON.stringify({
    //       grant_type: "refresh_token",
    //       refresh_token: this.$store.getters.token,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     });
    // },
  },
  mounted() {
    this.reload();
    this.playList();
  },
};
</script>

<style>
h2,
h1,
h4,
a,
h3,
th,
h6,
.cu {
  color: #fff;
  font-weight: 900;
}
.principal {
  background-color: #212121;
}
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
</style>