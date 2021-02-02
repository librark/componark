// @ts-nocheck

const design = process.env.ARK_DESIGN

export const styles = require(`./${design}.scss`).default?.toString()
