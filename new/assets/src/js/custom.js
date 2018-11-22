
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



