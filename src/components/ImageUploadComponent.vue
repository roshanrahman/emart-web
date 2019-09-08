<template>
  <div>
    <v-file-input
      ref="fileInput"
      accept="image/*"
      label="File input"
      @change="uploadFile"
      v-show="false"
    ></v-file-input>
    <v-card
      outlined
      v-if="!imageAvailable"
    >
      <v-flex class="justify-center">
        <v-card
          elevation="0"
          class="pa-4"
        >
          <v-row justify="center">

            <v-btn
              elevation="0"
              color="primary"
              :text="isUploadBusy"
              @click="triggerFileSelection()"
              :disabled="isUploadBusy"
              :loading="isUploadBusy"
            >Upload Photo</v-btn>
          </v-row>
        </v-card>
        <v-progress-linear
          :value="uploadProgress"
          v-if="isUploadBusy"
        ></v-progress-linear>
      </v-flex>
    </v-card>
    <v-hover
      v-else
      v-slot:default="{ hover }"
    >
      <v-card>

        <v-img :src="currentImageURL">
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="black"
          >
            <v-btn
              outlined
              rounded
              dark
              @click="triggerFileSelection()"
            >Change</v-btn>
          </v-overlay>
        </v-fade-transition>

      </v-card>
    </v-hover>

  </div>
</template>

<script>
import firebase from "firebase";
export default {
  mounted () {
    this.currentImageURL = this.imageURL;
  },
  methods: {
    randomIdGenerator: function (length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    triggerFileSelection () {
      this.$refs.fileInput.$el.querySelector('.v-file-input__text').click();

    },
    uploadFile (file) {

      if (!!file == false || file == {} || file == '') {
        return
      }
      this.currentImageURL = null;
      this.isUploadBusy = true;


      var vm = this;
      var promises = [];
      console.log('Upload begin', file);
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child(`${this.randomIdGenerator(10)}/image.jpg`).put(file);
      promises.push(uploadTask);
      uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        vm.uploadProgress = progress;
        console.log('Upload is ' + progress + '% done');
      }, function (error) {
        console.log('FIREBASE ERROR', error);
      },
        async function () {
          await uploadTask.snapshot.ref.getDownloadURL().then(
            function (downloadURL) {
              console.log('Returned URL ', downloadURL);
              vm.setImageToComponent(downloadURL);
            }
          )
        });
      Promise.all(promises).then(tasks => {
        this.isUploadBusy = false;
      });

    },
    setImageToComponent (url) {
      this.currentImageURL = url;
      this.$emit('imageChanged', url);
    }
  },
  props: [
    'imageURL'
  ],
  watch: {
    imageURL: function () {
      console.log('Prop changed!');
      this.currentImageURL = this.imageURL;
    }
  },
  computed: {
    imageAvailable: function () {
      return !!this.currentImageURL;
    }
  },
  data () {
    return {
      isUploadBusy: false,
      currentImageURL: this.imageURL,
      uploadProgress: 0
    }
  }
}
</script>

<style>
</style>