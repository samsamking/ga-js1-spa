/**
 * Project 3: SPA
 * ====
 *
 * See the README.md for instructions
 */

(function() {
	//declare fetch data urls - forecast and instagram
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
	var header = document.querySelector('header');
	var starRatingTotal = 0;
	var rating =0;
	//store keys
	var state = { 
		loginToken: 'https://api.instagram.com/oauth/authorize/?client_id=0ce2e89fe4d4457b948147017fbdff1e&redirect_uri=https://samsamking.github.io/ga-js1-spa/&response_type=token',
		accessToken:window.location.hash.split("=").pop(),
		/*imageUrl:'',
		weather:'',*/
		theDarkSkyForcastKey:'2f00bb6ef0c22d03aa9ee3d89d3b316c',
		/*photoTime:'',
		latitude:'',
		longitude:'',
		location:'',
		caption:''*/
		animals:[],
	
	}
	
	if (state.accessToken ==false /* Did user authorize? */) {
		renderLogin(state, container)
	} else {	
	//Make fetch calls here
	fetch(instagramBasUrl +'users/self/media/recent/?access_token='+ state.accessToken)
		.then((response)=>{
			return response.json();
		}).then((dataAsJson)=>{
			dataAsJson.data.forEach((item) => {
			//declare instagram data
			var resultData = {
				imageUrl: item.images.standard_resolution.url,
				photoTime: item.created_time,
				latitude: item.location.latitude,
				longitude: item.location.longitude,
				location: item.location.name,
				caption:item.caption.text,
				popup:false,
			}
			state.animals.push(resultData);
				//fetch weather data when the images were loaded
				fetch(forecastBasUrl +state.theDarkSkyForcastKey+"/"+resultData.latitude+", "+resultData.longitude+", "+resultData.photoTime)
				.then((response)=>{
					return response.json();
				}).then((dataAsJson)=>{
					resultData.weather=dataAsJson.currently.icon;
					/*calling header*/
					renderHeader(resultData, header)
					
					/*calling images*/
					renderImages(resultData, container)
					
					/*calling image click function*/
					clickImage (resultData)
				})
			});
			
		}).catch((err)=>{
			console.log('Error!',err);
		});
	}
		
	//declare functions
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
	
	/*render header*/	
	function renderHeader(data, into){
		into.innerHTML = `
			<section class="wrapper">
			  <a href="#" class="home"><h1>Pick me, feed me and never leave me</h1></a>
			  <div class="clearfix"></div>
			</section>
		`
	}
	
	//render all the images
	function renderImages(data, into) {
		//declare variables
		var weather=data.weather;
		//remove the space inbetween words (for matching data-id and data purpose)
		var dataCaption = data.caption;
		dataCaption = dataCaption.replace(/\s+/g, "");
		
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
			 default:
			  weatherImage= "images/clearDay.png"
		}
	
		// add the template
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
			
			//match the id and render pop up with the data
			if (dataCaption == dataCaptionId){
				renderPopup(data, container) 
			}
			
		});
	}
	
	// added the `data-id` attribute when we rendered the items
	function getKeyFromClosestElement(element) {
		
		// Search for the closest parent that has an attribute `data-id`
		let closestItemWithId = closest(event.delegateTarget, '[data-id]')
		
		if (!closestItemWithId) {
		  throw new Error('Unable to find element with expected data key');
		}
		
		// Extract and return that attribute
		return closestItemWithId.getAttribute('data-id');
	}
		
	 /**
     * iterate
     * A simple iterator used to loop over the stars collection.
     * Returns nothing.
     * {Array} collection The collection to be iterated
     * {Function} callback The callback to run on items in the collection
     */
    function iterate(collection, callback) {
      for (var i = 0; i < collection.length; i++) {
        var item = collection[i];
        callback(item, i);
      }
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
		// declare variables		
		var rating=1;
		var maxRating = 5;
		var output = '';
		var starContainer=document.querySelector(".starContainer");
		var starList=starContainer.getElementsByTagName("li");
		var dataCaption = data.caption;
		dataCaption = dataCaption.replace(/\s+/g, "");
		var ulContainer =document.querySelector(".ulContainer");
		var totalScoreContainer =document.querySelector(".totalScore");

		
		//render blank stars funtion, it has to stay here to get dataId
		function renderBlankStar(into) {
			into.innerHTML += `<li data-id=${dataId} class="star" />`
		}
		
		//for loop to loop through ratings, and render pop up blank stars
		for (var i = rating; i <= maxRating; i++) {
			var dataId = i;
			renderBlankStar(starContainer)
			
		}
		
		/*click on star and add class*/
		delegate("body","click",".star",(event) => {
			
			rating=parseInt(event.target.getAttribute('data-id'));
			
			iterate(starList, function(item, index) {
				if (index < rating) {
					item.classList.add('selected');
				} else {
					item.classList.remove('selected');
				}
			});
		})	
	
		
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
			
			//remove selected class after it has been submitted
			iterate(starList, function(item, index) {
			
				item.classList.remove('selected');
			  
			});
			
			//update firebase data
			firebase.database().ref(`tasks/${dataCaption}/comments/`).push({
				name: dataCaption,
				comment: value,
				done: false,  // Default all tasks to not-done
				stars: rating,
			});
			
			//update firebase total rating data for each animal
			firebase.database().ref(`tasks/${dataCaption}/totalRating/`).set({
				total:starRatingTotal + rating
			});
			starRatingTotal=0;
			
			// Reset the input value ready for a new item
			document.querySelector('#new-item').value = '';
		
		});
		
		// Clicking to delete an item
		delegate('.comment', 'click', '.delete', (event) => {
			
			//declare variables
			let key = getKeyFromClosestElement(event.delegateTarget);
			var deletedStars =0;
			var totalStars=0;
			
			//get total rating/stars for each animal
			firebase.database().ref(`tasks/${dataCaption}/totalRating/`).on('value', function(snapshot) {
				// Pull the totalRating value from firebase
				totalRating = snapshot.val();
				var totalRatingExists=snapshot.exists();
				
				//check if data exists then get total
				if (totalRatingExists){
					totalStars=totalRating.total;
				}
				
			});
			
			// Remove that particular key for the animal
			firebase.database().ref(`tasks/${dataCaption}/comments/${key}/`).remove();
			
			//add total stars from each comment for that animal
			firebase.database().ref(`tasks/${dataCaption}/comments/`).on('value', function(snapshot) {
				
				// Pull the data after some has been deleted from firebase
				leftData = snapshot.val();
				var leftDataExists=snapshot.exists();
				//if there is comment data left after the last delete
				if (leftDataExists){
					var totalAddedStars=0;
					Object.keys(leftData).map((key) => {
						var stars = parseInt(leftData[key].stars);
						totalAddedStars +=stars;
					})
					
					//update totalRating after adding all the stars from each comment
					firebase.database().ref(`tasks/${dataCaption}/totalRating/`).update({
							total:totalAddedStars
					})
					
				}else{
					//remove the totalRating if there is no other comments
					firebase.database().ref(`tasks/${dataCaption}/totalRating/`).remove();
				}
			
			});
		
		});
		
		// Clicking to edit an item
		delegate('.comment', 'click', '.update', (event) => {
			
			//declare variables
			var key = getKeyFromClosestElement(event.delegateTarget);
			var itemId=document.querySelector(key);
			var el=closest(event.delegateTarget,'[data-id]')
			var id=el.getAttribute('data-id');
			var newValue=el.querySelector(".edit-item").value;

			// Remove whitespace from start and end of input
			newValue = newValue.trim();
			
			// Nothing entered, return early from this function
			if (!newValue) {
				return;
			}
			
			// Update the `comment` value of that particular key to be the new comment from the `<input>` box.
			firebase.database().ref(`tasks/${dataCaption}/comments/${key}/`).update({
				comment: newValue
			});			
			
		});
		
		// Clicking to do / undo an item
		delegate('.comment', 'click', '.done-it', (event) => {
		
			let key = getKeyFromClosestElement(event.delegateTarget);
			// Update the `done` value of that particular key to be the `checked` state of
			// the `<input>` checkbox.
			firebase.database().ref(`tasks/${dataCaption}/comments/${key}/`).update({
				done: event.delegateTarget.checked
			});
		});
		
		// Whenever a new value is received from Firebase (once at initial page load,
		// then every time something changes)
		firebase.database().ref(`tasks/${dataCaption}/`).on('value', function(snapshot) {
		
			// Pull the value from firebase
			state = snapshot.val();
			var exists=snapshot.exists();
			var starRatingArray=[];
			clickedAnimal ={}
			
			//if the data exists render the comment lists
			if(exists){
				
				var stateComments=state.comments;
				
				// update the comments lists
				renderTotalScore(state, totalScoreContainer);
				renderList(state, ulContainer);
				
				//get how many stars for that committed comments
				Object.keys(stateComments).map((key) => {
					var starRating = parseInt(stateComments[key].stars);
					starRatingArray.push(starRating)
					
				})
				
				//get total star ratings
				starRatingTotal = starRatingArray.reduce((a, b) => a + b, 0);
			
			//if no comment data exists render the empty list	
			}else{
				renderEmptyTotalScore(totalScoreContainer)
				renderEmptyList(ulContainer);
			}			
			
			//set rating to 0 to start again
			rating=0;
			
		});
			
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
				</div>
				<div class="comment">
					<p>Leave me a message, and make me shine.</p>
					<ul class="starContainer">
					</ul>
					${renderInput()}
					
				</div>
			</div>
		`
	}	
	
	/*render input button area*/
	function renderInput(){
		return `
			<input type="text" id="new-item" />
			<button id="add-button">Comment</button>
			<div class="totalScore"></div>
			<ul class="ulContainer">
				Leave a comment...
			</ul>
		`
	}	
	
	/*render total score*/
	function renderTotalScore(state, into){
		var stateTotal=state.totalRating;
		
		if (stateTotal !== null || stateTotal !== 0){
			into.innerHTML=	
			Object.keys(stateTotal).map((key) => {
				
					var total=stateTotal[key];
					
					//change total score words and gifs based on the score gained
					if (total <= 5){
					return `<p>I have only ${total} stars, pick me please!</p>
							<img src="images/pickMe.gif" alt="pick me" style="width:246px;height:205px;">
					`
					}else if (total > 5 && total <=10){
						return `<p>I have ${total} stars, want to see me dance?</p>
								<img src="images/dancing.gif" alt="dance" style="width:250px;height:124px;">
						`
					}else if (total > 10 && total <=15){
						return `<p>Yeehaa ${total} stars achieved, I need more to shine.</p>
								<img src="images/shine.gif" alt="shine" style="width:250px;height:125px;">
						`
					}else if (total > 15 && total <=20){
						return `<p>Yeah ${total} stars, I am running.</p>
								<img src="images/running.gif" alt="running" style="width:256px;height:256px;">
						`
					}else if (total > 20 && total <=30){
						return `<p>Woohoo ${total} stars, arent we better together?</p>
								<img src="images/together.gif" alt="together" style="width:240px;height:135px;">
						`
					}else if (total > 30 && total <=40){
						return `<p>Wow ${total} stars, love you.</p>
								<img src="images/love.gif" alt="love" style="width:250px;height:198px;">
						`
					}else if (total > 40 && total <=50){
						return `<p>I have ${total} stars, you made me smile.</p>
								<img src="images/smile.gif" alt="smile" style="width:240px;height:132px;">
						`
					}else {
						return `<p>I have ${total} stars, you made me a star!</p>
								<img src="images/stars.gif" alt="star" style="width:250px;height:139px;">
						`
					}
			}).join('')
		}
	}
	
	//render 'leave a comment' if no comments
	function renderEmptyTotalScore(into) {
			  into.innerHTML= `
			  `
	}
	
	//render comments ul lists
	function renderList(state, into) {
		
			// Iterate over each element in the object
			if (state !== null){
				var stateComments=state.comments;
				
				// get how many stars for each comment
				into.innerHTML = 
				Object.keys(stateComments).map((key) => {
					var rating=stateComments[key].stars;
					var maxRating = 5;
					var output = ''
					
					// render how many gold stars after the committed comment
					for (let i = 1; i <= rating; i++) {
						output += renderCommentGoldStar()
					}
					
					// render how many blank stars after the committed comment
					for (let i = rating + 1; i <= maxRating; i++) {
						output += renderCommentBlankStar()
					}
					
					//create the comments list
					return `
					<li data-id="${key}">
						<input class="done-it" type="checkbox" ${stateComments[key].done ? "checked" : ""} />
						<div class="commentStarContainer">${output}</div>
						${stateComments[key].comment}
						<button class="delete">Delete</button>
						<button class="update">Update</button>
						<p class="instruction">Edit comment below, and click the update button</p>
						<input type="text" class="edit-item shown"/>
					</li>
					`
				}).join('');
			}
	
	}
	
	//render 'leave a comment' if no comments
	function renderEmptyList(into) {
			  into.innerHTML= `
			  	Leave a comment...
			  `
	}
	
	//render gold stars for each comment
	function renderCommentGoldStar() {
		return `<img src="images/yellowStarComment.png" />`
	}
	
	//render blank stars for each comment
	function renderCommentBlankStar() {
		return `<img src="images/starComment.png" />`
	}
	
	/*close pop up*/
	delegate("body","click",".close-pop-up",(event) => {
		var popupId=document.querySelector("#pop-up")
		popupId.parentNode.removeChild(popupId);
	});
		
})();
