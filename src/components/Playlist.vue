<template>
  <div class="principal">
    <Navbar />
    <div class="row">
      <br />
      <div class="col s12">
        <router-link :to="'/home#access_token=' + $store.getters.token"
          ><i class="small material-icons">keyboard_arrow_left</i></router-link
        >
      </div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal bottom-sheet">
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
      <div class="col s12 m6">
        <h1>{{ playtitulo }}</h1>
      </div>
      <div class="col s6 m4">
        <img class="portad" :src="portada" alt="default" />
      </div>
      <div class="col s12">
        <table>
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
              <td><img :src="item.caratula" alt="" /></td>
              <td>
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
import Navbar from "./Navbar";
export default {
  data() {
    return {
      lista: [],
      playtitulo: "",
      portada: "",
      seleccion: "",
    };
  },
  components: {
    Navbar,
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
          //   llenar arraY con la informacion necesario
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
}
.portad {
  width: 80%;
}
</style>