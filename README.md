# Where-s-Waldo

First Display Home page with 2 buttons:

```js
<button>Start Game<button/>
<button>LeaderBoard<button/>
```

Clicking Start Game Display form with input for username and button play game under form Rules:

```js
<form>
<input for="username"/>
<button>Start Game<button/>
<form/>
<p>Rules<p/>
```

Clickinng Start Game store username in database and render image to play with navbar on top
with dropdown menu that shows 3 places we must find on image.

When user starts the game save time stampt when he started in DB, than when he is finished get that timeStampt from DB and subtract it with new time stamp when he finished , so if someone trys to mess with time on front end we have correct time in back end
