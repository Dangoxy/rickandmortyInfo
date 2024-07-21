<template>
    <Navbar></Navbar>
    <div class="w-full h-full bg-[#F0F9E3] overflow-hidden">
        <div class="flex w-full justify-center items-center noHeight">
            <img 
            class="max-w-96 mb-8 mr-8 animatedLogoDisappearing"
            src="../../public/portal-rick-and-morty.gif" />
        </div>

        <div class="flex w-full h-full md:justify-around justify-center items-center md:flex-row flex-col lg:gap-4 gap-0 p-4">

            <router-link 
            to="/episodes"
            class="flex xl:h-[600px] md:h-[350px] h-[200px] md:w-fit w-full aspect-[1.25/2]  rounded-[8px] transition-all duration-300
            scale-[0.85]"
            :style="{ 
            'background-image': 'url(https://rickandmortyapi.com/api/character/avatar/1.jpeg)',
            'background-size':'contain',
            'background-position': 'center center'}">

                <div class="w-full h-full backdrop-blur-[32px] bg-[rgba(255,255,255,0.5)] rounded-[8px] border-4 border-[#031C1A] group
                flex md:flex-col sm:flex-row flex-col justify-center items-center gap-4 p-4">
                    <img class="xl:size-24 md:size-16 size-12 group-hover:size-28 transition-all duration-300" src="../../public/episodesIcon.png" />
                    <h1 class="xl:text-[48px] md:text-[32px] text-[28px] transition-all duration-300">Episodes</h1>
                </div>
                
            </router-link>

            <router-link 
            to="/characters"
            class="flex xl:h-[600px] md:h-[350px] h-[200px] md:w-fit w-full aspect-[1.25/2] rounded-[8px] transition-all duration-300"
            :style="{ 
            'background-image': 'url(https://rickandmortyapi.com/api/character/avatar/1.jpeg)',
            'background-size':'contain',
            'background-position': 'center center'}">

                <div class="w-full h-full backdrop-blur-[16px] bg-[rgba(255,255,255,0.5)] rounded-[8px] border-4 border-[#031C1A] group
                flex md:flex-col sm:flex-row flex-col justify-center items-center gap-4 p-4 transition-all duration-500">
                    <img class="xl:size-24 md:size-16 size-12 group-hover:size-28 transition-all duration-300" src="../../public/charactersIcon.png" />
                    <h1 class="xl:text-[48px] md:text-[32px] text-[28px] transition-all duration-300">Characters</h1>
                </div>

            </router-link>

            <router-link 
            to="/locations"
            class="flex xl:h-[600px] md:h-[350px] h-[200px] md:w-fit w-full aspect-[1.25/2] rounded-[8px] transition-all duration-300
            scale-[0.85]"
            :style="{ 
            'background-image': 'url(https://rickandmortyapi.com/api/character/avatar/1.jpeg)',
            'background-size':'contain',
            'background-position': 'center center'}">

                <div class="w-full h-full backdrop-blur-[16px] bg-[rgba(255,255,255,0.25)] rounded-[8px] border-4 border-[#031C1A] group
                flex md:flex-col sm:flex-row flex-col justify-center items-center gap-4 p-4">
                    <img class="xl:size-24 md:size-16 size-12 group-hover:size-28 transition-all duration-300" src="../../public/globeIcon.png" />
                    <h1 class="xl:text-[48px] md:text-[32px] text-[28px] transition-all duration-300">Locations</h1>
                </div>
                
            </router-link>

        </div>
    </div>
</template>

<script setup>

import Navbar from "../components/Navbar.vue";
import axios from 'axios';
import {ref, reactive} from "vue";

    

</script>

<style scoped>

.animatedLogoDisappearing{
    width: 0%;
    display: hidden;
    animation: animatedLogoDisappearing 2s ease-in-out;
}
@keyframes animatedLogoDisappearing {
    0%{
        
        width: 100%;
        max-width: 512px;
    }
    25%{
        width: 50%;
        max-width: 256px;
    }
    
    75%{
        width: 100%;
        max-width: 512px;
    }
    
    100%{
        width: 0%;
        max-width: 0px;
    }
}

.noHeight{
    height: 0%;
    overflow:hidden;
    animation: noHeight 4s ease;
}




@keyframes noHeight {
    0%{
        height: 100%;
    }
    50%{
        height: 100%;
    }
    75%{
        height: 0%;
    }
    100%{
        height: 0%;
    }
}
</style>