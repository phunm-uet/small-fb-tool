<template>
<v-flex xs9 offset-xs3 >
  <v-card color=" lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Select Page Follow</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="pages"
              item-text="name"
              item-value="id"
              v-model="page"
              label="Select"
              single-line
              bottom
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-btn
      color="info"
      :loading="loading"
      @click="getImage"
      :disabled="loading"
    >
     Get Images
      <span slot="loader" class="custom-loader">
        <v-icon light>cached</v-icon>
      </span>
    </v-btn>
  </v-card>
  <v-layout row wrap>
    <v-flex xs6 sm4 v-for="(image,index) in images" :key="image.id" style="padding : 10px;">
      <v-card>
        <v-card-media :src="image.full_picture" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <v-flex sm12>
           <v-layout>{{image.message}}</v-layout>
           <v-layout sm12>
             <v-flex sm6>Like : {{image.reactions.summary.total_count}}</v-flex>
             <v-flex sm6>Type : {{image.type}}</v-flex>
           </v-layout>
           <div v-if="image.type=='link'"><a :href="image.link" target="_blank" >Open</a></div>
          </v-flex>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange" @click="openDialog(index)">Share</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout> 



    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">Post Status</v-card-title>
        <v-card-text>
            <img :src="selectPost.full_picture" style="width: 200px">
            <v-container fluid>
                <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-subheader v-text="'Select Page to Post'"></v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-select
                    v-bind:items="tokens"
                    item-text="name"
                    
                    v-model="token"
                    label="Pages"
                    autocomplete
                    ></v-select>
                </v-flex>
                </v-layout>

                <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-subheader v-text="'Content for post'"></v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                        v-model="contentPost"
                        multi-line
                    ></v-text-field>
                </v-flex>
                </v-layout>
                <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-subheader v-text="'Content for post'"></v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                    <input type="datetime-local" name="bdaytime" v-model="time"> 
                </v-flex>
                </v-layout>                               
            </v-container>            
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="submit">Submit</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</v-flex>

</template>

<script>
import axios from 'axios';
import {FB_HOST} from '../config'
export default {
    created(){
        let tmp = localStorage.getItem("pages");
        let tokens = localStorage.getItem("tokens");
        if(tmp != null) this.pages = JSON.parse(tmp);
        if(tokens != null) this.tokens = JSON.parse(tokens);
    },
    data(){
        return {
            pages : [],
            tokens : [],
            page: "",
            images : [],
            dialog : false,
            selectPost : "",
            token : "",
            contentPost : "",
            time : "",
            loading : false
        }
    },
    methods: {
        getImage() {
            let tokens = localStorage.getItem("tokens");
            this.loading = true
            if(tokens == null){
                alert("Chua co token nao");
                this.$router.push({name : 'Config'});
                return;
            }
            tokens = JSON.parse(tokens);
            let ran = Math.floor(Math.random() * tokens.length);  
            let token = tokens[ran].access_token;
            let query = this.page+`?fields=posts.limit(200){full_picture,message,link,type,reactions.limit(1).summary(true)}&access_token=`+token;
            axios.get(FB_HOST+query)
            
            .then(res => {
                this.images = res.data.posts.data;
                this.loading = false
            })
            .catch(err => {
                console.log(err.response);
                alert("Da co loi xay ra");
            })
        },
        openDialog(index) {
            this.selectPost = this.images[index];
            this.contentPost = this.selectPost.message;
            this.dialog = true;
        },
        submit(){
            let t = new Date(this.time);
            let tz = t.getTime()/1000;
            let params = {
                caption : this.contentPost,
                url : this.selectPost.full_picture,
                scheduled_publish_time : tz,
                published : false,
            }
            axios.post(FB_HOST+"me/photos?access_token="+this.token.access_token,params)
            .then(res => {
                this.dialog = false;
            })
            .catch(err => {
                alert("Da co loi xay ra");
                console.log(err.response)
            })
        }
    },
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>