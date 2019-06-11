/*
 * References
 * - https://gist.github.com/tkrueger/3500612#file-load-generator-js
 */

var enable = true
var load = .5

function presure(ms) {
  var now = new Date().getTime();
  var res = 0, count = 0;
  while (enable) {
    res += Math.random() * Math.random()
    count++
    if (new Date().getTime() > now + ms)
      break
  }
  return count
}

function run(times, count, callback) {
  console.log(`${times}, ${count}`)

  if(times == 0) {
    callback && callback(count)
  } else {
    enable = true;
    count += presure(1000 * load);
    setTimeout(run, 1000 * (1 - load), times-1, count, callback);
  }
}

export default function (req, res, next) {
  let {$query, $url} = req

  // console.log($url)
  // console.log($query)

  let times = $query.times || 1
  if ($query.load) {
    load = $query.load
  }

  run(times, 0, (count) => {
    res.write('OK! ' + count)
    res.end()
  });
}