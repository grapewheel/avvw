<template>
	<div>
		<Header :left="false"/>
		<Tabbar v-model="tabActive" id="tabbar" @change="changeTab" fixed>
			<TabbarItem icon="home-o">标签</TabbarItem>
			<TabbarItem icon="search" dot>标签</TabbarItem>
			<TabbarItem icon="friends-o" info="5">标签</TabbarItem>
		</Tabbar>
	</div>
</template>

<script>
	import Header from "@/components/header.vue";
	import apicloud from "@/libs/apicloud";

	/* You can use other UI framework as u like */
	import { Tabbar, TabbarItem } from "vant"; // Dynamic import is a good idea to keep ur page slim and fast

	export default {
		// Pay attention here!!
		name: "home",
		components: { Header, Tabbar, TabbarItem },
		data() {
			return {
				tabActive: 0
			};
		},
		mounted() {
			// No vue-router, use apicloud's framegroup to get the max transform efficiency
			// But if u wanna a smooth coding feeling, just use the vue router and the v-tap
			let navHeight = apicloud.dom("#nav").offsetHeight;
			let frameHeight =
				this.$ac.winHeight -
				apicloud.dom("#tabbar").offsetHeight -
				apicloud.dom("#nav").offsetHeight;

			this.$ac.openFrameGroup(
				{
					name: "homeTabs",
					scrollEnabled: true,
					rect: {
						x: 0,
						y: navHeight,
						w: "auto",
						h: frameHeight
					},
					index: 0,
					useWKWebView: true, // Be careful here
					historyGestureEnabled: true,
					frames: [
						{
							name: "tab1",
							url: "./tabs-tab1.html" // sub diretory file format: ./[subdir]-[subdir]-[filename].html
						},
						{
							name: "tab2",
							url: "./tabs-tab2.html",
							bounces: true
						},
						{
							name: "tab3",
							url: "./tabs-tab3.html"
						}
					]
				},
				(ret, err) => { // You must use arrow function that can been used 'THIS'
					this.tabActive = ret.index;
				}
			);
		},
		methods: {
			changeTab(index) {
				// You cann't test this on the browser, use wifi sync to ur phone pleaz
				console.info(`select tab: ${index}`); // Must be use `` to log, DO NOT use console.info('', ''), it will ignore the second param
				this.$ac.setFrameGroupIndex({
					name: "homeTabs",
					index,
					scroll: true
				});
			}
		}
	};
</script>

<style scoped>
	#tabbar {
		position: fixed;
	}
</style>