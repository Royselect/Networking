<template>
    <Page>
        <!-- <ActionBar flat="true">
            <StackLayout class="bar-weather" orientation="horizontal">
                <Image class="icon-search" src="~/assets/img/logo.png" width="40" height="40" verticalAlignment="center" />
                <label class="name-app" text="SkyTracker" fontSize="24" verticalAlignment="center" />
            </StackLayout>
        </ActionBar> -->
        <ActionBar flat="true">
            <label class="name-app" text="SkyTracker"/>
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <SearchBar class="search-bar" hint="Населенный пункт"/>
            <!-- <FlexboxLayout class="search-bar" flexDirection="row">
                <image class="icon-search" src="~/assets/img/lupa.png"/>
                <label text="Советский" />
            </FlexboxLayout> -->
            <FlexboxLayout class="weather-temperature"  flexDirection="column">
                <FlexboxLayout class="temper-data" flexDirection="row">
                    <label class="label-temp" text="6"/>
                    <image class="img-temp-main" src="~/assets/img/temp.png" />
                </FlexboxLayout>

                <FlexboxLayout flexDirection="row">
                    <image class="img-sun-main" src="~/assets/img/sun.png" />
                    <FlexboxLayout class="pos-self-temp" flexDirection="column">
                        <label text="Ясно" />
                        <FlexboxLayout class="temp-self" flexDirection="row">
                            <label text="Ощущается как 3"/>
                            <image src="~/assets/img/temp.png" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>
                
                
                <FlexboxLayout class="weather-data" flexDirection="row">
                    <FlexboxLayout flexDirection="row">
                        <image class="image-data" src="~/assets/img/wnd.png" />
                        <label text=" 1.9 м/c"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="row">
                        <image class="image-data" src="~/assets/img/hm.png" />
                        <label text=" 47%"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="row">
                        <image class="image-data" src="~/assets/img/prs.png" />
                        <label text=" 763 мм рт. ст."/>
                    </FlexboxLayout>
                </FlexboxLayout>
             </FlexboxLayout>
        
            <FlexboxLayout flexDirection="column" class="weather-for-days">
                <FlexboxLayout class="label-days" flexDirection="row">
                    <label text="Прогноз на 10 дней"/>
                    <label text="Подробнее ▶" />
                </FlexboxLayout>
                <!-- этот блок потом обернуть в цикл -->
                <FlexboxLayout class="weather-three" flexDirection="row">
                    <label text="Сегодня Ясно"/>
                    <label text="6 / -4" />
                </FlexboxLayout>
                <FlexboxLayout class="weather-three" flexDirection="row">
                    <label text="Завтра Облачно"/>
                    <label text="10 / -4" />
                </FlexboxLayout>
                <FlexboxLayout class="weather-three" flexDirection="row">
                    <label text="Ср Облачно"/>
                    <label text="19 / 8" />
                </FlexboxLayout>
                <button class="button-for-days" text="Прогноз на 10 дней" @tap="goToTest" />
            </FlexboxLayout>
        </FlexboxLayout>

    </Page>
</template>

<script>
import Days from './Days.vue'
import Test from './Test.vue'
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

        goToTest(){
            this.$navigateTo(Test);
        },

        goToWeather(){
            this.$navigateTo(Days);
        },


        waetherIcon(weatherId) {
            if (weatherId >= 200 && weatherId <= 232) {
                return "https://openweathermap.org/img/wn/11d@2x.png";
            }
            else if ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 520 && weatherId <= 531)) {
                return "https://openweathermap.org/img/wn/09d@2x.png";
            }
            else if (weatherId >= 500 && weatherId <= 504) {
                return "https://openweathermap.org/img/wn/10d@2x.png";
            }
            else if (weatherId >= 600 && weatherId <= 622) {
                return "https://openweathermap.org/img/wn/13d@2x.png";
            }
            else if (weatherId >= 700 && weatherId <= 781) {
                return "https://openweathermap.org/img/wn/50d@2x.png";
            }
            else if (weatherId == 800) {
                return "https://openweathermap.org/img/wn/01d@2x.png";
            }
            else if (weatherId == 801) {
                return "https://openweathermap.org/img/wn/02d@2x.png";
            }
            else if (weatherId == 802) {
                return "https://openweathermap.org/img/wn/03d@2x.png";
            }
            else if (weatherId == 803) {
                return "https://openweathermap.org/img/wn/04d@2x.png";
            }
            else if (weatherId == 804) {
                return "https://openweathermap.org/img/wn/04d@2x.png";
            }
        },
        calcTime(offset) {
            d = new Date();
            utc = d.getTime() + (d.getTimezoneOffset() * 60000);
            nd = new Date(utc + (3600000 * offset));
            return nd;
        },
        toUpperCaseFirst(str) {
            if (!str)
                return str;
            else
                return str[0].toUpperCase() + str.slice(1);
        },
        sendAjax(url) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "json";
                xhr.addEventListener("load", () => {
                    resolve(xhr.response);
                });
                xhr.addEventListener("error", () => {
                    reject();
                });
                xhr.send();
            });
        }
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
