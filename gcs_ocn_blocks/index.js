var request = require("request")

module.exports = {
  gcs_ocn_blocks: function (context, data) {
    console.log(data.bucket + "/" + data.name + ":" + data.resourceState);

    if (data.resourceState != "exists") {
      return context.success();
    }
    opts = {
      url: "https://MYBOARD.magellanic-clouds.net/admin/schedules/ID.json",
      method: "POST",
      form: {"api_token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "gcs_url": "gs://" + data.bucket + "/" + data.name}
    }
    request.post(opts, function (error, response, body) {
      if (!error) {
        context.success();
        if (response.statusCode != 200) {
          console.error("response: status = " + response.statusCode);
          if (body) {
            console.error("response body: "+ body);
          }
        }
      } else {
        if (error) {
          console.error("error: " + err);
        }
        if (response) {
          console.error("response: " + response);
        }
        if (body) {
          console.error("response body: "+ body);
        }
        context.failure();
      }
    });
  }
};
