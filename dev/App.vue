<template>
  <v-md-container height="300px"></v-md-container>
</template>

<script lang="ts">
import Container from '@/components/Container/index.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    [Container.name]: Container,
  },
  setup() {
    return {};
  },
});
</script>