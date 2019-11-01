<template>
	<div>
		<Search placeholder="Search here"/>
		<List v-model="loading" :finished="finished" finished-text="no more..." @load="loadMore">
			<Cell v-for="item in list" :key="item" :title="item"/>
		</List>
	</div>
</template>

<script>
	import { Search, List, Cell } from 'vant';

	export default {
	  name: 'tab1',
	  components: { Search, List, Cell },
	  data() {
	    return {
	      list: [],
	      loading: false,
	      finished: false
	    };
	  },
	  methods: {
	    loadMore() {
	      // async load datas
	      setTimeout(() => {
	        for (let i = 0; i < 10; i++) {
	          this.list.push(this.list.length + i);
	        }

	        this.loading = false;

	        if (this.list.length > 40) {
	          this.finished = true;
	        }
	      }, 0);
	    }
	  }
	};
</script>

<style scoped>
</style>