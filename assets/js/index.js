// html5media enables <video> and <audio> tags in all major browsers
// External File: http://api.html5media.info/1.1.8/html5media.min.js


// Add user agent as an attribute on the <html> tag...
// Inspiration: http://css-tricks.com/ie-10-specific-styles/
var b = document.documentElement;
b.setAttribute('data-useragent', navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);


// HTML5 audio player + playlist controls...
// Inspiration: http://jonhall.info/how_to/create_a_playlist_for_html5_audio
// Mythium Archive: https://archive.org/details/mythium/
jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        var index = 0,
            playing = false,
            mediaPath = 'assets/media/',
            extension = '',
            tracks = [{
                "track": 1,
                "name": "Lucky One",
                "length": "3:18",
                "file": "Lucky One"
            }, {
                "track": 2,
                "name": "The House Is Burning",
                "length": "3:29",
                "file": "The House Is Burning"
            },  {
                "track": 3,
                "name": "Souvenir",
                "length": "3:47",
                "file": "Souvenir"
            },   {
                "track": 4,
                "name": "Moon Landing",
                "length": "04:19",
                "file": "Moon Landing"
            },  {
                "track": 5,
                "name": "Vietnam (Instrumental)",
                "length": "03:45",
                "file": "Vietnam (Instrumental)"
            },  {
                "track": 6,
                "name": "Out Of The Blue",
                "length": "04:01",
                "file": "Out Of The Blue"
            },  {
                "track": 7,
                "name": "Summer's Gone",
                "length": "06:09",
                "file": "Summer's Gone"
            }    
            // , {
            //     "track": 3,
            //     "name": "Africa",
            //     "length": "03:16",
            //     "file": "03 Africa"
            // }, {
            //     "track": 4,
            //     "name": "On a Beach",
            //     "length": "02:59",
            //     "file": "04 On A Beach"
            // }, {
            //     "track": 5,
            //     "name": "Holy Day",
            //     "length": "03:07",
            //     "file": "05 Holy Day"
            // }, {
            //    "track": 6,
            //     "name": "Aquarama",
            //     "length": "02:19",
            //     "file": "06 Aquarama" 
            // }, {
            //     "track": 7,
            //     "name": "Coral",
            //     "length": "03:32",
            //     "file": "07 Coral"
            // }, {   
            //     "track": 8,
            //     "name": "Mary",
            //     "length": "02:59",
            //     "file": "08 Mary"
            // }, {
            //     "track": 9,
            //     "name": "Seventeen",
            //     "length": "03:53",
            //     "file": "09 Seventeen"
            // }
            ],
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').bind('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).bind('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).bind('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').click(function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').click(function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').click(function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    }
});