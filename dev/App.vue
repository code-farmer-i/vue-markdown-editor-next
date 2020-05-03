<template>
  <v-md-container
    height="300px"
    left-toolbar="a b c"
    :toolbars="toolbars"
  ></v-md-container>
</template>

<script lang="ts">
import Container from '@/components/Container/index.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    [Container.name]: Container,
  },
  setup() {
    return {
      toolbars: {
        a: {
          text: 'a',
          title: 'a',
          menus: [
            {
              name: '11',
              text: 22,
              title: 'menu',
            },
          ],
        },
        b: {
          text: 'a',
          title: 'b',
        },
        c: {
          text: 'a',
          title: 'c',
        },
      },
    };
  },
});
</script>