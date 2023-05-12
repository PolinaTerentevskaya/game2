(function(){
	
	//  механика игры
	var Memory = {

		// карточка
		init: function(cards){
			//  доступ к классам
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			// игровое поле
			this.cardsArray = $.merge(cards, cards);
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// раскладываем 
			this.setup();
		},

		// перемешиваются
		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		// раскладываем карты
		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		// если нажать
		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},

		// при нажатии на карточку
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
						} else {
							_.guess = null;
							_.paused = true;
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
				// если перевернуты все карточки
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		// показываем победное сообщение
		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		// открываем окно
		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		// закрываем окно
		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		// перезапуск игры
		reset: function(){
			this.hideModal();
			// перемешиваем карточки
			this.shuffleCards(this.cardsArray);
			// раскладываем 
			this.setup();
			// открываем игровое поле
			this.$game.show("slow");
		},

		// Тасование Фишера–Йетса
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		// как добавляются карточки на страницу
		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Question_mark.svg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	// карточки
	var cards = [
		{	
			name: "burger",
			img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/WHOPPER_with_Cheese%2C_at_Burger_King_%282014.05.04%29.jpg",
			id: 1,
		},
		{
			name: "pizza",
			img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Pizza_%2848835114221%29.jpg",
			id: 2
		},
		{
			name: "sushi",
			img: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Sushi_Roll.jpg",
			id: 3
		},
		{
			name: "pasta",
			img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Pasta_with_eggplant_and_tomatoes.jpg",
			id: 4
		}, 
		{
			name: "soup",
			img: "https://upload.wikimedia.org/wikipedia/commons/f/f8/%D0%93%D1%80%D0%B8%D0%B1%D0%BD%D0%BE%D0%B9_%D1%81%D1%83%D0%BF_%D1%81_%D0%BB%D0%B8%D1%81%D0%B8%D1%87%D0%BA%D0%B0%D0%BC%D0%B8.jpg",
			id: 5
		},
		{
			name: "icecream",
			img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg",
			id: 6
		},
		{
			name: "fries",
			img: "https://upload.wikimedia.org/wikipedia/commons/9/97/French_fries_in_black_background.png",
			id: 7
		},
		{
			name: "nuggets",
			img: "https://upload.wikimedia.org/wikipedia/commons/6/64/Chicken_Nuggets.jpg",
			id: 8
		},
		{
			name: "shrimp",
			img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Camar%C3%A3o_aberto_grelhado.jpg",
			id: 9
		},
		{
			name: "salad",
			img: "https://upload.wikimedia.org/wikipedia/commons/9/94/Salad_platter.jpg",
			id: 10
		},
		{
			name: "rice",
			img: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Steamed_rice_with_fish_on_hong_kong.jpg",
			id: 11
		},
		{
			name: "tokiogoul",
			img: "https://upload.wikimedia.org/wikipedia/commons/7/79/Fried_goat_meat.jpg",
			id: 12
		},
	];
    
	// запуск
	Memory.init(cards);


})();