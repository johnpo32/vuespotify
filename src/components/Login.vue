<template>
  <div class="boton">
    <h1>Spotify Minimal</h1>
    <a @click="login" class="blue-grey darken-4 waves-effect waves-light btn"
      ><i class="material-icons right">send</i>Login with Spotify</a
    >
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      client_id: "",
      secret: "",
      code: "",
      scopes:
        "user-read-private user-read-email playlist-read-private playlist-modify-public playlist-modify-private user-library-read",
      redirect_uri: "http://localhost:8080/home",
      me: null,
      pay: "",
    };
  },
  methods: {
    login() {
      window.location.replace(
        `https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`,
        "Login with Spotify",
        "width=800,height=600"
      );

      window.spotifyCallback = (payload) => {
        // alert(payload)
        this.code = payload;
        console.log(payload);

        fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${payload}`,
          },
        })
          .then((response) => {
            console.log("res ", response);
            return response.json();
          })
          .then((data) => {
            this.me = data;
            console.log(data);
          });
      };
    },
    refresh() {
      fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: this.code,
        },
        body: {
          grant_type: "refresh_token",
          redirect_uri: this.redirect_uri,
        },
      });
    },
  },
  mounted() {
    this.token = window.location.hash.substr(1).split("&")[0].split("=")[1];

    if (this.token) {
      // alert(this.token)

      window.opener.spotifyCallback(this.token);
    }
  },
};
</script>

<style >
.boton {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
