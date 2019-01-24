<template>
	<container>
		<header-c :left="false"/>
		<tabbar v-model="tabActive" id="tabbar" fixed>
			<tabbar-item icon="home-o">标签</tabbar-item>
			<tabbar-item icon="search" dot>标签</tabbar-item>
			<tabbar-item icon="friends-o" info="5">标签</tabbar-item>
		</tabbar>
	</container>
</template>

<script>
	import Header from "@/components/header.vue";
	import apicloud from "@/libs/apicloud";

	/* You can use other UI framework as u like */
	import { Tabbar, TabbarItem } from "vant"; // Dynamic import is a good idea to keep ur page slim and fast

	window.homeVue = { // Pay attention here!!
		name: "home",
		components: { HeaderC: Header, Tabbar, TabbarItem },
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

			let that = this;
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
							url: "tab1.html"
						},
						{
							name: "tab2",
							url: "tab2.html",
							bounces: true
						},
						{
							name: "tab3",
							url: "tab3.html"
						}
					]
				},
				function(ret, err) {
					// here 'this' is not vue virtual dom 'this', IS apicloud API dom 'this', so 'that' the vue 'this'
					that.tabActive = ret.index;
				}
			);
		},
		watch: {
			tabActive(index) {
				// You cann't test this on the browser, use wifi sync to ur phone pleaz
				console.info("select tab: ", index);
				this.$ac.setFrameGroupIndex({
					name: "homeTabs",
					index: index,
					scroll: true
				});
			}
		}
	};

	export default window.homeVue;
</script>

<style scoped>
	#tabbar {
		position: fixed;
	}
</style>