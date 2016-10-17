(function($) {

	"use strict";

	var $pbsNormal,
			$pbNormalTabs;

	/**
	 * Helper fonction to test if variable is set and not null
	 *
	 * @since TODO version
	 *
	 * @param	 mixed variable
	 * @return	bool
	 */
	function isset( variable ) {

		if ( undefined === variable ) { return false; }
		else if ( null === variable ) { return false; }

		return true;
	}

	/**
	 * Create the tab menu
	 * @since 1.0
	 */
	function init() {

		$pbsNormal = $("#normal-sortables");

		initTabs();

		$pbsNormal
			.addClass("pbtt-postboxes")
			.children()
				.removeClass('active closed')
				.filter(":not(.hide-if-js):first")
					.addClass("active");

		setSortable();
		updateZoneHeight();
	}

	/**
	 * Create the tabs according to visible postboxes in zone
	 * @since TODO version
	 */
	function initTabs() {

		// Create tabs container or remove its children
		if ( !isset($pbNormalTabs) ) {
			$pbNormalTabs = $("<ul>", {"id": "postbox_normal_tabs", "class": "pbtt-tabs" });
			$pbsNormal.before($pbNormalTabs);
		}
		else {
			$pbNormalTabs.children().remove();
		}

		var $el,
				$tab;

		$pbsNormal.children().each(function(i, el) {

			$el		= $(el);
			$tab	= $( "<li>", {"id": el.id +"_tab"} ).text( $el.children("h2").text() );

			if ( $el.hasClass("hide-if-js") ) {
				$tab.addClass("hide");
			}

			$pbNormalTabs.append($tab);
		});

		// Activate first available tab
		$pbNormalTabs.children(":not(.hide):first").addClass("active");
	}

	/**
	 * Update the shown postbox according to selected tab
	 * @since 1.0.2
	 */
	function change( event ) {
		event.preventDefault();

		var $this = $(event.target);

		$this
			.addClass("active")
			.siblings()
				.removeClass("active");

		$pbsNormal.children().removeClass("active");
		$pbsNormal.children().eq( $this.index() ).addClass("active");

		updateZoneHeight();
	}

	/**
	 * Update the postbox container height
	 * @since TODO version
	 */
	function updateZoneHeight() {
		$pbsNormal.height( $pbsNormal.children('.active').height() );
	}

	/**
	 * Hide or show the postboxes when screen option if updated
	 * @since 1.0.2
	 */
	function hideshow( event ) {

		var target_tab = $("#" + event.target.value +"_tab");
		target_tab.toggleClass("hide");

		if ( target_tab.is(".hide") ) {
			$pbNormalTabs.find("li:not(.hide):first").click();
		}
		else {
			target_tab.children("button").click();
		}

		updateZoneHeight();
	}

	/**
	 * Sets and handle the sorting of postboxes in tab
	 * @since 1.0.2
	 */
	function setSortable() {

		$pbNormalTabs.sortable({
			// axis: 'x',
			opacity: 0.65,
			cursor: 'move',
			placeholder: 'pbtt-placeholder',
			forcePlaceholderSize: true,
			connectWith: '.meta-box-sortables:not(.pbtt-postboxes)',
			start: sortStart,
			update: sortUpdate,
		});
	}

	/**
	 * Add "original" information to the sort item
	 * in order to be able to correctly sort at the end.
	 *
	 * @since TODO version
	 *
	 * @param Event		event	Reference to current event
	 * @param Object	ui		jQuery UI object
	 */
	function sortStart( event, ui ) {

		ui.item.data( {
			'pos'		: ui.item.index(),
			'parent': ui.item.parent().prop('id'),
		});

	}

	/**
	* Sort and move correctly the postbox according to sorted/moved tab
	*
	* @since TODO version
	*
	* @param Event		event	Reference to current event
	* @param Object	ui		jQuery UI object
	*/
	function sortUpdate( event, ui ) {

		var $el				= ui.item,
				newPos		= $el.index(),
				oldPos		= $el.data('pos'),
				oldParent	= $el.data("parent"),
				newParent	= $el.parent().prop('id'),
				nbTabs		= $pbsNormal.children().length-1,

				$movedPB	= $pbsNormal.children().eq(oldPos).detach();

		if ( oldParent === newParent ) {
		// Sorted in the same zone
			if			( 0 		 === newPos )	{ $pbsNormal.prepend($movedPB); }
			else if	( nbTabs === newPos )	{ $pbsNormal.append($movedPB); }
			else													{ $pbsNormal.children().eq(newPos-1).after( $movedPB ); }
		}
		else {
		// Moved to different zone
			$el
				.after( $movedPB )
				.remove();

			$pbNormalTabs.children(":not(.hide):first").addClass("active");
			$pbsNormal.children(":not(.hide-if-js):first").addClass("active");

			updateZoneHeight();
		}

		// Trigger WP save postboxes order in DB
		postboxes.save_order( pagenow );
	}

	/**
	 * Update the tabs when new postbox from different zone
	 * @since TODO version
	 */
	function receivePostbox() {

		var pbsNormal = document.getElementById( 'normal-sortables' );

		// create an observer instance
		var observer = new MutationObserver(function(mutations) {

			if ( 2 === mutations.length &&
				isset(mutations[0]) && isset(mutations[0].addedNodes[0]) && mutations[0].addedNodes[0].classList.contains('postbox') &&
				isset(mutations[1]) && isset(mutations[1].removedNodes[0]) && mutations[1].removedNodes[0].classList.contains('sortable-placeholder') ) {

					initTabs();

					$pbsNormal
						.children(":not(.hide-if-js):first")
						.addClass("active")
						.siblings()
							.removeClass('active');

					updateZoneHeight();
			}
		});

		// pass in the target node, as well as the observer options
		observer.observe( pbsNormal, { childList: true } );
	}

	$(document).ready(function() {

		init();

		/* behavior */
		$pbNormalTabs.on( "click", "li", change );
		$(".hide-postbox-tog").on("click", hideshow );

		receivePostbox();
	});

}(jQuery));
