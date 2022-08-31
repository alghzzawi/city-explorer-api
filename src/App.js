import React from 'react'
import axios from 'axios';
import Weather from './weather';
import weatherData from './weather.json';
class APP extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      timezone:'',
      searchQuery:'',
      weather:[],
      latLoc:0,
      lonLoc:0
    }
  }

  getweatherData = async (e) =>{
    e.preventDefault();
    const searchQuery = e.target.cityName.value;

    // const url = `http://localhost:3000/weather?searchQuery=${searchQuery}`
    // try{
    //   const server = await axios.get(url);
    //   // console.log(server.data.city_name)
    //   // console.log(server.data.lat)
    //   this.setState ({
    //     searchQuery : server.data.city_name,
    //     latLoc : server.data.lat,
    //     lonLoc : server.data.lon,
    //     timezone: server.data.timezone,
    //     countryCode : server.data.country_code
    //   })
      
    // }catch{
      
    // }
    
    // console.log(searchQuery, this.state.latLoc, this.state.lonLoc);
    this.weatherCity(this.state.latLoc, this.state.lonLoc,searchQuery);
  };
  weatherCity = async (lat, lon,searchQuery) => {
    const url = `http://localhost:3000/weather?searchQuery=${searchQuery}`
    // console.log(this.state.searchQuery, lat,lon);
    try{
      const weather = await axios.get(url,'Data',{params:{lat:lat, lon:lon}})
      console.log(weather.data)
      this.setState({
        weather: weather.data
      }); 
    }catch{
      //error
      console.log('erorr');
    }
    weatherData.find(item=>{
      if(searchQuery.toLowerCase() === item.city_name.toLowerCase()){
        this.setState({
          latLoc:item.lat,
          lonLoc:item.lon,
          searchQuery:searchQuery,
          timezone:item.timezone,
          countryCode:item.country_code
        })
      }
    })

  };
  

  render(){
    return(
      <div>

        <form onSubmit={this.getweatherData}>
          <input type="text" name="cityName" placeholder='Enter city name'/>
          <button type='submit'>Get Data</button>
          <p>latLoc= {this.state.latLoc}</p>
          <p>lonLoc= {this.state.lonLoc}</p>
        </form>
        <h1>Weather state in {this.state.searchQuery}, {this.state.timezone} ({this.state.countryCode}) </h1>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.1ed11f75d75e6a8c33f7c8e4afae6908&center=${this.state.latLoc},${this.state.lonLoc}`} />
        <div>
        <Weather weather={this.state.weather}  />
        </div>
      </div>
    )
  }
}
export default APP;
