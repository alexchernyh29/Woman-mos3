import $ from "jquery";
import WOW from "wowjs";
import DATA from "./data";
import Test from "./test";

const test = new Test(DATA);

$(() => {
	const wow = new WOW.WOW({
		live: false,
		boxClass: "wow",
	});

	wow.init();
	test.init();

	$(".result__arrow").on("click", () => {
		$("body").addClass("show-footer");
		$("html, body").animate(
			{
				scrollTop: $(".footer").offset().top,
			},
			500
		);
	});

	new fullpage("#fullpage", {
		licenseKey: "DB3EE7EC-94FE42A9-B0CA39EF-B4289CFF",
		scrollOverflow: true,
		scrollOverflowReset: true,
		normalScrollElements: "#section3, .result__text",
		anchors: ["section1", "section2", "section3", "section4"],
		onLeave: function (origin, destination, direction) {
			let skip = false; // do we need to skip some slides?
			let nextSibling = destination.item;
			let nextSlideNr = destination.index + 1; // convert from index to slide nr.

			// in/decrement nextSlideNr to point to next non-hidden slide
			while ($(nextSibling).is(":hidden")) {
				nextSlideNr += direction === "down" ? 1 : -1;
				nextSibling =
					direction === "down"
						? nextSibling.nextElementSibling
						: nextSibling.previousElementSibling;

				skip = true;
			}

			if (skip) {
				fullpage_api.moveTo(nextSlideNr);
				return false; // cancel slide that triggered this onLeave
			}
		},
	});
});
