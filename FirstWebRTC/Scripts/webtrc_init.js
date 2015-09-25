function getBrowserUserMedia() {
    var browserUserMedia = navigator.webkitGetUserMedia ||	// WebKit
						navigator.mozGetUserMedia ||	// Mozilla FireFox
						navigator.getUserMedia;			// 2013...
    if (!browserUserMedia) browserUserMedia = null;
    return browserUserMedia;
}

function initializeVideoControl(source, canplayCall) {
    var videoControlAPI = new Object();
    videoControlAPI.source = source;
    videoControlAPI.setMedia
    navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    videoControlAPI.bindStream = function (stream) {
        if (navigator.mozGetUserMedia) {
            source.mozSrcObject = stream;
        }
        else {
            var vendorURL = window.URL || window.webkitURL;
            source.src = vendorURL.createObjectURL(stream);
        }
    };
    videoControlAPI.width = 320;
    videoControlAPI.height = NaN;
    videoControlAPI.isStreaming = false;
    var canvas = document.createElement("canvas");
    videoControlAPI.buffer = canvas;
    videoControlAPI.onStreaming = canplayCall;
    videoControlAPI.getMedia = function ()
    {
        navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            videoControlAPI.bindStream(stream);
            videoControlAPI.source.addEventListener("canplay", function () {
                if (!videoControlAPI.isStreaming) {
                    videoControlAPI.height = videoControlAPI.source.videoHeight / (videoControlAPI.source.videoWidth / videoControlAPI.width);
                    if (isNaN(videoControlAPI.height)) {
                        videoControlAPI.height = videoControlAPI.width / (4 / 3);
                    }
                    videoControlAPI.source.setAttribute('width', videoControlAPI.width);
                    videoControlAPI.source.setAttribute('height', videoControlAPI.height);
                    videoControlAPI.onStreaming();
                }
            });
            videoControlAPI.source.play();
            
        },
        function (mess) {
            console.log("Ошибка." + mess);
        }
        );
    };
    videoControlAPI.RenderPhoto = function (canvas)
    {
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
        //var data = canvas.toDataURL('image/png');
        //photo.setAttribute('src', data);
    }
    videoControlAPI.getCanvasData = function (canvas) {
        return canvas.toDataURL("image/png");
    };

    videoControlAPI.getSourceData = function (canvas) {
        this.RenderPhoto(this.buffer);
        return this.getCanvasData(this.buffer);
    };
    
    return videoControlAPI;
}