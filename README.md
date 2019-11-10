# LIRI BOT


**************************************
## ABOUT
**************************************
### Meet LIRI

LIRI is a command line node app that will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

I used switch statements to call an appropriate API based on user's input.

Here is what each command do:

```sh
$ node liri.js concert-this <artist/band name here>
```
will search the Bands in Town Artist Events API and render the following information about each event to the terminal:

* Name of the venue
* Venue location
* Date of the Event (use moment to format this as "MM/DD/YYYY")

> Example:

![Image description](img/concert-this.png)

If the an artist/band that user provided has no concert coming up, LIRI would display the following:

![Image description](img/concert-this-no-concert.png)
**************************************
## INSTRUCTIONS
***************************************
Open the terminal in your root derictory. Once there, use these commands to do the following:

node liri.js concert-this artist               TO CHECK IF YOUR FAVORITE ARTIST HAS A CONCERT COMING UP
node liri.js spotify-this-song song       TO GET INFO ABOUT A SONG
node liri.js movie-this movie                TO GET INFORMATION ABOUT A MOVIE
node liri.js do-what-it-says                  LIRI WILL DO THE COMMAND LISTED IN RANDOM.TXT

!! IMPORTANT do not wrap the artist, song or movie name in quotes

!! IMPORTANT to use this application,  run 
```sh
$ npm install in the root directory
```

***************************************
## TECHNOLOGIES USED
***************************************
 - Node.js
 - Axios
 - Moment.js
 - Spotify API
 - OMDB API 
 - Bands In Town API
 
 ***************************************



