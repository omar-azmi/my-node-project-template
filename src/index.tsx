import { render } from "solid-js/web"
import { createSignal } from "solid-js"

import { myStyle } from "./index.css"

function Counter() {
	const [count, setCount] = createSignal(0)
	const increment = () => setCount(count() + 1)

	return (
		<button type="button" class={myStyle} onClick={increment}>
			{count()}
		</button>
	)
}

render(() => <Counter />, document.body)
