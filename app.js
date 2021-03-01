require('dotenv').config()
const request = require('request')
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});


const config = {
    url: 'https://api.twitter.com/2/tweets/search/stream',
    auth: {
      bearer: process.env.bearer
    },
    timeout: 31000
}

const interactWithTweet = (tid) => {
    client.post('/favorites/create', {id: tid}, function(error) {
        if(error) console.error(error);
    })
    client.post('/statuses/retweet/' + tid, {},function(error) {
        if(error) console.error(error);
      })
}

const stream = request.get(config)

stream.on('data', data => {
    try {
        const json = JSON.parse(data);
        if (json && json.data && json.data.id) {
            interactWithTweet(json.data.id)
        }
      } catch (e) {
      }
})

stream.end()
stream.destroy()