<script>
  import Page from '$lib/Page.svelte';
  import cloudy from '$lib/assets/cloudy.svg';
  import partlyCloudy from '$lib/assets/partly-cloudy.svg';
  import rainy from '$lib/assets/rainy.svg';
  import sunny from '$lib/assets/sunny.svg';
  import snowy from '$lib/assets/snowy.svg';
  import stormy from '$lib/assets/stormy.svg';

  import { onMount } from 'svelte';

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

  onMount(async () => {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&timezone=auto'
    );

    const data = await res.json();
    let i = 0;

    while (i < 7) {
      map[data.daily.time[i]] = {
        date: data.daily.time[i].split('-')[2],
        weather: getWeatherByCode(data.daily.weathercode[i]),
        precipitation: data.daily.precipitation_sum[i],
        temperatureMax: data.daily.temperature_2m_max[i],
        temperatureMin: data.daily.temperature_2m_min[i]
      };

      i++;
    }
  });
</script>

<Page background="#E9F5FA">
  <div class="container" slot="content">
    {#each Object.keys(map) as day}
      <div>
        <p class="date">{map[day].date}</p>
        <div class="info-container" style="--background: {map[day].weather.background}">
          <img src={map[day].weather.icon} alt="Weather icon" class="weather-icon" />
          <p class="temp-max" style="--color: {map[day].weather.temperatureText}">
            {map[day].temperatureMax.toFixed(0)}
          </p>
          <p class="prec" style="--color: {map[day].weather.contentText}">
            {map[day].precipitation.toFixed(1)}
          </p>
          <p class="temp-min" style="--color: {map[day].weather.contentText}">
            {map[day].temperatureMin.toFixed(0)}
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

  .container > div {
    flex: 1;
    min-width: 0;
  }

  .info-container {
    position: relative;
    background: var(--background);

    border-radius: 12px;

    padding: 8px;
    padding-top: 64px;
  }

  .date {
    color: #4db0d3;
  }

  .weather-icon {
    position: absolute;
    width: 64px;
    height: 64px;
    top: 5%;
    left: -25%;
    background: transparent;
  }

  .temp-max,
  .prec,
  .temp-min {
    color: var(--color);
  }

  .temp-max {
    font-family: 'Oswald', sans-serif;
    font-size: 24px;
  }

  .prec,
  .temp-min {
    font-size: 10px;
  }

  @media screen and (min-width: 768px) {
    .container {
      gap: 24px;
    }

    .info-container {
      padding: 32px;
      padding-top: 150px;
      border-radius: 40px;
    }

    .weather-icon {
      width: 180px;
      height: 180px;
    }

    .temp-max {
      font-size: 72px;
    }

    .prec,
    .temp-min {
      font-size: 12px;
    }
  }
</style>
