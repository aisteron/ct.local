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

	marker.setMap(map)
}        