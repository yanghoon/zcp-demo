/*
 * References
 * - http://wildpup.cafe24.com/archives/318
 */
var URL = require('url');
var QUERY = require('querystring');

export default function (req, res, next) {
  let url = URL.parse(req.url)
  let query = QUERY.parse(url.query)
  req.$url = url
  req.$query = query
  next();
}