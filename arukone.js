var iskoristeno=[];
var brojPuzzle;
var bojaPuzzle=[];
var velicinaPuzzle=puzzle[brojPuzzle].A_row.length;

$( document ).ready( function() {
	$( "#btn" ).on( "click", crtaj_polje );
	$( "body" ).on( "change", "input[type=radio][name=color]",function(){
		$(this).attr("checked", true );
		console.log( $(this) );
	});
  $( "body" ).on( "mousedown", "td", "p", function(event){
		var trenutnaBoja = $("input[type='radio'][name='color']:checked").val();
		var id = Number($(this).attr("id"));
		var i = Math.floor(id/10), j = id%10; //zasto10

		if( event.button === 0 && matrica_boja[i][j] === "#F0F0F0" && trenutnaBoja!== undefined ){
      bojaPuzzle[i][j] = trenutnaBoja;
			obojaj_polje(); //lijevi klik
		}
		if( event.button === 2 && matrica_boja[i][j] !== "#F0F0F0" && !provjera(i+1,j+1) ){
			bojaPuzzle[i][j] = "#F0F0F0";
			obojaj_polje(); //desni klik
		}
		update_progress();

	});
});

function odabir_tezine(){
	var tezinaSelect = $("#tezina").val();
	var brojPuzzle = null;
  var n = puzzle.length;
	for( var i = 0; i < n; i ++ ){
		if( puzzle[i].name === tezinaSelect ) {
			brojPuzzle = i;
			break;
		}
	}
	if( brojPuzzle === null ){
		console.log("Nismo pronašli igru!");
		throw new Error();
	}
	return brojPuzzle;
}

function provjera( i, j ){ //provjera da je zvjezdica
	for( var ind = 0; ind< puzzle[brojPuzzle].color.length; ind++ ){
		if( i === puzzle[brojPuzzle].A_row[ind] && j === puzzle[brojPuzzle].A_col[ind] ){
      return true;
    }
		if( i === puzzle[brojPuzzle].B_row[ind] && j === puzzle[brojPuzzle].B_col[ind] ){
      return true;
    }
	}
	return false;
}
function crtaj_polje(){
	brojPuzzle = odabir_tezine();
	var n = puzzle[brojPuzzle].size;
	var br = puzzle[game_index].color.length;
	matricu_boja();

	//idemo sve ispočetka pa očistimo ispis i storage
	$("#polje_igre").html("");
	sessionStorage.clear();
	$("#restart").html("");

  //let body = document.getElementsByTagName("body")[0];
  let tble = document.createElement("table");
  var c=1;
  for (let i = 1; i <= n; i++) {
    var row = document.createElement("tr");
    for (let j = 1; j <= n; j++) {
      var cell = document.createElement("td");
      var cellText = document.createTextNode(" ");
      cell.appendChild(cellText);
      row.appendChild(cell);
      var naziv=(c++);
      cell.setAttribute("id",naziv);
    }
    tble.appendChild(row);
  }
  $("#polje_igre").append(tble);

  $("table").css("margin-left","auto").css("margin-right","auto");
  $("table")css("width","400px").css("text-align", "center").css("vertical-align","middle");
  $("table").css("padding","5px").css("position","relative");
  //$("tr").css("width","50px");
  var d = Math.floor( 500/ n);
  $("td").css("height",d + "px").css("width", d + "px");
  $("td").css("background-color", "rgb(217, 217, 217)" ).css("text-align", "center");
  $("td").css("vertical-align","middle").css("padding","5px").css("position","relative");

  //postavimo boje
  obojaj();

  //dodamo boje koje može odabrati
  ispisi_boje();


}
