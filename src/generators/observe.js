import noop from "../noop";

export default function(initialize) {
  var stale = false, value, resolve, dispose = initialize(change);

  function change(x) {
    if (resolve) resolve(x), resolve = null;
    else stale = true;
    return value = x;
  }

  function next() {
    return {done: false, value: stale
        ? (stale = false, Promise.resolve(value))
        : new Promise(function(_) { resolve = _; })};
  }

  return {
    throw: noop,
    return: dispose == null ? noop : dispose,
    next: next
  };
}
