const assert = require('assert')
const {default: foo} = require('./index.cjs')

assert.equal(foo, '1')