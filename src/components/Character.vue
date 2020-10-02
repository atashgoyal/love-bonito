<template>
  <div>
    <div v-if="pageLoading" class="m-5">
      <b-spinner class="m-5" label="Busy"></b-spinner>
    </div>
    <b-card
      v-if="!pageLoading"
      v-bind:img-src="character.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 25rem"
      class="mx-auto shadow-lg  character"
    >
      <b-card-title class="text-truncate"> {{ character.name }}</b-card-title>
      <b-card-text>
        <p class="m-0 text-warning">{{ character.species }}</p>
        <p
          class="m-0 text-bold"
          v-bind:class="[
            character.status === 'Dead'
              ? 'text-danger'
              : character.status === 'Alive'
              ? 'text-success'
              : 'text-secondary',
          ]"
        >
          {{ character.status }}
        </p>
        <p class="text-truncate m-0" style="min-height: 24px">
          {{ character.type ? character.type : " " }}
        </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
const DB_NAME = "rickyMortyCharacterdb";
const DB_VERSION = 1;

export default {
  name: "Character",
  data() {
    return {
      db: null,
      character: null,
      id: this.$route.params.id,
      pageLoading: true,
      charactersDB: [],
    };
  },
  async created() {
    this.db = await this.getDb();
    this.charactersDB = await this.getCharacterFromDb();
    this.character = this.charactersDB.filter(
      (ch) => ch.id === parseInt(this.id)
    )[0];
    if (!this.character) {
      const response = await this.$http.get(
        "https://rickandmortyapi.com/api/character/" + this.id
      );
      await this.addCharacterToDb(response.data);
      this.pageLoading = false;
      this.character = response.data;
    } else {
      this.pageLoading = false;
    }
  },
  methods: {
    async addCharacterToDb(character) {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction(["character"], "readwrite");
        trans.oncomplete = (e) => {
          resolve(e);
        };
        const store = trans.objectStore("character");
        store.add(character);
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
          db.createObjectStore("character", {
            autoIncrement: true,
            keyPath: "id",
          });
        };
      });
    },
    async getCharacterFromDb() {
      return new Promise((resolve, reject) => {
        const trans = this.db.transaction(["character"], "readonly");
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
  },
};
</script>
<style scoped>
.character:hover {
  box-shadow: 0px 2px 4px 5px rgba(0, 0, 0, 0.25) !important;
}
.text-bold {
  font-weight: bold;
}
</style>