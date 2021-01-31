<template>
  <div class="principal">
    <div class="row">
      <br />
      <div class="col s12">
        <router-link class="btn grey darken-3" :to="'/home#access_token=' + $store.getters.token"
          ><i class="small material-icons">keyboard_arrow_left</i></router-link
        >
      </div>
      <!-- Modal Structura -->
      <div id="modal1" ref="modal" class="modal bottom-sheet">
        <div class="modal-content">
          <iframe
            :src="'https://open.spotify.com/embed/track/' + seleccion"
            width="300"
            height="80"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat"
            >Ok</a
          >
        </div>
      </div>
      <!-- Titulo del playlist -->
      <div class="col s12 m6">
        <h1>{{ playtitulo }}</h1>
      </div>
      <!-- Caratula del playlist -->
      <div class="col s6 m4">
        <img class="portad" :src="portada" alt="default" />
      </div>
      <!-- Tabla con listado musical -->
      <div class="col s12 highlight responsive-table">
        <table >
          <thead>
            <tr>
              <th></th>
              <th>Titulo</th>
              <th>Album</th>
              <th>Duracion</th>
            </tr>
          </thead>

          <tbody class="text">
            <tr v-for="(item, index) in lista" :key="index">
              <td ><a @click="send(item.id)" class="waves-effect waves-light modal-trigger" href="#modal1"><img :src="item.caratula" alt="" /></a></td>
              <td >
                <a
                  @click="send(item.id)"
                  class="waves-effect waves-light modal-trigger"
                  href="#modal1"
                  ><i class="material-icons pos">play_circle_outline</i></a
                >
                {{ item.nombre }}
              </td>
              <td>{{ item.album }}</td>
              <td>{{ item.duracion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import M from 'materialize-css'
export default {
  data() {
    return {
      lista: [],
      playtitulo: "",
      portada: "",
      seleccion: "",
    };
  },

  methods: {
    //   mandar id de cancion
    send(id) {
      this.seleccion = id;
    },
    playListList() {
      this.$store.commit("LOAD");
      axios
        .get(`https://api.spotify.com/v1/playlists/${this.$route.params.id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + this.$store.getters.token,
          },
        })
        .then((data) => {
          console.log(data.data.images[0].url);
          this.playtitulo = data.data.name;
          this.portada = data.data.images[0].url;
          //   this.lista = data.data.tracks.items;
          //   llenar arraY con la informacion necesaria
          var array = data.data.tracks.items;
          for (let i in array) {
            this.lista.push({
              id: array[i].track.id,
              nombre: array[i].track.name,
              album: array[i].track.album.name,
              caratula: array[i].track.album.images[2].url,
              duracion: (array[i].track.duration_ms / 60000).toFixed(2),
            });
          }
        })
        .catch(() => {
          this.$store.commit("CLEAR");
          this.$router.push("/login");
        });
    },
  },
  mounted() {
    console.log(this.$refs.modal)
      M.AutoInit()
    this.playListList();
  },
};
</script>

<style>
.pos {
  vertical-align: middle;
  margin-right: 0.2em;
}
.text {
  text-overflow: ellipsis;
  font-size: 1.1em;
  color:#fff;
}
.portad {
  width: 80%;
}
</style>