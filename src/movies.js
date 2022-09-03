import React from 'react';
import './App.css'

class weather extends React.Component{

    render(){
        return(
            this.props.movies.map((day, index)=>(
                <div id='labmovie' key={index}>
                    <img src={day.poster_path} alt={day.title} />

                    <section className='section'>
                        <span>Movie name: </span>
                        <span> {day.title} </span>
                    </section>
                    <section className='section-Overview'>
                        <span>Overview: </span>
                        <span> {day.overview} </span>
                    </section>
                    <section className='section'>
                        <span>Release date: </span>
                        <span> {day.release_date} </span>
                    </section>
                    <section className='section'>
                        <span>Average Votes: </span>
                        <span> {day.vote_average} </span>
                    </section>
                    <section className='section'>
                        <span>Total Votes: </span>
                        <span> {day.vote_count} </span>
                    </section>
                    <section className='section'>
                        <span>Popularity:</span>
                        <span> {day.popularity} </span>
                    </section>
                </div>
            ))
        )
    }

}

export default weather;