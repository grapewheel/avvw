<template>
	<container>
		<cell-group>
			<cell title="照片读取">
				<icon name="photograph" slot="right-icon" @click="takePic" style="margin-top: 3px;"/>
			</cell>
			<img :src="pic" class="pic" v-if="pic">
		</cell-group>
	</container>
</template>
<script>
	import { Icon, CellGroup, Cell } from "vant";

	window.tab2Vue = {
		name: "tab2",
		components: { Icon, CellGroup, Cell },
		data() {
			return {
				pic: null
			};
		},
		methods: {
			takePic() {
				let that = this;
				this.$ac.getPicture(
					{
						sourceType: "library",
						encodingType: "jpg",
						mediaValue: "pic",
						destinationType: "base64",
						allowEdit: true,
						quality: 90,
						targetWidth: 800,
						saveToPhotoAlbum: false
					},
					function(ret, err) {
						if (ret) {
							that.pic = ret.base64Data; // Your can change the base64 data to a file
						} else {
							this.$ac.alert({ msg: err.msg });
						}
					}
				);
			}
		}
	};

	export default window.tab2Vue;
</script>
<style scoped>
	.pic {
		width: 100%;
		text-align: center;
	}
</style>


