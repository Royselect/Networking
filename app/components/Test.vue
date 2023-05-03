<template>
    <Page>
        <ActionBar flat="true">
            <NavigationButton text="Назад" android.systemIcon="ic_menu_back" @tap="backHome"/>
            <label class="label-change" text="Прогноз на 5 дней" />
        </ActionBar>
        <FlexboxLayout flexDirection="column">
            <template>

                <FlexboxLayout class="weather-for-days-data" flexDirection="row">
                    <FlexboxLayout class="weather-three-data" flexDirection="row">
                        <label :text="dayOne"/>
                        <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                            <FlexboxLayout class="days" flexDirection="row">
                                <label :text="tempDayOne" />
                                <label text=" / "/>
                                <label :text="tempNightOne"/>
                            </FlexboxLayout>
                            <FlexboxLayout class="div-img-day" flexDirection="column">
                                <image class="img-day" :src="iconOne"/>
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>

                <FlexboxLayout class="weather-for-days-data" flexDirection="row">
                    <FlexboxLayout class="weather-three-data" flexDirection="row">
                        <label :text="dayTwo"/>
                        <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                            <FlexboxLayout class="days" flexDirection="row">
                                <label :text="tempDayTwo" />
                                <label text=" / "/>
                                <label :text="tempNightTwo"/>
                            </FlexboxLayout>
                            <FlexboxLayout class="div-img-day" flexDirection="column">
                                <image class="img-day" :src="iconTwo"/>
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>

                <FlexboxLayout class="weather-for-days-data" flexDirection="row">
                    <FlexboxLayout class="weather-three-data" flexDirection="row">
                        <label :text="dayThree"/>
                        <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                            <FlexboxLayout class="days" flexDirection="row">
                                <label :text="tempDayThree" />
                                <label text=" / "/>
                                <label :text="tempNightThree"/>
                            </FlexboxLayout>
                            <FlexboxLayout class="div-img-day" flexDirection="column">
                                <image class="img-day" :src="iconThree"/>
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>

                <FlexboxLayout class="weather-for-days-data" flexDirection="row">
                    <FlexboxLayout class="weather-three-data" flexDirection="row">
                        <label :text="dayFour"/>
                        <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                            <FlexboxLayout class="days" flexDirection="row">
                                <label :text="tempDayFour" />
                                <label text=" / "/>
                                <label :text="tempNightFour"/>
                            </FlexboxLayout>
                            <FlexboxLayout class="div-img-day" flexDirection="column">
                                <image class="img-day" :src="iconFour"/>
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>

                <FlexboxLayout class="weather-for-days-data" flexDirection="row">
                    <FlexboxLayout class="weather-three-data" flexDirection="row">
                        <label :text="dayFive"/>
                        <FlexboxLayout flexDirection="row" class="weather-one-day"> 
                            <FlexboxLayout class="days" flexDirection="row">
                                <label :text="tempDayFive" />
                                <label text=" / "/>
                                <label :text="tempNightThree"/>
                            </FlexboxLayout>
                            <FlexboxLayout class="div-img-day" flexDirection="column">
                                <image class="img-day" :src="iconFive"/>
                            </FlexboxLayout>
                        </FlexboxLayout>
                    </FlexboxLayout>
                </FlexboxLayout>

            </template>
        </FlexboxLayout>
    </Page>
</template>

<script>
import { Http } from '@nativescript/core';
  export default {
    props: ["datalat", "datalon"],
    data() {
        return {
            day: "",
            icon: "",
            days: "",
            weatherData: "",
            weatherOne: "",
            weatherTwo: "",
            weatherThree: "",
            weatherFour: "",
            weatherFive: "",
            iconOne: "",
            iconTwo: "",
            iconThree: "",
            iconFour: "",
            iconFive: "",
            time: "",
            test: "",
            lat: "",
            lon: "",
            dayOne: "",
            tempDayOne: "",
            tempNightOne: "",
            dayTwo: "",
            tempDayTwo: "",
            tempNightTwo: "",
            dayThree: "",
            tempDayThree: "",
            tempNightThree: "",
            dayFour: "",
            tempDayFour: "",
            tempNightFour: "",
            dayFive: "",
            tempDayFive: "",
            tempNightFive: "",
            monthesForNow: ["Января ", "Февраля ", "Марта ", "Апреля ", "Мая ", "Июня ", "Июля ", "Августа ", "Сентября ", "Октября ", "Ноября ", "Декабря "],
        };
    },
    mounted() {
        this.lat = this.datalat;
        this.lon = this.datalon;
        this.getData();
    },
    methods: {
        backHome() {
            this.$navigateBack();
        },
        getData() {
            Http.getJSON(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=f1a0e5088a469f8b87ed28cc9e572a55`).then(result => {
                this.weatherData = result["list"];
                let todaydata = new Date(); // сегодняшняя дата
                let today = todaydata.getDate(); // сегодняшний день
                for (let i = 0; i < this.weatherData.length; i++) {
                    let data = new Date(this.weatherData[i]["dt_txt"]);
                    let tomorowDay = data.getDate(); //завтрашний день
                    if ((tomorowDay - today) == 0) { // 1 день
                        let day = data.getDate();
                        let month = data.getMonth();
                        if ((data.getHours() - todaydata.getHours()) <= 3) {
                            for (let i = 0; i < this.monthesForNow.length; i++) {
                                if (i == month) {
                                    this.dayOne = `${day} ${this.monthesForNow[i]}`;
                                }
                            }
                            this.tempDayOne = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            this.weatherOne = this.weatherData[i]["weather"][0]["main"];
                            this.iconOne = this.waetherIcon(this.weatherData[i]["weather"][0]["id"]);
                        }
                    }
                    if ((tomorowDay - today) == 1) { //если нашли "завтра", то начинаем искать ночное время. Возьмем 3 часа ночи 
                        let hour = data.getHours();
                        if (hour == 3) {
                            this.tempNightOne = Math.floor(this.weatherData[i]["main"]["temp"]) - 273; // ночная темпа этого дня
                        }
                        if (hour == 15) {
                            let day = data.getDate();
                            let month = data.getMonth();
                            for (let i = 0; i < this.monthesForNow.length; i++) {
                                if (i == month) {
                                    this.dayTwo = `${day} ${this.monthesForNow[i]}`;
                                }
                            }
                            this.tempDayTwo = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            this.weatherTwo = this.weatherData[i]["weather"][0]["main"];
                            this.iconTwo = this.waetherIcon(this.weatherData[i]["weather"][0]["id"]);
                        }
                    }
                    if ((tomorowDay - today) == 2) { //ночная температура завтрашнего дня и 3 день
                        let hour = data.getHours();
                        if (hour == 3) {
                            this.tempNightTwo = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                        }
                        if (hour == 15) {
                            let day = data.getDate();
                            let month = data.getMonth();
                            for (let i = 0; i < this.monthesForNow.length; i++) {
                                if (i == month) {
                                    this.dayThree = `${day} ${this.monthesForNow[i]}`;
                                }
                            }
                            this.tempDayThree = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            this.weatherThree = this.weatherData[i]["weather"][0]["main"];
                            this.iconThree = this.waetherIcon(this.weatherData[i]["weather"][0]["id"]);
                        }
                    }
                    if ((tomorowDay - today) == 3) {
                        let hour = data.getHours();
                        if (hour == 3) {
                            this.tempNightThree = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                        }
                        if (hour == 15) {
                            let day = data.getDate();
                            let month = data.getMonth();
                            for (let i = 0; i < this.monthesForNow.length; i++) {
                                if (i == month) {
                                    this.dayFour = `${day} ${this.monthesForNow[i]}`;
                                }
                            }
                            this.tempDayFour = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            this.weatherFour = this.weatherData[i]["weather"][0]["main"];
                            this.iconFour = this.waetherIcon(this.weatherData[i]["weather"][0]["id"]);
                        }
                    }
                    if ((tomorowDay - today) == 4) {
                        let hour = data.getHours();
                        if (hour == 3) {
                            this.tempNightFour = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                        }
                        if (hour == 15) {
                            let day = data.getDate();
                            let month = data.getMonth();
                            for (let i = 0; i < this.monthesForNow.length; i++) {
                                if (i == month) {
                                    this.dayFive = `${day} ${this.monthesForNow[i]}`;
                                }
                            }
                            this.tempDayFive = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                            this.weatherFive = this.weatherData[i]["weather"][0]["main"];
                            this.iconFive = this.waetherIcon(this.weatherData[i]["weather"][0]["id"]);
                        }
                    }
                    if ((tomorowDay - today) == 5) {
                        let hour = data.getHours();
                        if (hour == 0) {
                            this.tempNightFive = Math.floor(this.weatherData[i]["main"]["temp"]) - 273;
                        }
                    }
                }
            }).catch(error => {
                this.test = error;
            });
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
