import { Chart } from 'chart.js';
import { createChart, addData, removeData } from './chart'
import { solve_spring } from './spring'

let k = 150; // stiffness - raideur
let c = 10; // damping - amortissement
let duration = 1500;

function getSpring() {
  const func = solve_spring(100, 0, 0, { mass: 1, damping: c, stiffness: k })
  const v = Array.from(new Array(200).keys()).map(v => v / 100)
  return v.map(v => func(v))
}

let chart: Chart | undefined
document.addEventListener('DOMContentLoaded', () => {
  const stiffnessInput = document.getElementById('stiffness') as HTMLInputElement;
  const dampingInput = document.getElementById('damping') as HTMLInputElement;
  const durationInput = document.getElementById('duration') as HTMLInputElement;
  const bouncyDiv = document.getElementById('bouncy');

  stiffnessInput?.addEventListener('input', (e: any) => {
    removeData(chart as Chart);
    k = e.target.value
    const spring = getSpring();
    addData(chart as Chart, spring)

    const values = spring.map(v => ({ transform: `translateY(${v}px)` }))
    bouncyDiv?.animate(values, { duration })
  })

  dampingInput?.addEventListener('input', (e: any) => {
    removeData(chart as Chart);
    c = e.target.value
    const spring = getSpring();
    addData(chart as Chart, spring)

    const values = spring.map(v => ({ transform: `translateY(${v}px)` }))
    bouncyDiv?.animate(values, { duration })
  })

  durationInput?.addEventListener('input', (e: any) => {
    duration = Number(e.target.value)
    const spring = getSpring();
    const values = spring.map(v => ({ transform: `translateY(${v}px)` }))
    bouncyDiv?.animate(values, { duration })
  })

  durationInput.value = duration.toString()
  dampingInput.value = c.toString()
  stiffnessInput.value = k.toString()
  const spring = getSpring()
  chart = createChart(spring)
  const values = spring.map(v => ({ transform: `translateY(${v}px)` }))
  bouncyDiv?.animate(values, { duration })
})
