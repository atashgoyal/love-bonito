<template>
  <div>
    <div v-if="pageLoading" class="m-5">
      <b-spinner class="m-5" label="Busy"></b-spinner>
    </div>
    <b-card v-if="!pageLoading"
      v-bind:img-src="character.image"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 25rem"
      class="mb-2 mx-auto shadow-lg mt-3"
    >
      <b-card-title class="text-truncate"> {{ character.name }}</b-card-title>
      <b-card-text>
        <p class="m-0 text-warning">{{ character.species }}</p>
        <p
          class="m-0"
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
export default {
  name: "Character",
  data() {
    return {
      character: null,
      id: this.$route.params.id,
      pageLoading: true
    };
  },
  async created() {
    const response = await this.$http.get(
      "https://rickandmortyapi.com/api/character/" + this.id
    );
    const data = response.data;
    this.pageLoading = false;
    this.character = data;
  },
};
</script>