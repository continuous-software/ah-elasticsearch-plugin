var elasticSearch = require('elasticsearch');
var url = require('url');

module.exports = {
  initialize: function (api, next) {

    api.elasticsearch = {
      createClient: function () {
        return new elasticSearch.Client({
          host: url.format({
            hostname: api.config.elasticsearch.hostname,
            protocol: api.config.elasticsearch.protocol,
            port: api.config.elasticsearch.port
          }),
          apiVersion: api.config.elasticsearch.apiVersion
        })
      },
      elasticsearch: elasticSearch
    };

    next();

  },
  startPriority: 1001,
  start: function (api, next) {
    api.elasticsearch.client = api.elasticsearch.createClient();
    api.elasticsearch.client.ping({
      requestTimeout: 30000
    })
      .then(function (response) {
        next();
      })
      .catch(function (err) {
        if (api.config.elasticsearch.terminateOnError === false) {
          api.logger.warning('Could not reach elasticsearch cluster');
          return next();
        }
        return next(err);
      });
  }
};