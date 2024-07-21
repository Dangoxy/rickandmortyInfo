<template>
    <div class="border-4 border-gray-500 rounded-[8px] min-w-[200px] max-w-[200px] h-[400px] relative flex-col gap-2">

        <div class="h-[50%] shimmer2 rounded-[4px] rounded-b-none relative">
            <div class="w-[50%] h-8 shimmer border-2  rounded-md absolute top-1 right-1"></div>
        </div>

        <div class="h-[50%] flex gap-2 flex-col justify-between items-center p-2">
            <div class="w-full h-8 shimmer rounded-md"></div>
            <div class="w-full h-8 shimmer rounded-md"></div>
            <div class="w-full h-8 shimmer rounded-md"></div>
            <div class="w-full h-8 shimmer rounded-md"></div>
            <div class="w-full h-8 shimmer rounded-md"></div>

        </div>

    </div>
</template>

<style scoped>

.shimmer{
    background: linear-gradient(45deg,
                                    rgba(128, 128, 128, 1),
                                    rgba(196, 196, 196, 0.5),
                                    rgba(128, 128, 128, 1),
                                    rgba(196, 196, 196, 0.5),
                                    rgba(128, 128, 128, 1),
                                    rgba(196, 196, 196, 0.5),
                                    rgba(128, 128, 128, 1));
    /* background-size: 200% 1000%; */
    

    animation: shimmerEffect 12s ease infinite;
}
@keyframes shimmerEffect{
    0%{background-size: 200% 2000%;}
    50%{background-size: 200% 200%;}
    100%{background-size: 200% 2000%;}
}

.shimmer2{
    background: linear-gradient(135deg,
                                    rgba(128, 128, 128, 0.5),
                                    rgba(196, 196, 196, 0.5),
                                    rgba(128, 128, 128, 0.5),
                                    rgba(196, 196, 196, 0.5),
                                    rgba(128, 128, 128, 0.5),
                                    rgba(196, 196, 196, 0.5),
                                    rgba(128, 128, 128, 0.5));
    /* background-size: 200% 1000%; */

    animation: shimmerEffect2 12s ease infinite;
}

@keyframes shimmerEffect2{
    0%{background-size: 200% 2000%;}
    50%{background-size: 200% 200%;}
    100%{background-size: 200% 2000%;}
}

</style>