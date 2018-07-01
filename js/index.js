//~~~~~~~~~~~~~~~~导航~~~~~~~~~~~~~~~~~
$(function(){
	//鼠标悬浮在有二级标题的一级标题上，二级标题出现
	$('.menu>li .slide').parent().mouseover(
			function(){
				$(this).find('.slide').show().stop().animate({
					top:58,
					opacity:1
				},300);
				var Left=$(this).position().left;
				var Width=$(this).innerWidth();
				$('.range').stop().animate({  
					left:Left+10,
					width:Width,
					opacity:1
				},200)
			}
			//鼠标离开一级标题，二级标题消失
	).mouseleave(
		function(){
			$(this).find('.slide').hide().stop().animate({
				top:65,
				opacity:0
			});
		}
	)
	//鼠标放到首页上
	$('.menu>li').first().mouseover(
			function(){
			var Left=$('.menu').position().left;
			var Width=$('.menu').children().first().innerWidth()
			$('.range').stop().animate({
				left:Left+4,
				width:Width+12
			},200)
		}
	//鼠标离开一级标题，二级标题消失
	).mouseleave(
		function(){
			$(this).find('.slide').hide().stop().animate({
				top:65,
				opacity:0
			});
		}
	)
	//鼠标离开导航区，蓝色滑块回到默认首页位置
	$('.menu').mouseleave(
		function(){
			var Left=$('.menu').position().left;
			var Width=$('.menu').children().first().innerWidth()
			$('.range').stop().animate({
				left:Left+4,
				width:Width+12
			})
		}
	)
	//蓝色滑块出现在默认首页位置
	var Left=$('.menu').position().left;
	$('.range').css({
		left:Left+4
	})
	//鼠标悬浮二级标题的动画
//	$('.header .child_title li').wrapInner('<span class="hover"></span>').each(function () {
//		$('span.hover').css('opacity', 0).hover(function () {
//			$(this).stop().fadeTo(300, 1);
//		}, function () {
//			$(this).stop().fadeTo(300, 0);
//		});
//	});
})

//~~~~~~~~~~~~~~~~轮播~~~~~~~~~~~~~~~~~
$(function(){
	var isRun=true;
    var imgs=$('.banner .imgs');
	var index=0;
//~~~~~~~~~~~自动播放设置
	var autoPlay=setInterval(function(){   //自动播放下一张，2秒一次
		next()
	},2000)
	$('.banner').mouseover(function(){   //鼠标放到轮播图上停止自动播放
		clearInterval(autoPlay);
	}).mouseleave(function(){       //鼠标离开轮播图开始自动播放
		autoPlay=setInterval(function(){
			next();
		},2000);
	})
//~~~~~~~~~~~下一张
	function next(){
		isRun=false;
		index++;
		if(index >= imgs.length){
			index=0;
		}
		chang_list(index)
		$('.banner .clearfix').animate({left:'-100%'},500,function(){
			$(this).css({left:0});
			$(this).append($('.banner .imgs').first());
			isRun=true;
		})
	}
//~~~~~~~~~~~上一张
	function prev(){
		isRun=false;
		index--;
		if(index<0){
			index=imgs.length-1;
		}
		chang_list(index)
		$('.banner .clearfix').prepend($('.banner .imgs').last());
		$('.banner .clearfix').css('left','-100%').animate({
			left:0
		},500,function(){
			isRun=true;
		})
	}
//~~~~~~~~~~~绑定按钮事件	
	$('.banner .right').click(function(){
		if(isRun){
			next()
		}
	})
	$('.banner .left').click(function(){
		if(isRun){
			prev()
		}
	})
	function chang_list(index){
		$('.banner .index_list li').eq(index).addClass('active').siblings().removeClass('active');
	}
})

//~~~~~~~~~~~~~~~~请求成长历程数据~~~~~~~~~~~~~~~~~
//	$(function(){
//		$.ajax({
//			type:"post",
//			datatype:'json',
//			url:"info.json",
//			async:true,
//			success:function(data){
//				console.log(date)
//			}
//		});
//		
//		
//		
//	})
//~~~~~~~~~~~~~~~~~~~~~如果浏览器窗口过大，提前显示日志内容~~~~~~~~~~~~~~~~~~
	$(function(){
		var wintop=$(window).height();
		var logtop=$('.log .log_type  .run').offset().top;
		if(wintop>logtop){
			for(i=0;i<$('.log .log_type .run').length;i++){
				$('.log .log_type .run').eq(i).animate({
					opacity:1,
					top:120
				},800)
			}
		}
	})
//~~~~~~~~~~~~~~~~~~~监测滚轮高度~~~~~~~~~~~~~~~
	$(function(){
		$(document).scroll(function(){
			var bannertop=$('.banner .content').offset().top;
			$('.banner').offset().top=--bannertop;
			
			
			var wintop=$(window).scrollTop();
			var logtop=$('.log .log_type').offset().top;
			//~~~~~~日志动画~~~~~~~~~~
			for(i=0;i<$('.log .log_type .run').length;i++){
				if(wintop>logtop/3+20*i){
					$('.log .log_type .run').eq(i).animate({
						opacity:1,
						top:120
					},800)
				}
			}
			//~~~~~~关于我们动画~~~~~~~~~~
			var aboutus_logotop=$('.aboutus .logo_small').offset().top;
			if(wintop>aboutus_logotop/3+100){
				$('.aboutus .logo_small').animate({
					opacity:1,
					top:40
				},1000)
			}
			var aboutus_infotop=$('.aboutus .right_content .run').offset().top;
			for(i=0;i<$('.aboutus .right_content').children().length;i++){
				if(wintop>aboutus_infotop/2+(40*i)){
					$('.aboutus .right_content').children().eq(i).animate({
						opacity:1,
						top:0
					},1000)
				}
			}
			//~~~~~~最新案例动画~~~~~~~~~~
			var newstitletop=$('.news .logo_small').offset().top;
			var newsinfotop=$('.news .news_list').offset().top;
			if(wintop>newstitletop/2+200){
				$('.news .logo_small').animate({
					opacity:1,
					top:40
				},1000)
			}
			for(i=0;i<$('.news .news_type').children().length;i++){
				if(wintop>newstitletop/2+(200-30*i)){
					$('.news .news_type').children().eq(i).animate({
						opacity:1,
						top:0
					},1000)
				}
			}
			for(i=0;i<$('.news .news_list').children().length;i++){
				if(wintop>newsinfotop/2+500+50*i){
					$('.news .news_list').children().eq(i).animate({
						opacity:1,
						top:20
					},1000)
				}
			}
			
			//~~~~~~最新咨询动画~~~~~~~~~~
			var info_logotop=$('.info .logo_small').offset().top;
			var info_listtop=$('.info .info_log').offset().top;
			var info_typelisttop=$(".info .type").offset().top;
			if(wintop>info_logotop/2+500){
				$('.info .logo_small').animate({
					opacity:1,
					top:0
				},1000)
			}
			for(i=0;i<$('.info .info_log').children().length;i++){
				if(wintop>info_listtop/2+800+40*i){
					$('.info .info_log').children().eq(i).animate({
						opacity:1,
						top:20
					},1000)
				}
			}
			for(i=0;i<$('.info .type').children().length;i++){
				if(wintop>info_typelisttop/2+800+40*i){
					$('.info .type').children().eq(i).animate({
						opacity:1,
						top:0
					},1000)
				}
			}
			//~~~~~~页脚动画~~~~~~~~~~
			var callmetop=$(".callme .callme_way").offset().top;
			var servicetop=$(".callme .callme_list").offset().top;
			for(i=0;i<$('.callme .callme_way').children().length;i++){
				if(wintop>callmetop/2+800+40*i){
					$('.callme .callme_way').children().eq(i).animate({
						opacity:1,
						top:0
					},1100)
				}
			}
			for(i=0;i<$('.callme .callme_list').children().length;i++){
				if(wintop>servicetop/2+800+40*i){
					$('.callme .callme_list').children().eq(i).animate({
						opacity:1,
						top:20
					},1200)
				}
			}
			
			
			
			
		})
})
//~~~~~~~~~~~~~~~~~咨询板块~~~~~~~~~~~~~~~~~
	//~~~~~~~小圆点和信息类型切换绑定
	$(function(){
		var isClick=true;
		var index=0;
		$(".info .type div").click(function(){
			if(isClick){
				isClick=false;
				$(this).addClass('active').siblings().removeClass('active');
				index=$(this).index();
				$(".info .index_list li").eq(index).addClass('active').siblings().removeClass('active');
				change(index);
			}
		})
		$(".info .index_list li").click(function(){
			if(isClick){
				isClick=false;
				$(this).addClass('active').siblings().removeClass('active');
				index=$(this).index();
				$(".info .type div").eq(index).addClass('active').siblings().removeClass('active');
				change(index);
			}
		})
		//对应的显示内容动画出现
		function change(index){
			$(".info .info_list .info_log").eq(index).show().stop().animate({top:0,opacity:1},1000).siblings().css({top:80,opacity:0}).hide();
			setTimeout(function(){
				isClick=true;
			},1000);
		}
	})
	
//~~~~~~~~~~~~~~~~~案例图片信息动画~~~~~~~~~~~~~~~~~
	$(document).ready(function(){
		$('.news .news_list .imgs>div').hover(function(){
			$(this).find('.img_info').stop().animate({opacity:1,top:0},200);
		}).mouseleave(function(){
			$(this).find('.img_info').stop().animate({opacity:0,top:"100%"},200);
		})
	})
