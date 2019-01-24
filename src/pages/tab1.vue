<template>
	<container>
		<search placeholder="Search here"/>
		<list v-model="loading" :finished="finished" finished-text="no more..." @load="loadMore">
			<cell v-for="item in list" :key="item" :title="item"/>
		</list>
	</container>
</template>

<script>
	// Wanna debug on this page? Just 'npm run dev' and open the browser to url 'http://localhost:8080/tab1.html'
	import { Search, List, Cell } from "vant";

	window.tab1Vue = {
		name: "tab1",
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

	export default window.tab1Vue;
</script>

<style scoped>
</style>