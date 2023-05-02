<template>
    <Page>
        <ActionBar flat="true">
            <NavigationButton text="Назад" android.systemIcon="ic_menu_back" @tap="backHome"/>
            <label class="name-app" text="Прогноз на 10 дней" />
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <label text="Прогноз на 10 дней"/>
        </FlexboxLayout>

    </Page>
</template>

<script>
import Home from './Home.vue'
//import * as ApplicationSettings from '@nativescript/core/application-settings';
  export default {
    data() {
        return {
            days: ["Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            month: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сен", "Окт", "Нояб", "Дек"],
        };
    },
    mounted() {
    },
    methods: {

        backHome(){
            this.$navigateBack();
        },

        goToHome(){
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
