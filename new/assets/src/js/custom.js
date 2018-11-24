
/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
		// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));


/* загружаем остальные стили асинхронно */

loadCSS( "assets/build/css/index.css" );


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

		// если это мобильное меню
		if(document.querySelector('header .nav-bar'))
		{
			document.querySelector('.drawer').classList.toggle('visible');	
			document.querySelector('.veil').classList.toggle('visible');
			document.querySelector('#nav-icon3').classList.toggle('open');
		}
		


	});

});  // .navlinks forEach

/*
*
*
*	MODAL WINDOWS
*
*/

// если это десктоп

if(document.querySelector('header a.map'))
{
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

}

/*
*
*	Модальное окно "Записаться на пробное занятие"
*/

if(document.querySelector('.try-button'))
{
	let zapis_modal = document.querySelector('.modal-area .zapis-modal');
	let open_button = document.querySelector('.shock .try-button');
	let close_button = document.querySelector('.zapis-modal span.close');

	open_button.onclick = function(e) {
		e.preventDefault();
	    zapis_modal.style.display = "block";
	}

	close_button.onclick = function(e) {
		e.preventDefault();
	    zapis_modal.style.display = "none";
	}


}

/*
*
*	Модальное окно "Заказать звонок"
*
*/

if(document.querySelector('.why'))
{
	let zakaz_modal = document.querySelector('.modal-area .zakaz-modal');
	let open_button = document.querySelector('.why .try-button');
	let close_button = document.querySelector('.zakaz-modal span.close');

	open_button.onclick = function(e) {
		e.preventDefault();
	    zakaz_modal.style.display = "block";
	}

	close_button.onclick = function(e) {
		e.preventDefault();
	    zakaz_modal.style.display = "none";
	}


}


// анимация крестика и открытие меню в мобильном меню
if(document.querySelector('header .nav-bar'))
{
	document.querySelector('#nav-icon3').addEventListener('click', function(){
		this.classList.toggle('open');
		//console.log('hi');

		document.querySelector('.drawer').classList.toggle('visible');	
		document.querySelector('.veil').classList.toggle('visible');	
	});

	document.querySelector('.veil').addEventListener('click', function(){
		document.querySelector('.drawer').classList.toggle('visible');	
		document.querySelector('.veil').classList.toggle('visible');
		document.querySelector('#nav-icon3').classList.toggle('open');
	});
}

// ссылки на отдельные лендинги преподавателей

document.querySelectorAll('.repetitors .items .item').forEach(function(e){
	e.addEventListener('click', function(){
		window.location.href = e.querySelector('.descr').getAttribute('data-link');
		//console.log(el);
	});
})


// отравка данных с модальных форм

function zapis_modal()
{
	//console.log('hi');
	xhr = new XMLHttpRequest();

	var phone = encodeURIComponent(document.querySelector('.zapis-modal input[name="ori"]').value);
	var subject =document.querySelector('.zapis-modal select');
		subject = subject.options[subject.selectedIndex].text;
    	subject = encodeURIComponent(subject);

	var body = 'phone=' + phone + '&subject=' +subject + '&type=zapis';

	xhr.open('POST', 'assets/src/send.php');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        //alert('Something went wrong.  Name is now ' + xhr.responseText);
	        console.log(xhr.responseText);

	        if(xhr.responseText == 'ok')
	        {
	        	document.querySelector('.zapis-modal .modal-content').innerHTML =
	        		'<div class="result">' 
	        		+'<p class="mark">✔</p>'
	        		+'<p>Успешно отправлено</p>'
	        		+'<p><small>Пожалуйста, ожидайте звонка менеджера</small></p>'
	        		+'</div>';
	        		yaCounter50071654.reachGoal('form');
	        } else if(xhr.responseText == 'error')
	        {
	        	document.querySelector('.zapis-modal .modal-content').innerHTML =
	        		'<div class="result">' 
	        		+'<p class="error">✘</p>'
	        		+'<p>Ошибка отправки</p>'
	        		+'<p><small>Пожалуйста, сообщите нам об этом по тел.: +375 29 618 80 90</small></p>'
	        		+'</div>';
	        }
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send(body);
}

function zakaz_modal()
{
	xhr = new XMLHttpRequest();

	var phone = encodeURIComponent(document.querySelector('.zakaz-modal input[name="phone"]').value);

	var body = 'phone=' + phone + '&type=zakaz';

	xhr.open('POST', 'assets/src/send.php');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        //alert('Something went wrong.  Name is now ' + xhr.responseText);
	        console.log(xhr.responseText);

	        if(xhr.responseText == 'ok')
	        {
	        	document.querySelector('.zakaz-modal .modal-content').innerHTML =
	        		'<div class="result">' 
	        		+'<p class="mark">✔</p>'
	        		+'<p>Успешно отправлено</p>'
	        		+'<p><small>Пожалуйста, ожидайте звонка менеджера</small></p>'
	        		+'</div>';
	        		yaCounter50071654.reachGoal('form');
	        } else if(xhr.responseText == 'error')
	        {
	        	document.querySelector('.zakaz-modal .modal-content').innerHTML =
	        		'<div class="result">' 
	        		+'<p class="error">✘</p>'
	        		+'<p>Ошибка отправки</p>'
	        		+'<p><small>Пожалуйста, сообщите нам об этом по тел.: +375 29 618 80 90</small></p>'
	        		+'</div>';
	        }
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send(body);

}

function proba_form()
{


	var userName = encodeURIComponent(document.querySelector('.form.container input[name="userName"]').value);
	var userPhone = encodeURIComponent(document.querySelector('.form.container input[name="userPhone"]').value);

	xhr = new XMLHttpRequest();

	xhr.open('POST', 'assets/src/send.php');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        //alert('Something went wrong.  Name is now ' + xhr.responseText);
	        console.log(xhr.responseText);

	        if(xhr.responseText == 'ok')
	        {
	        	document.querySelector('.form.container .result').innerHTML =
	        		'<div class="result">' 
	        		+'<p class="mark">✔</p>'
	        		+'<p>Успешно отправлено</p>'
	        		+'<p><small>Пожалуйста, ожидайте звонка менеджера</small></p>'
	        		+'</div>';
	        	yaCounter50071654.reachGoal('form');	

	        	document.querySelector('.form.container input[name="userName"]').value = '';	
	        	document.querySelector('.form.container input[name="userPhone"]').value = '';	
	        } else if(xhr.responseText == 'error')
	        {
	        	document.querySelector('.form.container .result').innerHTML =
	        		'<div class="result">' 
	        		+'<p class="error">✘</p>'
	        		+'<p>Ошибка отправки</p>'
	        		+'<p><small>Пожалуйста, сообщите нам об этом по тел.: +375 29 618 80 90</small></p>'
	        		+'</div>';
	        }
	    }
	    else if (xhr.status !== 200) {
	        alert('Request failed.  Returned status of ' + xhr.status);
	    }
	};

	var subject0 = document.querySelector('.form.container form select.initialSelect');
		subject0 = subject0.options[subject0.selectedIndex].text;
	
	var object = 
	{
		name:userName,
		phone:userPhone,
		subject0:subject0
	}

	document.querySelectorAll('.form.container form select[class^="off"]').forEach(function(e, index){

		index++;

		let selected = e.options[e.selectedIndex].hasAttribute('default');
		if(!selected)
		{
			object['subject'+index] = e.options[e.selectedIndex].text;
		}
	})

	//console.log(object);
	xhr.send(JSON.stringify(object));


	
} // proba_form()

/*
*
*
* Зафигачим яндекс-метрику
*
*/

(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter50071654 = new Ya.Metrika2({ id:50071654, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/tag.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks2");


/*
*
*
*	Добавляем предметы в футер лидформу
*/

var add_button = document.querySelector('.form.container form a.add');
add_button.addEventListener('click', function(e){
	e.preventDefault();
	let string5 = ''+
		'<select class="off5">'
		+ '<option selected default>Добавить предмет (-5% скидка)</option>'
		+ '<option>Русский язык</option>'
		+ '<option>Биология</option>'
		+ '<option>История Беларуси</option>'
		+ '<option>Физика</option>'
		+ '<option>Французский</option>'
		+ '<option>Математика</option>'
		+ '<option>Химия</option>'
		+ '<option>География</option>'
		+ '<option>Белорусский</option>'
		+ '<option>Обществоведение</option>'
		+ '<option>Английский</option>'
		+ '<option>Немецкий</option>'
		+ '</select>'
		+ '<a class="remove" href="#">-</a>'
	;
	if(document.querySelector('select.off5'))
	{
		let string10 = ''+
		'<select class="off10">'
		+ '<option selected default>Добавить предмет (-10% скидка)</option>'
		+ '<option>Русский язык</option>'
		+ '<option>Биология</option>'
		+ '<option>История Беларуси</option>'
		+ '<option>Физика</option>'
		+ '<option>Французский</option>'
		+ '<option>Математика</option>'
		+ '<option>Химия</option>'
		+ '<option>География</option>'
		+ '<option>Белорусский</option>'
		+ '<option>Обществоведение</option>'
		+ '<option>Английский</option>'
		+ '<option>Немецкий</option>'
		+ '</select>'
		+ '<a class="remove" href="#">-</a>'
	;
		document.querySelector('.form.container form input[type="submit"]').insertAdjacentHTML('beforebegin', string10);
	}
	else 
	{
		document.querySelector('.form.container form input[type="submit"]').insertAdjacentHTML('beforebegin', string5);
	}
	
});


document.querySelector('.form.container form').addEventListener('click', function(e){
	
	
    if(e.target && e.target.classList == 'remove')
    {
    	e.preventDefault();

    	e.target.parentNode.removeChild(e.target.previousElementSibling);
    	e.target.parentNode.removeChild(e.target);
 	}
	
 });	