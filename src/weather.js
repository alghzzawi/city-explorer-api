import React from 'react';
import './App.css'

class weather extends React.Component{

    render(){
        return(
            this.props.weather.map((day, index)=>(
                <div id='labData' key={index}>
                    <p>day: {day.date}</p>
                    <p>description: {day.description} </p>
                    <p>low_temp: {day.low_temp} </p>
                    <p>max_temp: {day.max_temp}</p>
                    
                </div>
            ))
        )
    }

}

export default weather;