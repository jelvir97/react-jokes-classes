import React, { Component } from "react";
import JokeList from "./JokeList";
import NewJokeList from "./NewJokeList";

/** App component. Renders list of jokes. */

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <JokeList />
//       </div>
//     );
//   }
// }

/** Refactored App Component */

const App = ()=>{
  return(
      <div className="App">
        {/* <JokeList /> */}
        <NewJokeList />
      </div>
  )
}

export default App;
