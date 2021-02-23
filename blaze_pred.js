(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        video = document.getElementById('webcam');
    
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
    navigator.getMedia({
        video:true,
        audio:false
    }, function(stream){
        video.srcObject = stream;
    }, function(error){
        console.log(error);
    }
    );
    var detect = setInterval(()=>{
		draw(video);
	}, 30000);
    async function draw(video)
    {
        const model = await blazeface.load();
        const returnTensors = false;
        const predictions = await model.estimateFaces(video, returnTensors);
          if (predictions.length > 0)
          {
           console.log(predictions);
           }
		   else{
		   console.log("not detected");
		   }
        setTimeout(draw);
    }
})();
