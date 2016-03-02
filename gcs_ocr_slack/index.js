var Slack = require("slack-node")

module.exports = {
  gcs_ocr_slack: function (context, data) {
    console.log(data.bucket + "/" + data.name + ":" + data.resourceState);

    slack = new Slack();
    var slack_endpoint = "https://hooks.slack.com/services/REPLACE_HERE_WITH_YOUR_HOOK";
    slack.setWebhook(slack_endpoint);
    if (data.resourceState == "not_exists") {
      message = "gs://" + data.bucket + "/" + data.name + " が削除されました"
    } else {
      message = "gs://" + data.bucket + "/" + data.name + " が作成/更新されました"
    }
    slack.webhook({
      channel: "#general",
      username: "cloud-functions",
      icon_emoji: ":see_no_evil:",
      text: message
    }, function(err, response) {
      if (!err) {
        context.success();
      } else {
        if (err) {
          console.error("err: " + err);
        }
        if (response) {
          console.error("response: "+ response);
        }
        context.failure();
      }
    });
  }
};
