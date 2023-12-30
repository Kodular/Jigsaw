import { javascriptGenerator } from "blockly/javascript";



export function generateAppCode(workspace) {
    var code = javascriptGenerator.workspaceToCode(workspace);
    let code_template = `<script type="module">
import {createSignal,onCleanup,} from "https://cdn.skypack.dev/solid-js";
import { render } from "https://cdn.skypack.dev/solid-js/web";
import h from "https://cdn.skypack.dev/solid-js/h";

const App = () => {
    const [count, setCount] = createSignal(0),
    timer = setInterval(() => setCount(count() + 1), 1000);
    onCleanup(() => clearInterval(timer));
    ${code}
};

render(App, document.body);
</script>\n`
    return code_template;
}