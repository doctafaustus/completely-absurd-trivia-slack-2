# Completely Absurd Trivia Slack 2.0

Clearhead's internal Slack trivia game to keep moral high.

## Ngrok instructions:
1) Run ngrok.exe
2) Tunnel the server by exposing ngrok to the public internet: `ngrok http 4390`
3) Run the express server on the same port
4) Inspect requests at `http://127.0.0.1:4040/inspect/http`

## Tips
To mention user: `<@user>`
To mention @here / @channel: `<!here> / <!channel>`

## Reminders
Do NOT include HTML tags as answers. The user answer would be evaluated as &lt;ul&gt; for `<ul>`