import React from "react";
import axios from "axios";
import Weather from "./weather";
import Movies from "./movies";
import "./App.css";

class APP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherdata: [],
      timezone: "",
      latQuery: 0,
      lonQuery: 0,
      cityName: "",
      countryCode: "",
      moviesData: [],
    };
  }

  getweatherData = async (e) => {
    e.preventDefault();
    const latQuery = e.target.lat.value;
    const lonQuery = e.target.lon.value;

    this.weatherCity(latQuery, lonQuery);
  };
  weatherCity = async (latQuery, lonQuery) => {
    const url = `http://localhost:3050/weather_alghzawi_explorer`;

    try {
      const weather = await axios.get(url, {
        params: { lat: latQuery, lon: lonQuery },
      });
      this.setState({
        weatherdata: weather.data,
        latQuery: latQuery,
        lonQuery: lonQuery,
      });
    } catch {
      //error
      console.log("erorr");
    }

    // this lines for cityName, timezone and countryCode
    const urlCityData = `http://api.weatherbit.io/v2.0/forecast/daily?key=3fbdf4a4a1af47749141c6573177005a`;

    const cityData = await axios.get(urlCityData, {
      params: { lat: latQuery, lon: lonQuery },
    });
    this.setState({
      cityName: cityData.data.city_name,
      timezone: cityData.data.timezone,
      countryCode: cityData.data.country_code,
    });
    this.getMovieData(cityData.data.city_name);
  }; /////////////////////

  getweatherDataByCityName = async (e) => {
    e.preventDefault();
    const cityQuery = e.target.city.value;

    this.weatherByCityName(cityQuery);
  };
  weatherByCityName = async (cityQuery) => {
    const URL = `http://localhost:3050/weathercity_alghzawi_explorer`;

    try {
      const weather = await axios.get(URL, {
        params: { cityQuery: cityQuery },
      });

      this.setState({
        weatherdata: weather.data,
        cityQuery: cityQuery,
      });
    } catch {
      console.log("erorr by city");
    }
    // this lines for cityName, timezone and countryCode
    const urlCityData = `http://api.weatherbit.io/v2.0/forecast/daily?key=3fbdf4a4a1af47749141c6573177005a`;
    const cityData = await axios.get(urlCityData, {
      params: { city: cityQuery },
    });

    this.setState({
      timezone: cityData.data.timezone,
      countryCode: cityData.data.country_code,
      latQuery: cityData.data.lat,
      lonQuery: cityData.data.lon,
      cityName: cityData.data.city_name,
    });
    this.getMovieData(cityQuery);
  };

  getMovieData = async (cityQuery) => {
    const url = `http://localhost:3050/movies_alghzawi_explorer`;
    try {
      const movieData = await axios.get(url, { params: { query: cityQuery } });
      this.setState({
        moviesData: movieData.data,
      });
    } catch {
      console.log("erorr by movies");
    }
  };

  render() {
    return (
      <div>
        <section id="weather">
          <h1>weather state</h1>
          <form id="form" onSubmit={this.getweatherData}>
            <label for="fname">Enter city latitude and longitude</label>
            <br />
            <input type="text" name="lat" placeholder="Enter city latitude" />
            <input type="text" name="lon" placeholder="Enter city longitude" />
            <br />
            <button type="submit">Get weather</button>
          </form>
          <form onSubmit={this.getweatherDataByCityName} id="form">
            <label for="fname">OR</label>
            <br />
            <label for="fname">enter city name</label>
            <br />
            <input type="text" name="city" placeholder="Enter city namr" />
            <br />
            <button type="submit">Get weather</button>
          </form>

          <h1>
            Weather state in {this.state.cityName}, {this.state.timezone} (
            {this.state.countryCode}){" "}
          </h1>
          <p>
            <span>latitude= {this.state.latQuery} </span>
            <span>, longitude= {this.state.lonQuery} </span>
          </p>
          <img
            alt={this.state.cityName}
            src={`https://maps.locationiq.com/v3/staticmap?key=pk.1ed11f75d75e6a8c33f7c8e4afae6908&center=${this.state.latQuery},${this.state.lonQuery}`}
          />
          <div id="dateData">
            <h4>wether state in {this.state.cityName} for 16 day</h4>
            <div id="data">
              <Weather weather={this.state.weatherdata} />
            </div>
          </div>
        </section>
        <section>
          <div id="MovesData">
            <h4>Movies that published in {this.state.cityName} </h4>
            <div id="MoveData">
              <Movies movies={this.state.moviesData} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default APP;
