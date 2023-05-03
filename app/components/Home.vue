<template>
    <Page>
        <ActionBar flat="true">
            <label class="name-app" text="SkyTracker"/>
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <!-- <SearchBar class="search-bar" hint="Населенный пункт" :text="searchData" @submit="onSubmit"/> -->
            <FlexboxLayout class="button-change-pos" flexDirection="row">
                <button @tap="goToChange" class="button-change-city" text="Выбрать город" />
            </FlexboxLayout>
            <FlexboxLayout class="weather-temperature"  flexDirection="column">
                <FlexboxLayout class="temper-data" flexDirection="row">
                    <label class="label-temp" :text="this.temp"/>
                    <image class="img-temp-main" src="~/assets/img/temp.png" />
                </FlexboxLayout>

                <FlexboxLayout flexDirection="row">
                    <image class="img-sun-main" :src="iconWeather" />
                    <FlexboxLayout class="pos-self-temp" flexDirection="column">
                        <label :text="dataName" style="font-size: 18px;"/>
                        <label :text="weather" />
                        <FlexboxLayout class="temp-self" flexDirection="row">
                            <label text="Ощущается как "/>
                            <label :text="feelsLike" />
                            <image src="~/assets/img/temp.png" />
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>
                
                
                <FlexboxLayout class="weather-data" flexDirection="row">
                    <FlexboxLayout flexDirection="row">
                        <image class="image-data" src="~/assets/img/wnd.png" />
                        <label :text="windSpeed"/>
                        <label text=" м/c" />
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="row">
                        <image class="image-data" src="~/assets/img/hm.png" />
                        <label :text="humidity"/>
                        <label text="%"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="row">
                        <image class="image-data" src="~/assets/img/prs.png" />
                        <label :text="pressure"/>
                        <label text=" мм рт. ст." />
                    </FlexboxLayout>
                </FlexboxLayout>
             </FlexboxLayout>
        
            <FlexboxLayout flexDirection="column" class="weather-for-days">
                <FlexboxLayout class="label-days" flexDirection="row">
                    <label text="Прогноз на 10 дней"/>
                    <label text="Подробнее ▶" />
                </FlexboxLayout>
                <FlexboxLayout class="weather-three" flexDirection="row">
                    <FlexboxLayout flexDirection="row">
                        <label text="Сегодня "/>
                        <label :text="weather"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="row">
                        <label :text="temp"/>
                        <label text=" / "/>
                        <!-- тут ночную темпу указать -->
                        <label :text="tempNight" />
                    </FlexboxLayout>
                </FlexboxLayout>
                <FlexboxLayout class="weather-three" flexDirection="row">
                    <FlexboxLayout flexDirection="row">
                        <label text="Завтра "/>
                        <label :text="weatherTomorow"/>
                    </FlexboxLayout>
                    <FlexboxLayout flexDirection="row">
                        <label :text="tempTomorow"/>
                        <label text=" / "/>
                        <label :text="tempTomorowNight" />
                    </FlexboxLayout>
                </FlexboxLayout>
                <!-- <FlexboxLayout class="weather-three" flexDirection="row">
                    <label :text="searchData"/>
                    <label text="19 / 8" />
                </FlexboxLayout> -->
                <button class="button-for-days" text="Прогноз на 5 дней" @tap="goToTest" />
            </FlexboxLayout>
        </FlexboxLayout>

    </Page>
</template>

<script>
// var apiKey = 'f1a0e5088a469f8b87ed28cc9e572a55';
// var cityDefault = 'Khanty-Mansiysk';
//import Days from './Days.vue'
import { Http } from '@nativescript/core';
import Test from './Test.vue'
import Change from './Change.vue'
//import * as ApplicationSettings from '@nativescript/core/application-settings';
  export default {
    props: ["cityNew"],
    data() {
        return {
            index: "",
            weatherData: "?",
            searchData: "",
            geoData: "",
            city: "",
            temp: "",
            tempNight: "",
            weather: "",
            indexWeather: "",
            feelsLike: "",
            windSpeed: "",
            humidity: "",
            pressure: "",
            lat: "",
            lon: "",
            dataName: "!",
            tomorowDate: "",
            tomorowTime: "",
            tempTomorow: "",
            weatherTomorow: "",
            tempTomorowNight: "",
            iconWeather: "",
            days: ["Вск", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        };
    },
    mounted() {
        this.city = this.cityNew;
        this.getGeo();
    },
    methods: {
        getGeo() {
            Http.getJSON(`https://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=5&appid=f1a0e5088a469f8b87ed28cc9e572a55&lang=ru`).then(result => {
                if (result.length == 1) {
                    this.index = 0;
                }
                else {
                    for (let i = 0; i < result.length; i++) {
                        if (result[i]["name"] == this.city) {
                            this.index = i;
                            break;
                        }
                        else if (result[0]["local_names"]["ru"] == this.city) {
                            this.index = i;
                            break;
                        }
                    }
                }
                this.geoData = result[this.index];
                this.dataName = this.geoData["local_names"]["ru"];
                this.lat = this.geoData["lat"];
                this.lon = this.geoData["lon"];
                this.getWeather();
            }).catch(error => {
                this.weather = error;
            });
        },
        getWeather() {
            Http.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=f1a0e5088a469f8b87ed28cc9e572a55`).then(result => {
                this.weatherData = result;
                this.temp = Math.floor(this.weatherData["main"]["temp"]) - 273;
                this.weather = this.weatherData["weather"][0]["main"];
                this.feelsLike = Math.floor(this.weatherData["main"]["feels_like"]) - 273;
                this.windSpeed = this.weatherData["wind"]["speed"];
                this.humidity = this.weatherData["main"]["humidity"];
                this.pressure = this.weatherData["main"]["pressure"];
                this.iconWeather = this.waetherIcon(this.weatherData["weather"][0]["id"]);
                this.getWeatherTomorow();
            }).catch(error => {
                this.weather = error;
            });
        },
        getWeatherTomorow() {
            Http.getJSON(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=f1a0e5088a469f8b87ed28cc9e572a55`).then(result => {
                this.weatherData = result["list"];
                for(let i = 0; i < this.weatherData.length; i++){ //Поиск завтрашнего дня
                    let data = new Date(this.weatherData[i]["dt_txt"]);
                    let tomorowDay = data.getDate(); //завтрашний день
                    let todaydata = new Date(); // сегодняшняя дата
                    let today = todaydata.getDate(); // сегодняшний день
                    if((tomorowDay - today) == 1){ //если нашли "завтра", то начинаем искать ночное время. Возьмем 3 часа ночи 
                        let hour = data.getHours();
                        if(hour == 3){
                            //this.tomorowTime = i;
                            this.tempNight = Math.floor(this.weatherData[i]["main"]["temp"]) -273; // ночная темпа этого дня
                        }
                        if(hour == 15){
                            this.tempTomorow = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            this.weatherTomorow = this.weatherData[i]["weather"][0]["main"];
                        }

                    }
                    if((tomorowDay - today) == 2){ //ночная температура завтрашнего дня
                        let hour = data.getHours();
                        if(hour == 3){
                            this.tempTomorowNight = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            break;
                        }
                    }
                }

            }).catch(error => {
                this.weather = error;
            });
        },
        goToTest() {
            this.$navigateTo(Test);
        },
        goToChange() {
            this.$navigateTo(Change);
        },
        // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=f1a0e5088a469f8b87ed28cc9e572a55
        // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=f1a0e5088a469f8b87ed28cc9e572a55
        // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
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
        // calcTime(offset) {
        //     d = new Date();
        //     utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        //     nd = new Date(utc + (3600000 * offset));
        //     return nd;
        // },
        // toUpperCaseFirst(str) {
        //     if (!str)
        //         return str;
        //     else
        //         return str[0].toUpperCase() + str.slice(1);
        // },
        // sendAjax(url) {
        //     return new Promise((resolve, reject) => {
        //         let xhr = new XMLHttpRequest();
        //         xhr.open("GET", url);
        //         xhr.responseType = "json";
        //         xhr.addEventListener("load", () => {
        //             resolve(xhr.response);
        //         });
        //         xhr.addEventListener("error", () => {
        //             reject();
        //         });
        //         xhr.send();
        //     });
        // }
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
