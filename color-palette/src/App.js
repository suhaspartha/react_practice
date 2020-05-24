import React, {Component} from 'react';
import Palette from './Palette';
import seedColors from "./seedColors";
import generatepalette from "./ColorHelper";

class App extends Component {
render(){
  console.log(generatepalette(seedColors[4]));
  return (
    <div>
      <Palette {...seedColors[4]}/>
    </div>
  );
}
}

export default App;
