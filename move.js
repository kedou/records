/**
* obj: 移动对象
* json: 改变参数｛width: 300, height: 300｝ 
* options: 运动参数 time: 总时间  type：运动方式
*/


function move(obj, json, options){
	options = options || {};
	options.time = options.time || 700;
	options.type = options.type || 'buffer';

	var count = Math.round(options.time/30);
	obj.n = 0;
	obj.start = {};
	obj.dis = {};


	for(var i in json){
		if(i == 'opacity'){
			obj.start[i] = Math.round(parseFloat(getStyle(obj, i))*100);
		}else{
			obj.start[i] = parseInt(getStyle(obj, i));
		}
		obj.dis[i] = json[i] - obj.start[i];
	}
	if(!obj.timer){
		obj.timer = setInterval(function(){

			obj.n++;
			
			for(var i in json){	
				switch(options.type){
					case 'linear': 	//线性
						var cur =obj.start[i] + obj.dis[i]*obj.n/count;
						break;
					case 'buffer': 	//缓冲
						var speed = 1-obj.n/count;
						var scale = 1 - speed*speed*speed;
						var cur = obj.start[i] +obj.dis[i]*scale;
						break;
				}

				if(i == 'opacity'){
					obj.style.opacity = cur/100;
					obj.style.filter = 'alpha(opaciyt'+cur+')';
				}else{
					obj.style[i] =cur+'px';
				}
			}

			if(obj.n == count){
				clearInterval(obj.timer);
				obj.timer = null;
			}
		},30);
	}
}
