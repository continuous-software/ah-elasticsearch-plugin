exports.default = {
  elasticsearch: function elasticsearch (api) {
    return {
      hostname: '127.0.0.1',
      protocol: 'http',
      port: 9200,
      apiVersion:'master',
      terminateOnError:true
    };
  }
};