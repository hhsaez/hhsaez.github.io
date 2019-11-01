function populateSocial() {
	var social = [
		{
			"title": "Github",
			"url": "https://github.com/hhsaez",
			"img": "img/social/github.png"
		},
		{
			"title": "Twitter",
			"url": "https://twitter.com/hhsaez",
			"img": "img/social/twitter.png"
		},
		{
			"title": "Instagram",
			"url": "https://www.instagram.com/hhsaez",
			"img": "img/social/instagram.png"
		},
		{
			"title": "Itch.io",
			"url": "https://hhsaez.itch.io",
			"img": "img/social/itchio.png"
		},
		{
			"title": "Youtube",
			"url": "https://www.youtube.com/channel/UCveOzTueH0PaRaBEpYQPSgA",
			"img": "img/social/youtube.png"
		},
		{
			"title": "LinkedIn",
			"url": "https://www.linkedin.com/in/hhsaez",
			"img": "img/social/linkedin.png"
		},
		{
			"title": "Facebook",
			"url": "https://facebook.com/hhsaez",
			"img": "img/social/facebook.png"
		},
		{
			"title": "DeviantArt",
			"url": "https://hhsaez.deviantart.com/",
			"img": "img/social/deviantart.png"
		}
	];

	var cs = document.getElementsByClassName( "social" );
	for ( var i = 0; i < cs.length; i++ ) {
		if ( cs ) {
			populateSocialContainer( cs[ i ], social );
		}
	}
}

function populateSocialContainer( container, data )
{
	if ( container == null ) {
		return;
	}
	
	container.classList.add( "container" );
	container.classList.add( "justify-content-center" );
	
	var row = document.createElement( "div" );
	row.classList.add( "row" );
	row.classList.add( "justify-content-center" );
	row.classList.add( "social-row" );

	var padding = function()
	{
		var div = document.createElement( "div" );
		div.classList.add( "col-sm" );
		div.innerHTML = "&nbsp;";
		return div;
	}

	row.appendChild( padding() );

	for ( var i in data ) {
		var link = data[ i ];

		var col = document.createElement( "div" );
		col.classList.add( "social-link" );
		col.classList.add( "col-sm" );

		var a = document.createElement( "a" );
		a.href = link.url;
		a.target = "blank";
		col.appendChild( a );

		var divIcon = document.createElement( "div" );
		divIcon.classList.add( "social-icon-container" );
		a.appendChild( divIcon );

		var icon = document.createElement( "img" );
		icon.classList.add( "social-icon" );
		icon.src = link.img;
		divIcon.appendChild( icon );

		var divTitle = document.createElement( "div" );
		a.appendChild( divTitle );

		var title = document.createElement( "h2" );
		title.classList.add( "social-title" );
		title.innerHTML = link.title;
		divTitle.appendChild( title );

		row.appendChild( col );
	}

	row.appendChild( padding() );

	container.appendChild( row );	
}
