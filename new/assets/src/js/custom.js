/*кликаем на вопросы*/
var questions = document.querySelectorAll('.question-area ul li');

questions.forEach(function(e){
	
	e.addEventListener('click', function(){

		let attr = this.className.match(/\d+/)[0];
		showMe(attr);

	});
	
});

/*прячем ответы изначально*/
var answers = document.querySelectorAll('.answer-area ul li');

answers.forEach(function(e, i){
	if(i < 1) return;
	e.classList.add("hidden");
});

/*прячем/показываем */
function showMe(attr)
{
	let answers = document.querySelectorAll('.answer-area ul li');
	answers.forEach(function(e){  e.classList.add('hidden'); });
	
	
	let active = document.querySelector('.answer-area ul li.a'+attr);
	active.classList.remove('hidden');


	/*активная кнопка оранжевая */
	let questions = document.querySelectorAll('.question-area ul li');
	questions.forEach(function(e){
		e.classList.remove('active');
	});

	let current = document.querySelector('.question-area ul li.q'+attr);
	current.classList.add('active');
}

function initMap() 
{
	var center = {lat:53.912709, lng:27.576008}
	var map = new google.maps.Map(document.querySelector('.map-inner'), {
		zoom: 15,
		center: center,
		disableDefaultUI: true
	});

	var marker = new google.maps.Marker({
    position: center,
    title:"Фабрика Знаний"
	});

	marker.setMap(map);

	/*
	*
	*	create modal map
	*/

	var modal_center = {lat:53.912709, lng:27.576008}
	var modal_map = new google.maps.Map(document.querySelector('.map-modal .map-container'), {
		zoom: 15,
		center: center,
		disableDefaultUI: true
	});

	var modal_marker = new google.maps.Marker({
    position: center,
    title:"Фабрика Знаний"
	});

	modal_marker.setMap(modal_map);

	/*подпись к маркеру*/

	var contentString = '<div class="map-info-window">'+
						'<h3>Фабрика знаний</h3>'
						+'<p>прт. Машерова, 10, оф. 302 - 304</p>'
						+'</div>';
	var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
    modal_marker.addListener('click', function() {
          infowindow.open(modal_map, modal_marker);
        });    					





}


/*скользим по якорям*/

var navlinks = document.querySelectorAll('.menu ul li a');

navlinks.forEach(function(e){

	e.addEventListener('click', function(c){
		c.preventDefault();
		//console.log(this);

		let href = this.getAttribute('href').replace('#','');

		let name = document.querySelector('a[name="'+href+'"]');
		if(name)
		{
			name.scrollIntoView({  behavior: 'smooth' });
		} else 
		{
			console.log('не нашел якорь');
		}
		


	});

});  // .navlinks forEach

/*
*
*
*	MODAL WINDOWS
*
*/


var map_modal = document.querySelector('.modal-area .map-modal');

var header_map_link = document.querySelector('header a.map');
var map_modal_close = document.querySelector('.map-modal span.close');

var not_open_yet = false;

header_map_link.onclick = function(e) {
    e.preventDefault();
    map_modal.style.display = "block";
    
    if(!not_open_yet)
    {
		let script = document.createElement('script');
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAg0zBibsnBJ924LAMLUZgiu2o7N-LaDSY&callback=initMap';
		script.type = 'text/javascript';
		document.body.parentNode.appendChild(script);
		not_open_yet = true;
    }


}

map_modal_close.onclick = function(e) {
    e.preventDefault();
    map_modal.style.display = "none";
}


/*
*
* load script by click in header
*
*/



