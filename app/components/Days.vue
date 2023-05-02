<template>
    <Page>
        <ActionBar flat="true">
            <!-- <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goToHome"/> -->
            <label class="name-app" text="Прогноз на 10 дней" />
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <label text="aaaaaaaaaaaaaaaaa" />
        </FlexboxLayout>
        <!-- <FlexboxLayout flexDirection="column">
            <ListView>
                <template class="weather-three">
                    <label text="Дата" />
                    <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                        <label text="Градусы" />
                        <image src="~/assets/img/sun.png"/>
                    </FlexboxLayout>
                </template>
            </ListView>
        </FlexboxLayout> -->
    </Page>
</template>

<script>
import Home from './Home.vue'
export default {
    data() {
    },
    mounted: {},
    methods: {
        goToHome() {
            this.$navigateTo(Home);
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