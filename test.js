function cache() {
  let data
  return function(callback) {
    data = 1
    return data
  }
}

const a = cache()

console.log(a())