(function(window, undefined) {
    'use strict';
	
	var table,index;
	var tab = $(".tabs>input:checked").attr('id');
	var checkTime=false;
	var checkDate=false;
	var checkCabinet=false;
	var check2=false;
	var check3=false;
	
	switch (tab) { 
		case 'tab2': 
			table="#content-tab2";
			break;
		case 'tab3': 
			table="#content-tab3";
			break;
		case 'tab4': 
			table="#content-tab4";
			break;		
		default:
			table="#content-tab1";		
		}
		
	index = $(table).index();	
	console.log(index);
	
	$("label").on("click", function(e){

		var clickTab=$(this).attr("id");
		
		switch (clickTab) { 
		case 'tab22': 
			table="#content-tab2";
			break;
		case 'tab33': 
			table="#content-tab3";
			break;
		case 'tab44': 
			table="#content-tab4";
			break;		
		default:
			table="#content-tab1";		
		}
		
		index = $(table).index();	
		console.log(index);
	});
	
	$("#submit").on("click",function(){
		var testCheckbox;
		var x1=0;
		var x2=0;
		
		$(".checked").fadeOut('slow',function(){});
		$(".checkedTable").fadeOut('slow',function(){});
		
		$(table).find(".tablefilter").removeClass("checkedTable");
		
		 var firstValue = $("#before").val().split('-');
		 var secondValue = $("#after").val().split('-');
		 
		 firstValue[2]=firstValue[2];
		 secondValue[2]=secondValue[2];
		 
		 var firstDate=new Date();
		 firstDate.setFullYear(firstValue[2],(firstValue[1] - 1 ),firstValue[0]);
		 
		 console.log(firstDate);
		 
		 var secondDate=new Date();
		 secondDate.setFullYear(secondValue[2],(secondValue[1] - 1 ),secondValue[0]);  
		 
		 console.log(secondDate);
		 
		 var tab = $(".tabs>input:checked").attr('id');
		 console.log(tab);
		 
		if($("#show").prop("checked")){
			testCheckbox=true;
		} 
		else{
			testCheckbox=false;
		}
		 
		 $(table).find(".tablerow").each(function(index) {
			 $(this).find("tr").fadeOut('fast',function(){});
			 if(true){
				 $(this).removeClass("checked");
				 
				 if (x1==0){
					 $(table).find(".tablefilter").removeClass("checkedTable");
					 x1=1;
				 }
				 
				if((testCheckbox)&&($(this).children("td:eq(2):contains(.)").text()=="")){
					$(this).addClass("checked");
					$(table).find(".tablefilter").addClass("checkedTable"); 
				}
				else{
					$(this).remove("checked");
				}
				 
				if($(this).children("td:eq(2):contains(.)").text()!=""){
					
				 var Value = $(this).find("td:eq(2):contains(.)").text().split('.');
				 
				 console.log("Value: "+Value);
				 
				 var ValueDate=new Date();
				 ValueDate.setFullYear(Value[2],(Value[1] - 1 ),Value[0]);
				 
				 console.log(ValueDate);
				 if ((ValueDate>=firstDate)&&(ValueDate<=secondDate))
				  {
					  if(x2==0){
						$(table).find(".tablefilter").addClass("checkedTable");  
						x2=1;
					  }
					
					$(this).addClass("checked");
					
					console.log($(this));
				  } 
				};
			 }
		 });
		 
		 $(".tablerow").fadeOut('slow',function(){});
		 
		 $(".checkedTable").fadeIn('slow',function(){});
		 $(".checked").fadeIn('slow',function(){});
		 
		 if ((firstDate == "Invalid Date")||(secondDate == "Invalid Date")){
			 $(table).find(".tablefilter").fadeOut('fast',function(){});
			$(".error").html("Проверьте введённые даты.");
			$(".addnew").fadeOut('fast',function(){});
		 }
		 else if($(".checked").length==0){
			$(table).find(".tablefilter").fadeOut('fast',function(){});
			$(".error").html("Лекции не найдены."); 
			$(".addnew").fadeOut('fast',function(){});			
		 }
		 else{
			$(".error").html(""); 
		 }
	});
	
	$('.tablefilter').on('click', '.edit', function(e){ 
		var t = e.target || e.srcElement;
		var elm_name = t.tagName.toLowerCase();
		
		if(elm_name == 'input')	{return false;}
		else if(elm_name=='a'){return false;}
		
		var href=$(this).find("a").attr("href");
		$(this).find("a").removeAttr("href");
		
		var val = $(this).html();
		console.log(val);
		
		var indexOf=$('.time').index($(this));
		
		var cls=$(this).attr("class");
		console.log(cls);
		
		var code = '<input type="text" id="edit" value="'+val+'"/>';
		$(this).html(code);
		var oldval = $("#edit").val();
		href=oldval.replace('<a>','<a href="'+href+'">');
		var newval = $("#edit").val(href);
		
		$("#edit").focus();
		$("#edit").blur(function()	{
			var val2 = $(this).val();
			var output = localStorage['saveVal'];
			var indexOf2;
			var index = $(".my_select").index($(this));
			var targetValue = $(this).val();
			var time=$(".tablerow:eq("+index+")").find(".time").text();
			var date=$(".tablerow:eq("+index+")").find(".date").text();
			var cab=$(".tablerow:eq("+index+")").find(".my_select").val();
			checkCabinet=false;
			checkTime=false;
			checkDate=false;
			check2=false;
			check3=false;
			
			if(~cls.indexOf("time")){
				$(table).find(".time").each(function(ind) {
					var indexOf2 = $('.time').index($(this));
					//alert($(this).index());
					if((val2==$(this).text())&&(indexOf!=indexOf2)){
						check2=true;
					}
				});
				$("section").find(".date").each(function() {
					indexOf2 = $('.date').index($(this));

					if((date==$(this).text())&&(index!=indexOf2)){
						check3=true;
					}
				});
				if(check2&&check3){
					alert("Время уже занято!");
					val2=val;
				}
			}
			if((~cls.indexOf("time"))||(~cls.indexOf("date"))){
				$("section").find(".time").each(function() {
					indexOf2 = $('.time').index($(this));

					if((time==$(this).text())&&(index!=indexOf2)){
						checkTime=true;
					}
				});
				$("section").find(".date").each(function() {
					indexOf2 = $('.date').index($(this));

					if((date==$(this).text())&&(index!=indexOf2)){
						checkDate=true;
					}
				});
				$("section").find(".my_select").each(function() {
					indexOf2 = $('.my_select').index($(this));
					
					if((cab==$(this).val())&&(index!=indexOf2)){
						checkCabinet=true;
					}
				});
				if(checkCabinet&&checkTime&&checkDate){
					alert("Невозможно провести лекцию. Проверьте дату, время и кабинет. ");
					val2=val;
				}
			}
			$(this).parent().empty().html(val2);
		});
		
	});
	
	$(".my_select").click(function(){
		var saveVal=$(this).val();
			if (window['localStorage']) {
				localStorage.setItem("saveVal", saveVal);
			}
	});
	
	 $(".my_select").on('change', function(){
		var output = localStorage['saveVal'];
		var indexOf2;
		var index = $(".my_select").index($(this));
		var targetValue = $(this).val();
		var time=$(".tablerow:eq("+index+")").find(".time").text();
		var date=$(".tablerow:eq("+index+")").find(".date").text();
		var cab=$(".tablerow:eq("+index+")").find(".my_select").val();
		checkCabinet=false;
		checkTime=false;
		checkDate=false;

				$("section").find(".time").each(function() {
					indexOf2 = $('.time').index($(this));

					if((time==$(this).text())&&(index!=indexOf2)){
						checkTime=true;
					}
				});
				$("section").find(".date").each(function() {
					indexOf2 = $('.date').index($(this));

					if((date==$(this).text())&&(index!=indexOf2)){
						checkDate=true;
					}
				});
				$("section").find(".my_select").each(function() {
					indexOf2 = $('.my_select').index($(this));
					
					if((cab==$(this).val())&&(index!=indexOf2)){
						checkCabinet=true;
					}
				});	
				
		if(checkCabinet&&checkTime&&checkDate){
			alert("Невозможно провести лекцию. Проверьте дату, время и кабинет. ");
			$(".my_select:eq("+index+")").val(output);
		}
		localStorage.removeItem("saveVal");
	});
	
	$(document).ready(function(){
	   $('.tablefilter').on('click', 'a', function(e){ 
		var t = e.target || e.srcElement;
		var elm_name = t.tagName.toLowerCase();
		
		var href=$(this).find("a").attr("href");
		$(this).find("a").removeAttr("href");
		
		var val = $(this).html();
		
		var code = '<input type="text" id="edit" value="'+val+'"/>';
		$(this).html(code);
		var oldval = $("#edit").val();
		href=oldval.replace('<a>','<a href="'+href+'">');
		var newval = $("#edit").val(href);
		
		$("#edit").focus();
		
		$("#edit").blur(function()	{
			var val = $(this).val();
			$(this).parent().empty().html(val);
		});
	   });
	 });
	
	$(".addnew").click(function(){
		$(table).find('tr:last').after('<tr class="tablerow"><td width="25%" class="edit"><a href="https://events.yandex.ru/lib/talks/4162/">Лекция</a></td><td width="20%" class="edit">Ведущий</td><td width="10%" class="edit">Дата</td><td width="10%" class="edit time">22:00</td><td width="15%" class="edit">Адрес</td><td width="10%" class="cabinet" data-title="Номер кабинета - вместимость человек"><select id="my_select" name="my_select"><option value="1">1к-72ч.</option><option value="2">2к-34ч.</option><option value="3">3к-31ч.</option><option value="4">4к-38ч.</option><option value="5">5к-53ч.</option><option value="6">6к-23ч.</option><option value="7">7к-29ч.</option><option value="8">8к-23ч.</option><option value="9">9к-18ч.</option><option value="10">10к-71ч.</option></select></td><td width="10%" class="edit link"><a href="https://events.yandex.ru/lib/talks/4162/">Ссылка</a></td></tr>');
	});
	
	$(window).keydown(function(event){
		if(event.keyCode == 13) {	
			$('#edit').blur();	
		}
});
	
})(window);