class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.activeIndex = 0;
		this.answers = {
			А: 0,
			Б: 0,
			В: 0,
			Г: 0,
			Д: 0,
			Ё: 0,
			Ж: 0,
			З: 0,
			И: 0,
		};

		this.$testContainer = $(".test");
		this.$questionCounter = $(".test__number");
		this.$questionTitle = $(".test__title");
		this.$answerItem = $(".test__item");
		this.$answer = $(".test__answer");
		this.$questionWomanImage = $(".test__picture");

		this.$resultFrameAnswer = $(".result__answer");
		this.$resultFrameText = $(".result__text");
		this.$resultBgImage = $(".result__img");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$answerItem.on("click", (e) => {
			const id = $(e.target).closest(".test__item").data("id");
			this.answers[id] += 1;
			this.activeIndex += 1;
			if (this.activeIndex >= this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});
		$(".result__btn").on("click", () => {
			fullpage_api.setMouseWheelScrolling(true);
			fullpage_api.setAllowScrolling(true);
			fullpage_api.moveTo("section2", 1);
			setTimeout(() => {
				$("body").removeClass("show-result");
			}, 700);
			this.activeIndex = 0;
			this.answers = {
				А: 0,
				Б: 0,
				В: 0,
				Г: 0,
				Д: 0,
				Ё: 0,
				Ж: 0,
				З: 0,
				И: 0,
			};
			this.renderQuestion();
		});
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		this.$questionTitle.html(title);
		this.$questionWomanImage.html(
			`<img src="/images/test-bg${this.activeIndex + 1}.png" />`
		);
		this.$questionCounter.html(
			`<img src="/images/test-counter${this.activeIndex + 1}.svg" />`
		);
		this.$answerItem.each((id, item) => {
			$(item).find(".test__answer-text").html(answers[id].text);
		});
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	getWinnerIndex(winner) {
		let index = 0;
		this.results.forEach((item, i) => {
			if (item.id === winner) {
				index = i;
			}
		});
		return index + 1;
	}

	renderResults() {
		const winner = this.getWinner();
		$("body").addClass("show-result");
		$("html, body").animate(
			{
				scrollTop: $(".result").offset().top,
			},
			500
		);
		const idx = this.getWinnerIndex(winner);
		const currentResult = this.results.find((item) => item.id === winner);
		const { title, text } = currentResult;
		this.$resultFrameAnswer.html(title);
		this.$resultFrameText.html(text);
		this.$resultBgImage.html(`<img src="/images/result-img${idx}.png" />`);
	}
}

export default Test;
