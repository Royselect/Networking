<template>
    <Page>
        <ActionBar flat="true">
            <NavigationButton text="Назад" android.systemIcon="ic_menu_back" @tap="backHome"/>
            <label class="label-change" text="Прогноз на 5 дней" />
        </ActionBar>
        <FlexboxLayout class="weather-for-days-data" flexDirection="row">
            <template style="background-color: aqua;">
                <FlexboxLayout class="weather-three-data" flexDirection="row">
                    <label text="Дата" />
                    <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                        <FlexboxLayout class="days" flexDirection="row">
                            <label text="днем" />
                            <label text=" / "/>
                            <label text="ночью"/>
                        </FlexboxLayout>
                        <image src="~/assets/img/sun.png"/>
                    </FlexboxLayout>
                </FlexboxLayout>
            </template>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Home from './Home.vue'
//import * as ApplicationSettings from '@nativescript/core/application-settings';
  export default {
    data() {
        return {
          
        };
    },
    mounted() {
    },
    methods: {
        backHome() {
            this.$navigateBack();
        },
    },
}
</script>

<style scoped lang="scss">
    @import '@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
