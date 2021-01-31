<template>
  <div class="principal">
    <div class="row">
      <br />
      <!-- retroceder pagina -->
      <div class="col s6">
        <router-link
          class="btn grey darken-3"
          :to="'/home#access_token=' + $store.getters.token"
          ><i class="small material-icons">keyboard_arrow_left</i></router-link
        >
      </div>
      <!-- crear playlist -->
      <div class="col">
        <a
          class="waves-effect waves-light btn modal-trigger grey darken-3 btn"
          href="#modal1"
          >crear Playlist</a
        >
      </div>
      <!-- Modal para crear playlist -->
      <div id="modal1" class="modal">
        <div class="modal-content">
          <div class="row">
            <div class="input-field col s6">
              <i class="material-icons prefix">mode_edit</i>
              <textarea
                id="icon_prefix2"
                class="materialize-textarea"
                v-model="playNom"
              ></textarea>
              <label for="icon_prefix2">Nombre del PlayList</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <a
            @click="createPlay"
            class="modal-close waves-effect waves-green btn-flat"
            >ok</a
          >
        </div>
      </div>
      <!-- fin modal -->
      <div class="col s12 m12">
        <h4>Disponibles</h4>
      </div>
      <!-- array con playlist -->
      <div v-for="(item, index) in datos" :key="index" class="col s6 m3">
        <br />
        <h6>{{ item.nombre }}</h6>
        <img class="portada" :src="item.portada" alt="perfil" />
        <a class="waves-effect waves-light grey darken-3 btn"
          ><i class="material-icons">delete</i></a
        >
        <a class="waves-effect waves-light grey darken-3 btn"
          ><i class="material-icons">edit</i></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
export default {
  data() {
    return {
      datos: [],
      playNom: "",
    };
  },
  methods: {
    //   metodo para ver los disponibles
    verDisponibles() {
      this.$store.commit("LOAD");
      fetch(`https://api.spotify.com/v1/me/playlists`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + this.$store.getters.token,
        },
      })
        .then((res) => res.json())
        .catch(() => {
          this.$store.commit("CLEAR");
          this.$router.push("/login");
        })
        .then((response) => {
          console.log("Success:", response);
          //   Llenamos el arrAY con solo la informacion necesaria
          var array = response.items;
          for (let i in array) {
            if (array[i].images[0] == undefined) {
              this.datos.push({
                nombre: array[i].name,
                portada:
                  "https://firebasestorage.googleapis.com/v0/b/motosale-c2ef5.appspot.com/o/default%2Fno-image.png?alt=media&token=e28e71ca-de11-4654-a53a-ea6898f4fee6",
              });
            } else {
              this.datos.push({
                nombre: array[i].name,
                portada: array[i].images[0].url,
              });
            }
          }
        });
    },
    // metodo para cRear lista de reprOduccion
    createPlay() {
      this.$store.commit("LOAD");
      fetch(
        `https://api.spotify.com/v1/users/${this.$store.getters.id}/playlists`,
        {
          method: "POST",
          body: JSON.stringify({
            name: this.playNom,
          }),
          headers: {
            Authorization: "Bearer " + this.$store.getters.token,
          },
        }
      )
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then(() => window.location.reload());
    },
  },
  mounted() {
    this.verDisponibles();
    M.AutoInit();
  },
};
</script>

<style>
.portada {
  width: 100%;
}
</style>