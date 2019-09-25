Completely Absurd Trivia Slack 2.0

# Ngrok instructions:
1) Run ngrok.exe
2) Tunnel the server by exposing ngrok to the public internet: `ngrok http 4390`
3) Run the express server on the same port
4) Inspect requests at `http://127.0.0.1:4040/inspect/http`