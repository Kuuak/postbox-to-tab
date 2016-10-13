(function($) {

	"use strict";

	var normalContainer,
			$pbs,
			$pbTabs;

	/**
	 * Create the tab menu
	 * @since 1.0
	 */
	function init() {

		var $tab,
				$pbTitles = normalContainer.find(".hndle"); //build the list of menu items
				$pbTabs = $("<ul>", {"id": "postbox_tabs", "class": ""});

		$pbs.each(function(i, el) {

			$tab = $( "<li>", {"id": el.id +"_tab", "data-tab":i} ).text( $pbTitles[i].textContent );

			if ( $(el).hasClass("hide-if-js") ) {
				$tab.addClass("hide");
			}

			$pbTabs.append($tab);
		});

		normalContainer.before($pbTabs);
		$pbTabs.find("li:not(.hide):first").addClass("active");

		$pbs.removeClass("active"); // Hide all post boxes, then display the first active one
		normalContainer.find(".postbox:not(.hide-if-js):first").addClass("active");

		normalContainer.addClass("postbox-tabs");

		setSortable();
	}

	/**
	 * Update the shown postbox according to selected tab
	 * @since TODO version
	 */
	function change( event ) {
		event.preventDefault();

		$pbs.removeClass("active");
		$(event.delegateTarget).children().removeClass("active");

		var tab_id = this.getAttribute("data-tab");
		$(this).addClass("active");

		normalContainer.children().eq(tab_id).addClass("active");
	}

	/**
	 * Hide or show the postboxes when screen option if updated
	 * @since TODO version
	 */
	function hideshow( event ) {

		var target_tab = jQuery("#" + this.value +"_tab");
		target_tab.toggleClass("hide");

		if ( target_tab.is(".hide") ) {
			$pbTabs.find("li:not(.hide):first").click();
		}
		else {
			target_tab.children("button").click();
		}
	}

	/**
	 * Sets and handle the sorting of postboxes in tab
	 * @since TODO version
	 */
	function setSortable() {

		$pbTabs.sortable({
			axis: 'x',
			opacity: 0.65,
			cursor: 'move',
			placeholder: 'placeholder',
			forcePlaceholderSize: true,
			update: function( event, ui ) {

				var $movedPB,
						i				= 0,
						$el			= ui.item,
						newPos	= $el.index(),
						oldPos	= $el.data('tab');

				$movedPB = $pbs.eq(oldPos).detach();
				if ( 0 === newPos ) { normalContainer.prepend($movedPB); }
				else if ( $pbs.length-1 === newPos) { normalContainer.append($movedPB); }
				else { normalContainer.children().eq(newPos-1).after( $movedPB ); }

				$pbs = normalContainer.children(); // Refresh the collection with the new order
				$('#postbox_tabs').children().each(function(index, el) {
					el.setAttribute( "data-tab", i );
					i++;
				});

				// Trigger WP save postboxes order in DB
				postboxes.save_order( pagenow );
			},
		});
	}

	$(document).ready(function() {

		normalContainer = $("#normal-sortables");
		$pbs = normalContainer.find(".postbox");

		init();

		/* behavior */
		$pbTabs.on( "click", "li", change );
		$(".hide-postbox-tog").on("click", hideshow );
	});

}(jQuery));
