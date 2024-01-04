import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

const NewJokeList = ({numJokes=5}) => {
  const [isLoading, setIsLoading] = useState(true);

  // jokes : [{id,text,votes}...]
  const [jokes, setJokes] = useState([]);
  const [seenJokes, setSeenJokes] = useState(new Set());
  
  useEffect(()=>{
    if(jokes.length==0){
        const getJokesWithAxios = async()=>{
            let newJokes =[];
            while (newJokes.length < numJokes ) {
                let res = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                  });
                
                let joke  = {id: res.data.id, joke:res.data.joke};
                if (!seenJokes.has(joke.id)) {
                  newJokes=[...newJokes, { ...joke, votes: 0 }];
                  setSeenJokes(()=> new Set(seenJokes.add(joke.id)));
                  
                } else {
                  console.log("duplicate found!");
                }

              }
            
            setJokes(()=>newJokes)
            setIsLoading(()=>false)
        }
        getJokesWithAxios()

    }
  },[jokes])

  const generateNewJokes = ()=>{
    setIsLoading(()=>true)
    setJokes(()=>[])
  }

  const vote= ( id, delta)=> {
    setJokes( ()=> jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ).sort((a, b) => b.votes - a.votes)
    )
  }

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
    <button
      className="JokeList-getmore"
      onClick={generateNewJokes}
    >
      Get New Jokes
    </button>

    {jokes.map(j => (
      <Joke
        text={j.joke}
        key={j.id}
        id={j.id}
        votes={j.votes}
        vote={vote}
      />
    ))}
  </div>
  )

  
};

export default NewJokeList;
