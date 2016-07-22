/**
 * Project 3: SPA
 * ====
 *
 * See the README.md for instructions
 */

(function() {
	//declare fetch data urls
	var forecastBasUrl = 'https://crossorigin.me/https://api.forecast.io/forecast/'
	var instagramBasUrl = 'https://crossorigin.me/https://api.instagram.com/v1/' 
	
	// Initialize Firebase
	let firebaseAppName = "ga-js1-spa-f02d6";
	let firebaseKey = "AIzaSyAxvi2ajnhN_qS06G5NX3QKu3nvhfgMjEM";
	
	// Initialize Firebase
	var config = {
		apiKey: firebaseKey,
		authDomain: `${firebaseAppName}.firebaseapp.com`,
		databaseURL: `https://${firebaseAppName}.firebaseio.com`,
		storageBucket: `${firebaseAppName}.appspot.com`,
	};
	
	firebase.initializeApp(config);   
	
	
	//declare containers
	var wrapper=document.querySelector(".wrapper");
	var container = document.querySelector('#container');
	
	//store keys
	var state = { 
		loginToken: 'https://api.instagram.com/oauth/authorize/?client_id=0ce2e89fe4d4457b948147017fbdff1e&redirect_uri=http://localhost:3000/&response_type=token',
		accessToken:window.location.hash.split("=").pop(),
		/*imageUrl:'',
		weather:'',*/
		theDarkSkyForcastKey:'2f00bb6ef0c22d03aa9ee3d89d3b316c',
		/*photoTime:'',
		latitude:'',
		longitude:'',
		location:'',
		caption:''*/
	
	}
	
	if (state.accessToken ==false /* TODO: did user authorize? */) {
	renderLogin(state, container)
	} else {
	
	//Make fetch calls here
	fetch(instagramBasUrl +'users/self/media/recent/?access_token='+ state.accessToken)
		.then((response)=>{
			return response.json();
		}).then((dataAsJson)=>{
			dataAsJson.data.forEach((item) => {
			var resultData = {
				imageUrl: item.images.standard_resolution.url,
				photoTime: item.created_time,
				latitude: item.location.latitude,
				longitude: item.location.longitude,
				location: item.location.name,
				caption:item.caption.text,
				popup:false,
			}
			
				//fetch weather data when the images were loaded
				fetch(forecastBasUrl +state.theDarkSkyForcastKey+"/"+resultData.latitude+", "+resultData.longitude+", "+resultData.photoTime)
				.then((response)=>{
					return response.json();
				}).then((dataAsJson)=>{
					resultData.weather=dataAsJson.currently.icon;
					renderImages(resultData, container)
					clickImage (resultData)
				})
			});
			
		}).catch((err)=>{
			console.log('Error!',err);
		});
	}
	
	//render login
	function renderLogin(data, into) {
		//Add the template
		into.innerHTML=`
		<h2>Lets login, shall we?</h2>
		<form action=${data.loginToken} method="post">
		  <button type="submit">Login to Instagram</button>
		</form>
		`
	}
	
	//render all the images
	function renderImages(data, into) {
		// add the template
		var weather=data.weather;
		//switch weather icon based on the weather data
		switch(weather.toLowerCase()) {
			case "clear-day":
			  weatherImage= "images/clearDay.png"
			  break;
			case "clear-night":
			  weatherImage= "images/clearNight.png"
			  break;
			case "rain":
			  weatherImage= "images/rain.png"
			  break;
			case "snow":
			  weatherImage= "image/snow.png"
			  break;
			case "sleet":
			  weatherImage= "images/sleet.png"
			  break;
			case "wind":
			  weatherImage= "images/wind.png"
			  break;
			case "fog":
			  weatherImage= "images/fog.png"
			  break;
			case "cloudy":
			  weatherImage= "images/cloudy.png"
			  break;
			case "partly-cloudy-day":
			  weatherImage= "images/cloudy.png"
			  break;
			case "partly-cloudy-night":
			  weatherImage= "images/cloudyNight.png"
			  break;
			// add the default keyword here
			 default:
			  weatherImage= "images/clearDay.png"
		}
	
		//remove the space inbetween words (for matching data-id and data purpose)
		var dataCaption = data.caption;
		dataCaption = dataCaption.replace(/\s+/g, "");
		into.innerHTML  += `
			<div class="eachItem" data-id=${dataCaption}>
				<div class="polaroid">
				  <img src=${data.imageUrl} class="clickMe"/>
				 </div>
				 <div class="description">
				  <div class="leftCol"><img src=${weatherImage}/></div>
				  <div class="rightCol">
					<ul class="ulClass">
						<li>Where: ${data.location}</li>
						<li>Description: ${data.caption}</li>
					</ul>
				  </div>
				</div>
			</div>
		`
	}

	//click image pop up function
	function clickImage (data){
		/*click function on each image*/
		delegate("body","click",".clickMe",(event) => {
			
			event.preventDefault();
			var dataCaptionId=getKeyFromClosestElement(event.delegateTarget);
			var dataCaption = data.caption;
			dataCaption = dataCaption.replace(/\s+/g, "");
			if (dataCaption == dataCaptionId){
				renderPopup(data, container) 
			}
			
		});
	}
	
	// We added the `data-id` attribute when we rendered the items
	function getKeyFromClosestElement(element) {
		// Search for the closest parent that has an attribute `data-id`
		let closestItemWithId = closest(event.delegateTarget, '[data-id]')
		
		if (!closestItemWithId) {
		  throw new Error('Unable to find element with expected data key');
		}
		
		// Extract and return that attribute
		return closestItemWithId.getAttribute('data-id');
	}
	
	//render pop up
	function renderPopup(data, into){
		into.innerHTML += `
			<div id="pop-up">
			<a href="#" class="close-pop-up">X</a>
					<div class="wrapper">
						${renderPopupItem(data)}
					</div>
			
			</div>
		`
		var dataCaption = data.caption;
		dataCaption = dataCaption.replace(/\s+/g, "");
		// Clicking to add a new item
		document.querySelector('#add-button').addEventListener('click', (event) => {
		
		// Get the user input
		let value = document.querySelector('#new-item').value;
		
		// Remove whitespace from start and end of input
		value = value.trim();
		
		// Nothing entered, return early from this function
		if (!value) {
			return;
		}
		
		//update firebase data
		firebase.database().ref(`tasks/${dataCaption}/`).push({
			title: value,
			done: false,  // Default all tasks to not-done
		});
		
		// Reset the input value ready for a new item
		document.querySelector('#new-item').value = '';
		
		});
		
		// Clicking to delete an item
		delegate('.comment', 'click', '.delete', (event) => {
		
		let key = getKeyFromClosestElement(event.delegateTarget);
		
		// Remove that particular key
		firebase.database().ref(`tasks/${dataCaption}/${key}/`).remove();
		});
		
		// Clicking to do / undo an item
		delegate('.comment', 'click', '.done-it', (event) => {
		
			let key = getKeyFromClosestElement(event.delegateTarget);
			// Update the `done` value of that particular key to be the `checked` state of
			// the `<input>` checkbox.
			firebase.database().ref(`tasks/${dataCaption}/${key}/`).update({
				done: event.delegateTarget.checked
			});
		});
		
		var ulContainer =document.querySelector(".ulContainer");
		// Whenever a new value is received from Firebase (once at initial page load,
		// then every time something changes)
		firebase.database().ref(`tasks/${dataCaption}/`).on('value', function(snapshot) {
		
			// Pull the list value from firebase
			state = snapshot.val();
			// update the comments lists
			renderList(state, ulContainer)
		});

	
	}	
	
	let rating = 1 // from click or firebase
	let maxRating = 5
	
	let output = ''
	
	for (let i = 1; i <= rating; i++) {
	  output += renderGoldStar()
	}
	
	for (let i = rating + 1; i <= maxRating; i++) {
	  output += renderBlankStar(i)
	}
	
	//into.innerHTML = output
	
	function renderGoldStar() {
	  return `<img src="images/yellowStar.png" />`
	}
	
	function renderBlankStar(i) {
	  return `<img src="images/star.png" />`
	}
		
	/*render each pop up item*/
	function renderPopupItem(eachItemData){
		return `
			<div class="imageLeftCol polaroid">
				<img src=${eachItemData.imageUrl} />
			</div>
			<div class="imageRightCol">
				<div class="content">
					<h1>${eachItemData.caption}</h1>
					<p>${eachItemData.location}</p>
					<a href="" class="pop-up-action" target="_blank">Read more from source</a>
				</div>
				<div class="comment">
					<div class="starContainer">
					${output}
					</div>
					${renderInput()}
				</div>
			</div>
		`
		//var starContainer=document.querySelector(".starContainer");
	}	
	
	/*render input button area*/
	function renderInput(){
		return `
			<input type="text" id="new-item" />
			 <button id="add-button">Comment</button>
			  <ul class="ulContainer">
				Leave a comment...
			   </ul>
		`
	}	
	
	//render comments ul lists
	function renderList(state, into) {
		if(state !== null){
			// Iterate over each element in the object
			into.innerHTML = Object.keys(state).map((key) => {
			  return `
				<li data-id="${key}" ${state[key].done ? "style='text-decoration: line-through'" : ""}>
				  <input class="done-it" type="checkbox" ${state[key].done ? "checked" : ""} />
				  ${state[key].title}
				  <button class="delete">[Delete]</button>
				</li>
			  `;
			}).join('');
		}
	}
	
	/*close pop up*/
	delegate("body","click",".close-pop-up",(event) => {
		var popupId=document.querySelector("#pop-up")
		popupId.parentNode.removeChild(popupId);
	})	
	
})();
