import { Component, createComputed, createMemo, createSignal, JSX } from "solid-js";
import { css } from 'solid-styled-components'

import styles from "./App.module.css";

import {Button} from './button'


const App: Component = () => {
  const [ count, setCount ] = createSignal(0)
  const disabled = createMemo(() => count() % 3 === 0)
  return (
    <div class={styles.App}>
      <Button 
        disabled={disabled()} 
        onClick={() => setCount(count() + 1)}
      >{count()}</Button>
    </div>
  );
};

export default App;
