<template>
  <div>
    <a v-if="linkInfo.type==='outer'" :href="linkInfo.url" target="_blank">
      <slot />
    </a>
    <router-link v-if="linkInfo.type==='base'" :to="linkInfo.url">
      <slot />
    </router-link>
  </div>
</template>


<script>
import { isExternal } from '@/utils/validate';

export default {
  name: 'SidebarLink',
  components: {},
  mixins: [],
  props: {
    link: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      linkInfo: {
        type: '',
        url: this.link,
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.initLinkInfo();
  },
  methods: {
    initLinkInfo() {
      if (isExternal(this.link)) {
        this.linkInfo.type = 'outer';
      } else {
        this.linkInfo.type = 'base';
      }
    },
  },
};
</script>


<style lang="scss">
</style>