/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var canvas_center = {x:400,y:400}
var density = 0.01;
var t = 0;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        console.log('Received Event: ' + id);
        canvasApp();
    }
};

function canvasApp(){
    console.log("init canvas");
    canvas = document.getElementById("myCanvas");
    //canvas.style.height = canvas.style.width = $(window).height()>$(window).width()?($(window).width()-6):($(window).height()-6) + "px";
    //document.getElementById("main").style.width = canvas.style.width;
    //console.log("init canvas2");
    ctx  = canvas.getContext("2d");
    
    canvas_center = {x:canvas.width/2,y:canvas.height/2};
    var radius = 200;
    var scale = 20;
    //the length of scale
    
    points = [[{x:400,y:180},{x:360,y:180},{x:295,y:225},{x:267,y:250}],
              [{x:267,y:250},{x:224,y:287},{x:200,y:342},{x:200,y:400}],
              [{x:200,y:400},{x:200,y:510},{x:289,y:600},{x:400,y:600}],
              [{x:400,y:600},{x:510,y:600},{x:600,y:510},{x:600,y:400}],
              [{x:600,y:400},{x:600,y:343},{x:574,y:287},{x:531,y:250}],
              [{x:531,y:250},{x:503,y:225},{x:440,y:180},{x:400,y:180}]];
    
    var angle = 0;
    var zap = [20*Math.random()-10,20*Math.random()-10,20*Math.random()-10];
    var zap_temp = [0,0,0]; //[seasons, minute, hour]
    var init = true;
    
    //init draw
    console.log("init canvas2");
    draw();
    console.log("init canvas3");
    function setZap(){
        zap = [20*Math.random()-10,20*Math.random()-10,20*Math.random()-10];
    }
    
    function draw(){
        now = new Date();
        hour = now.getHours()%12;
        minute = now.getMinutes();
        angle = 2*Math.PI*(hour*60+minute)/(12*60);
        minute_angle = 2*Math.PI*minute/60;
        month = now.getMonth();
        date = now.getDate();
        var lastday = [31,28,31,30,31,30,31,31,30,31,30,31];
        date_angle = (month*30+(30*date/lastday[month]))*Math.PI/180;
        //console.log(180*angle/Math.PI);
        
        canvas.width = canvas.width;
        
        //--- draw seasons background ---
        var img = document.getElementById("seasons");
        ctx.drawImage(img,0,0);
        
        //---- draw seasons hand ----
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(date_angle);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        ctx.lineWidth=1;
        ctx.strokeStyle="rgba(80,80,80,0.1)";
        var lingrad2 = ctx.createLinearGradient(canvas.width/2,canvas.height/2-400/2,canvas.width/2,canvas.height/2+400/2);
        lingrad2.addColorStop(1,"rgb(196,196,196)");
        lingrad2.addColorStop(0,"rgb(214,214,214)");
        ctx.fillStyle=lingrad2;
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        
        archive = points[0][0].y;
        
        zap_temp[0] += (zap[0] - zap_temp[0])*0.01;
        points[0][0].y += zap_temp[0];
        points[0][1].y += zap_temp[0];
        points[points.length-1][2].y += zap_temp[0];
        points[points.length-1][3].y += zap_temp[0];
        
        ctx.moveTo(points[0][0].x,points[0][0].y);
        for(a = 0;a<points.length;a++){
            
            ctx.bezierCurveTo(points[a][1].x,points[a][1].y,points[a][2].x,points[a][2].y,points[a][3].x,points[a][3].y);
			
        }
        ctx.closePath();
        ctx.stroke();
        //ctx.globalAlpha = 0.5;
        ctx.fill();
        
        //console.log(angle);
        points[0][0].y = points[0][1].y = points[points.length-1][3].y = points[points.length-1][2].y = archive;
        
        //reset
        ctx.restore();
        //--- end of seasons hand ---
        
        
        
        
        //--- draw clock decoration ---
        for (i = 0;i<12;i++){
            //console.log(i*30);
            ctx.translate(canvas.width/2,canvas.height/2);
            ctx.rotate(i*30*Math.PI/180);
            ctx.translate(-canvas.width/2,-canvas.height/2);
            
            ctx.strokeStyle = "rgb(168,168,168)";
            ctx.lineWidth = 2;
            ctx.shadowColor = "rgba(255,255,255,1)";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 2;
            ctx.shadowOffsetX = 0;
            ctx.beginPath();
            ctx.moveTo(canvas.width/2,canvas.height/2-radius+46);
            ctx.lineTo(canvas.width/2,canvas.height/2-radius+46+scale);
            ctx.closePath();
            ctx.stroke();
            
            //rotate back
            ctx.translate(canvas.width/2,canvas.height/2);
            ctx.rotate(-i*30*Math.PI/180);
            ctx.translate(-canvas.width/2,-canvas.height/2);
            
        }
        
        //draw hour number
        ctx.fillStyle = "rgb(168,168,168)";
        ctx.translate(-10,34);
        ctx.font = "40px Open Sans";
        ctx.fillText('12',387,203);
        ctx.fillText('3',574,380);
        ctx.fillText('6',398,555);
        ctx.fillText('9',220,380);
        ctx.translate(10,-34);
        
        //---- draw minute ring ----
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(minute_angle);
        ctx.scale(0.67,0.67);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(100,100,100,0.8)";
        ctx.fillStyle="rgba(50,50,50,0.8)";
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        
        archive = points[0][0].y;
        
        zap_temp[1] += (zap[1] - zap_temp[1])*0.01;
        points[0][0].y += zap_temp[1];
        points[0][1].y += zap_temp[1];
        points[points.length-1][2].y += zap_temp[1];
        points[points.length-1][3].y += zap_temp[1];
        
        ctx.moveTo(points[0][0].x,points[0][0].y);
        for(a = 0;a<points.length;a++){
            
            ctx.bezierCurveTo(points[a][1].x,points[a][1].y,points[a][2].x,points[a][2].y,points[a][3].x,points[a][3].y);
			
        }
        ctx.closePath();
        ctx.stroke();
        //ctx.globalAlpha = 0.5;
        ctx.fill();
        
        //console.log(angle);
        points[0][0].y = points[0][1].y = points[points.length-1][3].y = points[points.length-1][2].y = archive;
        
        //reset
        ctx.restore();
        //--- end of minute ring ---
        
        
        //--- draw hour ring ---
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(angle);
        ctx.scale(0.67,0.67);
        ctx.translate(-canvas.width/2,-canvas.height/2);
        /*if (!init){
         angle += 1;
         canvas.width = canvas.width;
         ctx.translate(canvas.width/2,canvas.height/2);
         ctx.rotate(Math.PI*angle/180);
         ctx.translate(-canvas.width/2,-canvas.height/2);
         }*/
        init = false;
        ctx.lineWidth=2;
        ctx.strokeStyle="rgba(100,100,100,0.8)";
        ctx.fillStyle="rgba(190,190,190,1)";
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        
        //console.log(points[0][0]);
        //zap = 6*Math.random()-3;
        archive = points[0][0].y;
        
        zap_temp[2] += (zap[2] - zap_temp[2])*0.01;
        points[0][0].y += zap_temp[2];
        points[0][1].y += zap_temp[2];
        points[points.length-1][2].y += zap_temp[2];
        points[points.length-1][3].y += zap_temp[2];
        
        ctx.moveTo(points[0][0].x,points[0][0].y);
        for(a = 0;a<points.length;a++){
            
            ctx.bezierCurveTo(points[a][1].x,points[a][1].y,points[a][2].x,points[a][2].y,points[a][3].x,points[a][3].y);
			
        }
        ctx.closePath();
        ctx.stroke();
        //ctx.globalAlpha = 0.5;
        ctx.fill();
        
        //console.log(angle);
        
        
        points[0][0].y = points[0][1].y = points[points.length-1][3].y = points[points.length-1][2].y = archive;
        //console.log(points[0][0]);
        
        ctx.restore();
        //ctx.translate(canvas.width/2,canvas.height/2);
        //ctx.rotate(-angle);
        //ctx.translate(-canvas.width/2,-canvas.height/2);
        //--- end of hour hand ---
        
        //draw inside ring
        /*ctx.fillStyle = "rgb(204,204,204)";
         ctx.shadowColor = "rgba(255,255,255,0.7)";
         ctx.shadowBlur = 20;
         ctx.shadowOffsetY = 0;
         ctx.shadowOffsetX = 0;
         ctx.beginPath();
         ctx.arc(canvas.width/2,canvas.height/2,274/2,0,2*Math.PI,true);
         ctx.closePath();
         ctx.fill();*/
        
        var lingrad = ctx.createLinearGradient(canvas.width/2,canvas.height/2-274/2,canvas.width/2,canvas.height/2+274/2);
        lingrad.addColorStop(1,"rgb(125,125,125)");
        lingrad.addColorStop(0,"rgb(168,168,168)");
        ctx.fillStyle = lingrad;
        ctx.strokeStyle = "rgb(204,204,204)";
        ctx.shadowColor = "rgba(255,255,255,0.7)";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowOffsetX = 0;
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.arc(canvas.width/2,canvas.height/2,250/2,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
    }
    
    setInterval(draw,10);
    setInterval(setZap,500);
}