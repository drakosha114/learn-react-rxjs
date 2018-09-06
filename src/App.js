import React from 'react';
import './App.css';

import { componentFromStream, createEventHandler } from 'recompose';
import { map, startWith, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="GitHub username"/>
      </div>
    );
  }
}
*/
import User from './user';

const App = componentFromStream(prop$ => {
    const { handler, stream } = createEventHandler();
    const value$ = stream.pipe(
        map(e => e.target.value),
        startWith('')
    );
    return combineLatest(prop$, value$).pipe(
        tap(console.warn),
        map(([props, value]) => (
            <div>
                <input
                    onChange={handler}
                    placeholder="GitHub username"
                />
                <User user={value}/>
            </div>
        ))
    )
});

export default App;
