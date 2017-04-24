	var targetValue=1; 
	var table1 = document.getElementById("tablefilter1");
	var table2 = document.getElementById("tablefilter2");
	var table3 = document.getElementById("tablefilter3");
	var text1=document.getElementById("textfilter1");
	var text2=document.getElementById("textfilter2");
	var text3=document.getElementById("textfilter3");
	var tableoff,table,trow,textoff,textoff2,text;
	var check=false;

	var sel = document.getElementById("my_select");
	sel.onchange = function() {
		check=true;
		targetValue = sel.value;
		if (targetValue==1){
			table1.style.display = "";
			table2.style.display = "none";
			table3.style.display = "none";
			text2.style.display = "none";
			text1.style.display = "";
			text3.style.display = "none";
		}
		else if(targetValue==2){
			table1.style.display = "none";
			table2.style.display = "";
			table3.style.display = "none";
			text1.style.display = "none";
			text2.style.display = "";
			text3.style.display = "none";
		}
		else{
			table3.style.display = "";
			table2.style.display = "none";
			table1.style.display = "none";
			text2.style.display = "none";
			text3.style.display = "";
			text1.style.display = "none";
		}
	};
	
   	function filter2 (phrase){
		if(check==false){
			table3.style.display = "none";
			table2.style.display = "none";
			text2.style.display = "none";
			text3.style.display = "none";
		}
		var words = phrase.value.toLowerCase().split(" ");
		if(targetValue==1){
			trow=table1.rows.length;
			table = table1;
			textoff=text2;
			textoff2=text3;
			text=text1;
		}
		else if(targetValue==2){
			trow=table2.rows.length;
			table = table2; 
			textoff=text1;
			textoff2=text3;
			text=text2
		}
		else{
			trow=table3.rows.length;
			table = table3; 
			textoff=text2;
			textoff2=text1;
			text=text3;
		}
		for (var r = 0; r < trow; r++){ 
			var cellsV1 = table.rows[r].cells[1].innerHTML.replace(/<[^>]+>/g,"");
			var cellsV2 = table.rows[r].cells[2].innerHTML.replace(/<[^>]+>/g,"");
			//var cellsV3 = table.rows[r].cells[3].innerHTML.replace(/<[^>]+>/g,"");
			var cellsV = [cellsV1,cellsV2].join(" ");
		    var displayStyle = 'none';
		    for (var i = 0; i < words.length; i++) {
			if (cellsV.toLowerCase().indexOf(words[i])>=0)
				displayStyle = ''; 
			else {
				displayStyle = 'none'; 
				break;
			}
			}
		table.rows[r].style.display = displayStyle;
		textoff.style.display = "none";
		textoff2.style.display = "none";
		text.style.display="";
		}
	}