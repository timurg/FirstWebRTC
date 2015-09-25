<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="FirstWebRTC._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="Content/bootstrap.css" />
    <script src="Scripts/bootstrap.js"></script>
    <script src="Scripts/webtrc_init.js"></script>
    <script src="Scripts/jquery-2.1.4.js"></script>
</head>
<body>
    <div class="container">
        <form id="MainForm" runat="server">
            <div class="row">
                <div class="camera col-lg-12">
                    <video id="video">Video stream not available.</video>
                    <canvas id="photo" class="hidden"></canvas>
                </div>
            </div>
            <div class="row">
                <div class="camera col-lg-12">
                    <p id="camera_data"></p>
                </div>
            </div>
        </form>
    </div>
    <script>
        $(document).ready(function () {
            var video = document.getElementById("video");
            var canvas = document.getElementById("photo");
            var camera_data = document.getElementById("camera_data");
            var videoControlAPI = initializeVideoControl(video, function () {
                //videoControlAPI.RenderPhoto(canvas);
                var data = videoControlAPI.getSourceData();
                $.post("pull_image.ashx", { buff: data }, function () { console.log("Complete!"); });
                console.log("canplay");
            });
            videoControlAPI.getMedia();
        });
    </script>
</body>
</html>
