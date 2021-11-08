/**
 * linear value function
 * @param state     ignored
 * @param encoding  as an array of numbers
 * @param w         as an array of numbers with equal length
 * @returns         s * w
 */
export default function linearQFunction(state: any, encoding: number[], w: number[]) {
  if(encoding.length !== w.length) throw new Error (`Expected equal array lengths. Received ${encoding.length} and ${w.length}`)

  return encoding.reduce((sum,s,i) => sum + s*w[i], 0)
}


/**
 * Returns the gradient for a one-layer linear value function
 * v = w*s
 * dv/dw = s
 * @param state     ignored
 * @param encoding  as an array of numbers
 * @param w         as an array of numbers with equal length
 * @returns         s
 */
export function linearQFunctionGrad(state: any, encoding: number[], w: number[]) {
  if(encoding.length !== w.length) throw new Error (`Expected equal array lengths. Received ${encoding.length} and ${w.length}`)

  return encoding
}