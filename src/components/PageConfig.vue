<template>
    <v-flex xs5 offset-xs1>
        <v-text-field
        label="Page ID"
        v-model="pageId"
        required
        ></v-text-field>
        <v-btn
        color="info"
        @click="addPage"
        >
        Add Page Follow
        </v-btn>      
        <v-data-table
            v-bind:headers="headers"
            :items="items"
            hide-actions
            class="elevation-1"
            style="margin-top : 15px"
            >
            <template slot="items" scope="props">
                <td>{{props.item.id}}</td>
            <td>{{ props.item.name }}</td>
            <td>
                <v-btn flat icon color="deep-orange" @click="delPage(props.item.id)">
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
            pageId : "",
            headers : [
                { text : "Page Id",align : 'left'},
                { text : "Page Name",align : 'left'},
                {sortable : false,text : 'Action'}
            ],
            items : [],
        }
    },
    created(){
        let tmp = localStorage.getItem("pages");
        if(tmp != null) this.items = JSON.parse(tmp);
    },
    methods: {
        addPage() {
            let tokens = JSON.parse(localStorage.getItem("tokens"));
            if(tokens.length == 0){
                alert("Ban chua co token nao!")
                return;
            }
            let token = tokens[0].access_token;
            let pageId = this.pageId
            axios.get(FB_HOST+pageId+"?access_token="+token)
            .then(res => {
                let data = res.data;
                let obj = {name : data.name,id : data.id};
                let pages = JSON.parse(localStorage.getItem("pages"));
                if(pages != null){
                    pages.push(obj);
                    localStorage.setItem("pages",JSON.stringify(pages));
                } else {
                    pages = [];
                    pages.push(obj);
                    localStorage.setItem("pages",JSON.stringify(pages));
                }
                this.items = pages;
                alert("Add thanh cong");
            })
            .catch(err => {
                alert("Da co loi xay ra");
            })
        }, 
        delPage(id){
            let i =0 ;
            for(i = 0; i < this.items.length; i++)
            {
                if(this.items[i].id == id){
                    this.items.splice(i,1);
                    localStorage.setItem("pages",JSON.stringify(this.items));
                    break;
                }
            
            }
        }
    },
}
</script>

<style>

</style>
