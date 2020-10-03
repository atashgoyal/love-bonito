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
          class="d-flex align-items-center minWidth list-item"
          v-on:click="changeState(index)"
          v-b-modal.modal-lg
        >
          <span class="ml-auto mr-auto list-name">{{ location.name }}</span>
        </b-list-group-item>
      </b-list-group>
      <b-modal
        id="modal-lg"
        size="lg"
        v-bind:title="modalTitle"
        ok-only
        v-if="showModal"
      >
        <div>
          <b-card-group columns>
            <transition-group
              name="list"
              enter-active-class="animated bounceInUp"
              leave-active-class="animated bounceOutDown"
            >
              <b-card
                v-for="(resident, index) in residents"
                :key="index"
                v-bind:img-src="resident.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem"
                class="mb-2 character-card shadow"
                v-bind:class="[
                  resident.status === 'Dead'
                    ? 'dead'
                    : resident.status === 'Alive'
                    ? 'alive'
                    : '',
                ]"
              >
                <b-card-title class="text-truncate">
                  <a :href="'#/character/' + resident.id">
                    {{ resident.name }}
                  </a>
                </b-card-title>
                <b-card-text>
                  <p class="m-0 text-warning">{{ resident.species }}</p>
                  <p
                    class="m-0 text-bold"
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
            </transition-group>
          </b-card-group>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
const DB_NAME = "rickyMortyLocationsdb";
const DB_NAME2 = "rickyMortyCharacterdb";
const DB_VERSION = 1;

export default {
  name: "Locations",
  data() {
    return {
      db: null,
      db2: null,
      locations: null,
      residentsDB: [],
      charactersDB: [],
      showModal: false,
      residents: [],
      pageLoading: true,
      modalTitle: null,
    };
  },
  async created() {
    this.db = await this.getDb();
    this.locations = await this.getLocationsFromDb();
    if (!this.locations.length) {
      const response = await this.$http.get(
        "https://rickandmortyapi.com/api/location/"
      );
      this.locations = response.data.results;
      await this.addLocationsToDb(this.locations);
      this.pageLoading = false;
    } else {
      this.locations = this.locations[0];
      this.pageLoading = false;
    }
  },
  methods: {
    async addLocationsToDb(locations) {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction(["locations"], "readwrite");
        trans.oncomplete = (e) => {
          resolve(e);
        };
        const store = trans.objectStore("locations");
        store.add(locations);
      });
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (e) => {
          reject("Error");
        };
        request.onsuccess = (e) => {
          resolve(e.target.result);
        };
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          db.createObjectStore("locations", {
            autoIncrement: true,
            keyPath: "id",
          });
        };
      });
    },
    async getDb2() {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(DB_NAME2, DB_VERSION);
        request.onerror = (e) => {
          reject("Error");
        };
        request.onsuccess = (e) => {
          resolve(e.target.result);
        };
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          db.createObjectStore("character", {
            autoIncrement: true,
            keyPath: "id",
          });
        };
      });
    },
    async getLocationsFromDb() {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction(["locations"], "readonly");
        const locations = [];
        trans.oncomplete = (e) => {
          resolve(locations);
        };
        const store = trans.objectStore("locations");
        store.openCursor().onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            locations.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },
    async getCharacterFromDb() {
      return new Promise((resolve, reject) => {
        const trans = this.db2.transaction(["character"], "readonly");
        const character = [];
        trans.oncomplete = (e) => {
          resolve(character);
        };
        const store = trans.objectStore("character");
        store.openCursor().onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
            character.push(cursor.value);
            cursor.continue();
          }
        };
      });
    },
    async changeState(id) {
      this.showModal = true;
      this.residents = [];
      this.modalTitle = this.locations[id].name;
      this.db2 = await this.getDb2();
      this.charactersDB = await this.getCharacterFromDb();
      this.locations[id].residents.forEach((url) => {
        this.character = this.charactersDB.filter((ch) => ch.url === url)[0];
        if (!this.character) {
          this.$http.get(url).then(async (response) => {
            const data = await response.data;
            this.residents.push(data);
            await this.addCharacterToDb(data);
          });
        } else {
          this.residents.push(this.character);
        }
      });
    },
    async addCharacterToDb(character) {
      return new Promise((resolve, reject) => {
        const trans = this.db2.transaction(["character"], "readwrite");
        trans.oncomplete = (e) => {
          resolve(e);
        };
        const store = trans.objectStore("character");
        store.add(character);
      });
    },
  },
};
</script>
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
.character-card:hover {
  box-shadow: 5px 5px 5px 1px gainsboro !important;
  transform: scale(1.025);
}

.list-name:hover {
  transform: scale(1.2);
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-item:hover,
.list-leave-to {
  transform: translateY(-1px);
  box-shadow: 0px 2px 4px 5px rgba(0, 0, 0, 0.25);
}
.text-bold {
  font-weight: bold;
  font-size: 20px;
}
.dead:hover {
  background: #ffdada;
}
.alive:hover {
  background: #d2ffd2;
}
</style>
