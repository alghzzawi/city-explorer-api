import React from 'react';

class weather extends React.Component{

    render(){
        return(
            this.props.weather.map((day, index)=>(
                <div key={index}>
                    <p>day: {day.date}</p>
                    <p>description: {day.description} </p>
                </div>
            ))
        )
    }

}

export default weather;