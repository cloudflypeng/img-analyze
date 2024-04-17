import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './index.js',
  ],
  clean: false,
  failOnWarn: false,
})
