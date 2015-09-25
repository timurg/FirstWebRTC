using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstWebRTC
{
    /// <summary>
    /// Summary description for pull_image
    /// </summary>
    public class pull_image : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string data = context.Request.Params["buff"];
            string folder = context.Server.MapPath("/Photo/");

            System.IO.File.WriteAllBytes(folder+"1.png", Convert.FromBase64String(data.Remove(0, 22)));

            context.Response.ContentType = "text/plain";
            context.Response.Write("OK");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}