<template>
    <div class="border-4 border-black rounded-[8px] w-[600px] h-[200px] relative flex">
        <!-- <h1>{{ props.character.name }}</h1> -->
        <!-- <img :src="props.character.image" class="h-full bg-repeat-x"></img> -->

        <!-- background -->
        <div
         class=" h-full w-full rounded-[4px] absolute top-0 left-0"
         :style="{ 
            'background-image': 'url(' + props.character.image + ')',
            'background-size':'200px 100%',
            'background-repeat':'repeat-x'
            }"
        ></div>
        
        <!-- background -->

        <div 
        
        class="min-w-[200px] bg-black h-full bg-opacity-0 z-10"></div>

        <div 
        class="w-full h-full bg-[#ffffff] bg-opacity-55 backdrop-blur-[32px] z-10 rounded-r-[6px] 
        flex flex-col p-4 justify-between text-shadow shadow-[rgba(255,255,255,0.5)]">

            <div class="flex justify-between items-center">
                <h1 class="text-[20px] font-bold">{{props.character.name}}</h1>
                <div class="flex gap-1 text-[16px]">
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
            </div>

            <div class="flex flex-col justify-between items-center">
                <div class="flex justify-start items-center w-full gap-1">
                    <img src="../../public/locationIconWShadow.png" class="size-4"></img>
                    <div class="flex gap-2 justify-center items-center">
                        <h4 class="text-opacity-75 text-[#031C1A] font-semibold text-nowrap">Origin:</h4>
                        <router-link :to="('/locations/'+props.character.origin.url.split('location/')[1])" v-if="props.character.origin && props.character.origin.name !=='unknown'" 
                        class="font-bold underline underline-offset-2">{{ props.character.origin.name }}</router-link>
                        <h4 v-if="props.character.origin && props.character.origin.name ==='unknown'">Unknown</h4>
                    </div>
                </div>

                <div class="flex justify-start items-center w-full gap-1">
                    <img src="../../public/locationIconWShadow.png" class="size-4"></img>
                    <div class="flex gap-2 justify-center items-center">
                        <h4 class="text-opacity-75 text-[#031C1A] font-semibold text-nowrap">Last seen:</h4>
                        <router-link :to="('/locations/'+props.character.location.url.split('location/')[1])" v-if="props.character.location && props.character.location.name !=='unknown'" 
                        class="font-bold underline underline-offset-2">{{ props.character.location.name }}</router-link>
                        <h4 v-if="props.character.location && props.character.location.name ==='unknown'">Unknown</h4>
                    </div>
                </div>
            </div>

            <div class="flex w-full justify-between gap-4 text-center">
                <div class="flex flex-col justify-center items-center">
                    <h4 class="text-opacity-75 text-[#031C1A] font-semibold">Type</h4>
                    <h4 class="font-bold">{{ props.character.type === "" ? "-" : props.character.type }}</h4>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <h4 class="text-opacity-75 text-[#031C1A] font-semibold">Species</h4>
                    <h4 class="font-bold">{{ props.character.species }}</h4>
                </div>
                <div class="flex flex-col justify-center items-center">
                    <h4 class="text-opacity-75 text-[#031C1A] font-semibold">Gender</h4>
                    <h4 class="font-bold">{{ props.character.gender }}</h4>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>


    const props = defineProps(["character"])
    /* console.log(props.character) */

    
    
</script>

<style>
</style>