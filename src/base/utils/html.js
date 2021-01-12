export function html(literals, ...expressions) {
  let string = ``
  for (const [i, value] of expressions.entries()) {
    string += literals[i] + value
  }
  string += literals[literals.length - 1]
  return string
}
