<template>
  <div>
    <nav-bar
      id="nav"
      title="APICLOUD"
      :left-arrow="left"
      @click-left="clickLeft"
      fixed
    />
  </div>
</template>

<script>
import { NavBar } from "vant";
import apicloud from "@/libs/apicloud";

export default {
  name: "navbar",
  components: { NavBar },
  props: ["left", "right"],
  mounted() {
    // Should be at this time
    apicloud.fixStatusBar(apicloud.dom("#nav")); // Fix the APP header bug
  },
  methods: {
    clickLeft() {
      this.$ac.closeWin({
        type: "reveal",
        subType: "from_left"
      });
    }
  }
};
</script>

<style scoped>
.van-nav-bar {
  height: auto !important;
}
</style>
