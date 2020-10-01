<template>
  <div>
    <div v-if="pageLoading" class="m-5">
      <b-spinner class="m-5" label="Busy"></b-spinner>
    </div>
    <div v-if="!pageLoading">
      <b-list-group class="align-items-center">
        <b-list-group-item
          v-for="(location, index) in locations"
          :key="index"
          class="d-flex align-items-center shadow minWidth"
          v-on:click="changeState(index)"
          v-b-modal.modal-lg
        >
          <span class="ml-auto mr-auto">{{ location.name }}</span>
        </b-list-group-item>
      </b-list-group>
      <b-modal id="modal-lg" size="lg" v-bind:title="modalTitle" ok-only v-if="showModal">
        <div>
          <b-card-group columns>
            <b-card
              v-for="(resident, index) in residents"
              :key="index"
              v-bind:img-src="resident.image"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-title class="text-truncate">
                <a :href="'#/character/' + resident.id">
                  {{ resident.name }}
                </a>
              </b-card-title>
              <b-card-text>
                <p class="m-0 text-warning">{{ resident.species }}</p>
                <p
                  class="m-0"
                  v-bind:class="[
                    resident.status === 'Dead'
                      ? 'text-danger'
                      : resident.status === 'Alive'
                      ? 'text-success'
                      : 'text-secondary',
                  ]"
                >
                  {{ resident.status }}
                </p>
                <p class="text-truncate m-0" style="min-height: 24px">
                  {{ resident.type ? resident.type : " " }}
                </p>
              </b-card-text>
            </b-card>
          </b-card-group>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "Locations",
  data() {
    return {
      locations: null,
      showModal: false,
      residents: [],
      pageLoading: true,
      modalTitle: null
    };
  },
  methods: {
    async changeState(id) {
      this.showModal = true;
      this.residents = [];
      let serviceCalls = 0;
      this.modalTitle = this.locations[id].name;
      this.locations[id].residents.forEach((url) => {
        this.$http.get(url)
          .then(async (response) => {
            const data = await response.data;
            this.residents.push(data);
            serviceCalls++;
          })
      });
    },
  },
  async created() {
    const response = await this.$http.get("https://rickandmortyapi.com/api/location/");
    this.locations = response.data.results;
    this.pageLoading = false;
  },
  async fetchResidentData(url) {
    const response = await this.$http.get(url);
    this.residents.push(response.data);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert {
  background-color: yellow;
  width: 100%;
  height: 30px;
}

.another {
  background-color: pink;
  border: 5px solid black;
  width: 100%;
  height: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.alert-in-enter-active {
  animation: bounce-in 0.5s;
}

.alert-in-leave-active {
  animation: bounce-in 0.5s reverse;
}

h1 {
  margin: 0px;
  color: rgb(32, 35, 41);
  border: none;
  font-weight: 900;
  z-index: 1;
  font-size: 5rem;
}
.minWidth {
  min-width: 500px;
}
</style>
