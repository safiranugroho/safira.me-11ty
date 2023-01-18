<script>
  import Page from '$lib/Page.svelte';

  import cloudy from '$lib/assets/cloudy.svg';
  import partlyCloudy from '$lib/assets/partly-cloudy.svg';
  import rainy from '$lib/assets/rainy.svg';
  import sunny from '$lib/assets/sunny.svg';
  import snowy from '$lib/assets/snowy.svg';
  import stormy from '$lib/assets/stormy.svg';

  import PrecipitationIcon from '$lib/assets/precipitation.svelte';
  import TemperatureIcon from '$lib/assets/temperature.svelte';

  import { onMount } from 'svelte';

  const weekday = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  /** @type {Record<string, any>} */
  $: map = {};
  const getWeatherByCode = (/** @type {string} */ code) => {
    console.log({ code });
    switch (code.toString()) {
      case '0':
        return {
          background: '#E6DF95',
          icon: sunny,
          temperatureText: '#4DB0D3',
          contentText: '#247490'
        };
      case '1':
      case '2':
      case '3':
      case '45':
      case '48':
        return {
          background: '#4DB0D3',
          icon: partlyCloudy,
          temperatureText: '#E6DF95',
          contentText: '#D3EBF4'
        };
      case '51':
      case '53':
      case '55':
      case '56':
      case '57':
        return {
          background: '#4DB0D3',
          icon: cloudy,
          temperatureText: '#E6DF95',
          contentText: '#D3EBF4'
        };
      case '61':
      case '63':
      case '65':
      case '66':
      case '67':
      case '80':
      case '81':
      case '82':
        return {
          background: '#2B8BAD',
          icon: rainy,
          temperatureText: '#E6DF95',
          contentText: '#D3EBF4'
        };
      case '71':
      case '73':
      case '75':
      case '77':
      case '85':
      case '86':
        return {
          background: '#BCE1EF',
          icon: snowy,
          temperatureText: '#0E2E3A',
          contentText: '#247490'
        };
      case '95':
      case '96':
      case '99':
        return {
          background: '#0E2E3A',
          icon: stormy,
          temperatureText: '#E6DF95',
          contentText: '#D3EBF4'
        };
    }
  };

  onMount(() => {
    navigator.geolocation.getCurrentPosition(
      async (/** @type {{ coords: { latitude: any; longitude: any; }; }} */ position) => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto`
        );

        const data = await res.json();
        let i = 0;

        while (i < 7) {
          map[data.daily.time[i]] = {
            day: weekday[new Date(data.daily.time[i]).getDay()],
            date: data.daily.time[i].split('-')[2],
            weather: getWeatherByCode(data.daily.weathercode[i]),
            precipitation: data.daily.precipitation_sum[i],
            temperatureMax: data.daily.temperature_2m_max[i],
            temperatureMin: data.daily.temperature_2m_min[i]
          };

          i++;
        }
      }
    );
  });
</script>

<Page background="#E9F5FA">
  <div class="container" slot="content">
    {#each Object.keys(map) as day}
      <div class="date-container">
        <p class="day">{map[day].day}</p>
        <p class="date">{map[day].date}</p>
        <div class="info-container" style="--background: {map[day].weather.background}">
          <img src={map[day].weather.icon} alt="Weather icon" class="weather-icon" />
          <p class="temp-max" style="--color: {map[day].weather.temperatureText}">
            {map[day].temperatureMax.toFixed(0)}<span class="degree">°</span>
          </p>
          <p class="prec" style="--color: {map[day].weather.contentText}">
            <PrecipitationIcon /><span
              >{map[day].precipitation.toFixed(0)} <span class="unit">mm</span></span
            >
          </p>
          <p class="temp-min" style="--color: {map[day].weather.contentText}">
            <TemperatureIcon /><span
              >{map[day].temperatureMin.toFixed(0)}<span class="degree">°</span></span
            >
          </p>
        </div>
      </div>
    {/each}
  </div>
</Page>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Krona+One&family=Oswald&display=swap');

  .container {
    font-family: 'Krona One', sans-serif;

    display: flex;
    gap: 12px;

    text-align: center;
  }

  .date-container {
    flex: 1;
    min-width: 0;
  }

  .info-container {
    position: relative;
    background: var(--background);

    border-radius: 12px;

    margin-top: 8px;
    padding-top: 64px;
    padding-bottom: 8px;
  }

  .day,
  .date {
    color: #4db0d3;
    margin: 0;
  }

  .day {
    font-size: 10px;
    letter-spacing: 0.2em;
  }

  .date {
    font-size: 24px;
  }

  .weather-icon {
    position: absolute;
    width: 72px;
    height: 72px;
    top: 5%;
    left: -10%;

    background: transparent;
  }

  .temp-max,
  .prec,
  .temp-min {
    color: var(--color);
  }

  .temp-max {
    margin: 16px;
    font-family: 'Oswald', sans-serif;
    font-size: 30px;
  }

  .temp-max > .degree {
    font-size: 20px;
    vertical-align: super;
  }

  .prec,
  .temp-min {
    padding: 0 12px;
    margin: 2px 0;

    font-size: 8px;
    line-height: 8px;

    display: grid;
    grid-template-columns: 1fr 3fr;

    text-align: left;
  }

  .unit {
    font-size: 0.75em;
  }

  :global(.prec > svg),
  :global(.temp-min > svg) {
    width: 8px;
    height: 8px;
    margin-right: 4px;
  }

  @media screen and (min-width: 768px) {
    .container {
      gap: 24px;
    }

    .day {
      font-size: 20px;
      letter-spacing: 0.2em;
    }

    .date {
      font-size: 56px;
    }

    .info-container {
      margin-top: 16px;
      padding-top: 180px;
      padding-bottom: 24px;

      border-radius: 40px;

      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 20px rgba(32, 77, 92, 0.7);
    }

    .weather-icon {
      width: 180px;
      height: 180px;
    }

    .temp-max {
      font-size: 90px;
    }

    .temp-max > .degree {
      font-size: 48px;
      vertical-align: super;
    }

    .prec,
    .temp-min {
      padding: 0 24px;
      margin: 8px 0;

      font-size: 16px;
      line-height: 18px;
    }

    :global(.prec > svg),
    :global(.temp-min > svg) {
      width: 18px;
      height: 18px;
      margin-right: 8px;
    }
  }

  @media screen and (min-width: 1024px) {
    .prec,
    .temp-min {
      padding: 0 40px;

      grid-template-columns: 1fr 2fr;
    }
  }
</style>
