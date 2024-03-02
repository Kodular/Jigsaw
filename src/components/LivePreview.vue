<script setup lang="ts">
import LiveCodes, { type Props } from 'livecodes/vue';
const options: Props = {
  view: 'result',
  config: {
    script: {
      language: 'solid.tsx',
      content: `import { createSignal } from "solid-js";

      function Counter(props: { name: string }) {
        const [count, setCount] = createSignal(0);
        const increment = () => setCount(count() + 1);
        return (
          <div className="container">
            <h1>Hello, {props.name}!</h1>
            <img className="logo" alt="logo" src="https://livecodes.io/livecodes/assets/templates/solid.svg" />
            <p>You clicked {count()} times.</p>
            <button onClick={increment}>Click me</button>
          </div>
        );
      }
      
      export default function App() {
        return <Counter name="Solid" />;
      }`,
    },
    mode: 'result',
  }
};
</script>

<template>
  <LiveCodes v-bind="options" style="height: 600px; width: 320px;" />
</template>
