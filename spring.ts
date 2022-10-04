/** MIT License github.com/pushkine/ */
interface SpringParams {
  mass: number; // = 1.0
  damping: number; // = 10.0
  stiffness: number; // = 100.0
  soft?: boolean; // = false
}

type seconds = number;

export function solve_spring(from: number, velocity: number, to: number, params: SpringParams) {
  const delta = to - from;
  if (true === params.soft || 1.0 <= params.damping / (2.0 * Math.sqrt(params.stiffness * params.mass))) {
    const angular_frequency = -Math.sqrt(params.stiffness / params.mass);
    const leftover = -angular_frequency * delta - velocity;
    return (t: seconds) => to - (delta + t * leftover) * Math.E ** (t * angular_frequency);
  } else {
    const damping_frequency = Math.sqrt(4.0 * params.mass * params.stiffness - params.damping ** 2.0);
    const leftover = (params.damping * delta - 2.0 * params.mass * velocity) / damping_frequency;
    const dfm = (0.5 * damping_frequency) / params.mass;
    const dm = -(0.5 * params.damping) / params.mass;
    return (t: seconds) => to - (Math.cos(t * dfm) * delta + Math.sin(t * dfm) * leftover) * Math.E ** (t * dm);
  }
}