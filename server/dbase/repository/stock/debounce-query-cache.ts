const cache = {}
let lastPrune = Date.now()

function prune() {
  const now = Date.now()
  Object.keys(cache).map((k) => {
    if (cache[k].created > now) {
      delete cache[k]
    }
  })
  lastPrune = Date.now()
}

function has(k, ms) {
  const entry = cache[k] || null
  if (!entry) {
    return null
  }
  return cache[k].created + ms > (Date.now())
}

function get(k) {
  if (!cache[k]) {
    return null
  }
  return cache[k]?.data
}

function set(k, data) {
  cache[k] = {
    created: Date.now(),
    data,
  }
  // this is only a DDos burst cache ... just to soften any dbase calls
  const expired = (lastPrune + (1000 * 60 * 2)) < Date.now()
  if (expired) {
    globalThis.setImmediate(prune)
  }
}

export default {
  has,
  get,
  set,
}
