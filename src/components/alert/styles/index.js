export const styles = (async () => {
  const design = process.env.ARK_DESIGN || 'ark'
  return (await import(`./${design}.scss`)).default?.toString()
})()
