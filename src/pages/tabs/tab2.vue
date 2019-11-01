<template>
	<div>
		<CellGroup>
			<Cell title="照片读取">
				<Icon name="photograph" slot="right-icon" @click="takePic" style="margin-top: 3px;"/>
			</Cell>
			<img :src="pic" class="pic" v-if="pic">
		</CellGroup>
	</div>
</template>
<script>
	import { Icon, CellGroup, Cell } from 'vant';

	export default {
	  name: 'tab2',
	  components: { Icon, CellGroup, Cell },
	  data() {
	    return {
	      pic: null
	    };
	  },
	  methods: {
	    takePic() {
	      this.$ac.getPicture(
	        {
	          sourceType: 'library',
	          encodingType: 'jpg',
	          mediaValue: 'pic',
	          destinationType: 'base64',
	          allowEdit: true,
	          quality: 90,
	          targetWidth: 800,
	          saveToPhotoAlbum: false
	        },
	        (ret, err) => {
	          if (ret) {
	            this.pic = ret.base64Data; // Your can change the base64 data to a file
	          } else {
	            this.$ac.alert({ msg: err.msg });
	          }
	        }
	      );
	    }
	  }
	};
</script>
<style scoped>
	.pic {
	  width: 100%;
	  text-align: center;
	}
</style>


