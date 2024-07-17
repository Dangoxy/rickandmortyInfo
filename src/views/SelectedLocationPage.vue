<template>
    <Navbar></Navbar>
    <div v-if="episodeData.data">
        <h1>{{episodeData.data.name}}</h1>
        <h1>{{episodeData.data.type}}</h1>
        <h1>{{episodeData.data.dimension}}</h1>
    </div>
    <div >
        <h1>Residents</h1>
        <h1 v-for="char in residentsData.data">{{char.name}}</h1>
    </div>
</template>

<script setup>
import {useRoute} from "vue-router"
import {ref, reactive, watch} from "vue"
import Navbar from "../components/Navbar.vue"
import axios from 'axios';

let route = useRoute()
console.log(route.params.id)

let episodeData = reactive({data: []})
let residentsData = reactive({data: []})

async function getLocationData(){
    await axios.get("https://rickandmortyapi.com/api/location/"+route.params.id)
    .then((response) => {
        /* dataAPI.data = response.data.results;
        dataAPI.info = response.data.info; */
        console.log(response.data)
        episodeData.data = response.data
        
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

getLocationData()

async function getLocationResidents(){
    let residents = episodeData.data.residents
    let temp = []
    for(let i = 0; i < residents.length; i++){
        console.log(residents[i])

        await axios.get(residents[i])
        .then((response) => {
            console.log(response.data)
            temp.push(response.data)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }
    residentsData.data = temp
    
}


watch(() => route.params.id,(newId, oldId) => {
    getLocationData()
    console.log(newId)
})

watch(()=> episodeData.data, (newEpisodeData, oldEpisodeData)=>{
    getLocationResidents()
})

</script>

<style scoped>

</style>