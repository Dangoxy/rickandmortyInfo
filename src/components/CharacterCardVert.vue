<template>
    <div class="border-4 border-black rounded-[8px] w-[200px] h-[400px] relative flex-col overflow-hidden">
        <!-- <h1>{{ props.character.name }}</h1> -->
        <!-- <img :src="props.character.image" class="h-full bg-repeat-x"></img> -->

        <!-- background -->
        <div
         class=" h-full w-full rounded-[4px] absolute top-0 left-0"
         :style="{ 
            'background-image': 'url(' + props.character.image + ')',
            'background-size':'100% 200px',
            'background-repeat':'repeat-y'
            }"
        ></div>
        <!-- background -->

         <!-- alive banner -->
        <div class="flex gap-1 text-[16px] absolute backdrop-blur-[32px] bg-[#ffffff] bg-opacity-50 px-2 py-1 rounded-[4px] top-1 right-1">
            <img v-if="props.character.status === 'Alive'" class="size-6" src="../../public/heartGreenWShadow.png"></img>
            <img v-if="props.character.status === 'Dead'" class="size-6" src="../../public/heartRedWShadow.png"></img>
            <img 
            v-if="props.character.status !== 'Alive' && props.character.status !== 'Dead'" 
            class="size-6" src="../../public/heartBlueWShadow.png"></img>
            
            <h4 v-if="props.character.status === 'Alive'"
            class="text-[#007E00]">
                {{props.character.status}}
            </h4>
            <h4 v-if="props.character.status === 'Dead'"
            class="text-[#860000]">
                {{props.character.status}}
            </h4>
            <h4 
            v-if="props.character.status !== 'Alive' && props.character.status !== 'Dead'" 
            class="text-[#000086]">
                {{props.character.status.charAt(0).toUpperCase() + props.character.status.slice(1)}}
            </h4>
            
        </div>
        <!-- alive banner -->

        <div :class="showAll? 'min-h-[0px]' : 'min-h-[200px]'" class="bg-black  bg-opacity-100 z-50 transition-all duration-500"></div>

        <div 
        class="w-full h-full bg-[#ffffff] bg-opacity-50 backdrop-blur-[32px] z-10 rounded-b-[6px] 
        flex flex-col p-2 justify-between text-shadow shadow-[rgba(255,255,255,0.5)] gap-4">

            <div class="w-full h-[50%] flex flex-col justify-between">
                <div class="flex justify-between items-center">
                    <h1 @click="switchShowAll" class="text-[20px] font-bold">{{props.character.name}}</h1>
                </div>

                <div class="flex flex-col justify-between items-center">
                    <div class="flex justify-start items-center w-full flex-col">
                        <div class="flex justify-start w-full items-center gap-1">
                            <img src="../../public/locationIconWShadow.png" class="size-4"></img>
                            <h4 class="text-opacity-75 text-[#031C1A] font-semibold text-nowrap">Origin:</h4>
                        </div>

                        <router-link :to="('/locations/'+props.character.origin.url.split('location/')[1])" v-if="props.character.location && props.character.origin.name !=='unknown'" class="flex gap-2 justify-center items-center w-full">
                            <h4 class="font-bold underline underline-offset-2 w-full text-end">{{ props.character.origin.name }}</h4>
                        </router-link>
                        <div :to="('/locations/'+props.character.origin.url.split('location/')[1])" v-if="props.character.origin.name ==='unknown'" class="flex gap-2 justify-center items-center w-full">
                            <h4 class="font-bold-offset-2 w-full text-end">Unknown</h4>
                        </div>
                    </div>

                    <div class="flex justify-start items-center w-full flex-col">
                        <div class="flex justify-start w-full items-center gap-1">
                            <img src="../../public/locationIconWShadow.png" class="size-4"></img>
                            <h4 class="text-opacity-75 text-[#031C1A] font-semibold text-nowrap">Last seen:</h4>
                        </div>
                        
                        <router-link :to="('/locations/'+props.character.location.url.split('location/')[1])" v-if="props.character.location && props.character.location.name !=='unknown'" class="flex gap-2 justify-center items-center w-full">    
                            <h4 class="font-bold underline underline-offset-2 w-full text-end">{{ props.character.location.name }}</h4>
                        </router-link>
                        <div :to="('/locations/'+props.character.location.url.split('location/')[1])" v-if="props.character.location.name ==='unknown'" class="flex gap-2 justify-center items-center w-full">
                            <h4 class="font-bold w-full text-end">Unknown</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full h-[50%] flex flex-col justify-between">
                <div class="flex flex-col justify-center items-center">
                    <h4 class="text-opacity-75 text-[#031C1A] font-semibold">Type</h4>
                    <h4 class="font-bold">{{ props.character.type === "" ? "-" : props.character.type }}</h4>
                </div>
                <!-- <div class="flex w-full justify-between gap-4 text-center"> -->
                    
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-opacity-75 text-[#031C1A] font-semibold">Species</h4>
                        <h4 class="font-bold">{{ props.character.species }}</h4>
                    </div>
                    <div class="flex flex-col justify-center items-center">
                        <h4 class="text-opacity-75 text-[#031C1A] font-semibold">Gender</h4>
                        <h4 class="font-bold">{{ props.character.gender }}</h4>
                    <!-- </div> -->
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import {ref} from "vue"

    const props = defineProps(["character"])
    /* console.log(props.character) */

    let showAll = ref(false)
    function switchShowAll(){
        console.log("called")
        showAll.value = !showAll.value
    }
    
    
</script>

<style>
</style>