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
                "name": "Seaplanes",
                "length": "02:35",
                "file": "01_Seaplanes"
            }, {
                "track": 2,
                "name": "Africa",
                "length": "03:19",
                "file": "02_Africa"
            }, {
                "track": 3,
                "name": "Hit The Wave",
                "length": "03:29",
                "file": "03_Hit_The_Wave"
            }, {
                "track": 4,
                "name": "On a Beach",
                "length": "03:03",
                "file": "04_On_a_Beach"
            }, {
                "track": 5,
                "name": "Holy Day",
                "length": "03:10",
                "file": "05_Holy_Day"
            }, {
                "track": 6,
                "name": "Mary",
                "length": "03:05",
                "file": "06_Mary"
            }, {
                "track": 7,
                "name": "Coral",
                "length": "03:35",
                "file": "07_Coral"
            }, {
                "track": 8,
                "name": "Seventeen",
                "length": "03:52",
                "file": "08_Seventeen"
            }, {
                "track": 9,
                "name": "Aquarama",
                "length": "02:27",
                "file": "09_Aquarama"
            }, {
                "track": 10,
                "name": "Africa (In Flagranti Remix)",
                "length": "05:22",
                "file": "10_Africa_In_Flagranti Remix"
            }],
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