<template>
    <Page>
        <ActionBar flat="true">
            <!-- <NavigationButton text="Назад" android.systemIcon="ic_menu_back" @tap="backHome"/> -->
            <label class="label-change" text="Выберите город: " />
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <FlexboxLayout flexDirection="column">
                <button @tap="onCity('Sovetskiy')" class="button-for-days" text="Советский"/>
                <button @tap="onCity('Surgut')" class="button-for-days" text="Сургут" />
                <button @tap="onCity('Khanty-Mansiysk')" class="button-for-days" text="Ханты-Мансийск"/>
                <button @tap="onCity('Yekaterinburg')" class="button-for-days" text="Екатеринбург" />
                <button @tap="onCity('Tyumen')" class="button-for-days" text="Тюмень"/>
                <button @tap="onCity('Kazan')" class="button-for-days" text="Казань"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="column" class="logo-image-flex">
                <image class="logo-image" src="~/assets/img/logo.png"/>
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
import Home from './Home.vue'
//import * as ApplicationSettings from '@nativescript/core/application-settings';
  export default {
    data() {
        return {
            changeCity: "",
        };
    },
    mounted() {
    },
    methods: {
        backHome() {
            this.$navigateBack();
        },
        onCity(c) {
            this.$navigateTo(Home, {
                props: {
                    cityNew: c,
                }
            });
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
