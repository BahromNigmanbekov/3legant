import { useCounterStore } from "../../context"


function CounterButton() {
    const {counter , inc , dec} = useCounterStore()
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => inc}>+</button>
      <button disabled ={counter === 0} onClick={() => dec}>-</button>
    </div>
  )
}

export default CounterButton
