export default function radio (radios, cb) {
  radios.map(r => r.onclick = e => cb(e.target.value))
}
