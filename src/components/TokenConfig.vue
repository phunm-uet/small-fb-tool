<template>
    <v-flex xs6>
        <v-text-field
        label="Access Token"
        v-model="accessToken"
        required
        ></v-text-field>
        <v-btn
        color="info"
        @click="addToken"
        >
        Add Token
        </v-btn>   
  <v-data-table
      v-bind:headers="headers"
      :items="items"
      hide-actions
      v-model="selected"
      class="elevation-1"
      style="margin-top : 15px"
    >
    <template slot="items" scope="props">
        <td>{{props.item.id}}</td>
      <td>{{ props.item.name }}</td>
      <td>
           <v-btn flat icon color="deep-orange" @click="delToken(props.item.id)">
              <v-icon>clear</v-icon>
            </v-btn>
      </td>
    </template>
  </v-data-table>               
    </v-flex>
</template>

<script>
import axios from 'axios'
import {FB_HOST} from '../config'
export default {
    data(){
        return {
            accessToken : "",
            headers : [
                { text : "Page Id",align : 'left'},
                { text : "Page Name",align : 'left'},
                {sortable : false,text : 'Action'}
            ],
            items : [],
            selected : []
        }
    },
    created(){
        let tmp = localStorage.getItem("tokens");
        if(tmp != null) this.items = JSON.parse(tmp);
    },
    methods: {
        addToken() {
            let token = this.accessToken
            axios.get(FB_HOST+"me?access_token="+token)
            .then(res => {
                let data = res.data;
                let obj = {name : data.name,id : data.id,access_token : token};
                let tokens = JSON.parse(localStorage.getItem("tokens"));
                if(tokens != null){
                    tokens.push(obj);
                    localStorage.setItem("tokens",JSON.stringify(tokens));
                } else {
                    tokens = [];
                    tokens.push(obj);
                    localStorage.setItem("tokens",JSON.stringify(tokens));
                }
                this.items = tokens;
                alert("Add thanh cong");
            })
            .catch(err => {
                alert("Da co loi xay ra");
            })
        }, 
        delToken(id){
            let i =0 ;
            for(i = 0; i < this.items.length; i++)
            {
                if(this.items[i].id == id){
                    this.items.splice(i,1);
                    localStorage.setItem("tokens",JSON.stringify(this.items));
                    break;
                }
            
            }
        }
    },
}
</script>

<style>

</style>
