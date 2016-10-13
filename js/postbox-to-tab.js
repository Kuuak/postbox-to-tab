(function($) {

	"use strict";

	var normalContainer,
			$postboxes,
			$postboxTabs;

	/**
	 * Create the tab menu
	 * @since 1.0
	 */
	function init() {

		var $postboxesTitles = normalContainer.find(".hndle"); //build the list of menu items
		$postboxTabs = $("<ul>", {"id": "postbox_tabs", "class": ""});

		$postboxes.each(function(i, el) {

			$(el).addClass( "postbox-"+i );

			var $tab = $( "<li>", { "id": el.id +"_tab" } )
			.append( $("<button>", {"data-tab":i}).text( $postboxesTitles[i].textContent ) );

			if ( $(el).hasClass("hide-if-js") ) {
				$tab.addClass("hide");
			}

			$postboxTabs.append($tab);
		});

		normalContainer.before($postboxTabs);
		$postboxTabs.find("li:not(.hide):first button").addClass("active");

		$postboxes.removeClass("active"); // Hide all post boxes, then display the first active one
		normalContainer.find(".postbox:not(.hide-if-js):first").addClass("active");

		normalContainer.addClass("postbox-tabs");
	}

	/**
	 * Update the shown postbox according to selected tab
	 * @since TODO version
	 */
	function change( event ) {
		event.preventDefault();

		$postboxes.removeClass("active");
		$(event.delegateTarget).find("button").removeClass("active");

		var tab_id = this.getAttribute("data-tab");
		$(this).addClass("active");

		normalContainer.find(".postbox-" + tab_id).addClass("active");
	}

	/**
	 * Hide or show the postboxes when screen option if updated
	 * @since TODO version
	 */
	function hideshow( event ) {

		var target_tab = jQuery("#" + this.value +"_tab");
		target_tab.toggleClass("hide");

		if ( target_tab.is(".hide") ) {
			$postboxTabs.find("li:not(.hide):first button").click();
		}
		else {
			target_tab.children("button").click();
		}
	}

	$(document).ready(function() {

		normalContainer = $("#normal-sortables");
		$postboxes = normalContainer.find(".postbox");

		init();

		/* behavior */
		$postboxTabs.on( "click", "button", change );
		$(".hide-postbox-tog").on("click", hideshow );
	});

}(jQuery));
