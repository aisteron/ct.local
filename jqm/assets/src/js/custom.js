console.log('hi, i`m jqm');

function smooth_scroll(e)
{
	e.addEventListener('click', function(n){
		n.preventDefault();
		let href = e.getAttribute('href').replace('#','');
		let name = document.querySelector('a[name="'+href+'"]');

		if(name)
		{
			name.scrollIntoView({  behavior: 'smooth' });
		} else 
		{
			console.log('Якорь для скроллинга не найден');
		}
	})
}

document.querySelectorAll('a[href="#schedule"]').forEach(function(e){ smooth_scroll(e); })

document.querySelectorAll('a[href="#subjects"]').forEach(function(e){ smooth_scroll(e); })



/* Переименовывание Collapse Header*/


function rename_header(e)
{

	if(e.classList.contains('ui-collapsible-heading-collapsed'))
	{
		
		e.innerHTML='<a href="#" class="ui-collapsible-heading-toggle ui-btn ui-icon-carat-u ui-btn-icon-right ui-btn-inherit">Свернуть<span class="ui-collapsible-heading-status"> click to collapse contents</span></a>';
	}
	else 
	{
		e.innerHTML='<a href="#" class="ui-collapsible-heading-toggle ui-btn ui-icon-carat-d ui-btn-icon-right ui-btn-inherit">Развернуть<span class="ui-collapsible-heading-status"> click to collapse contents</span></a>';
	}
}

document.querySelectorAll('.ui-collapsible-heading').forEach(function(item){
	
	item.addEventListener('click', function(){
		rename_header(item);
		

	})
})

document.querySelectorAll('.col-wrap h4').forEach(function(e){
	//console.log(e);

	e.addEventListener('click', function(){
		rename_header(e);
		

	})
})