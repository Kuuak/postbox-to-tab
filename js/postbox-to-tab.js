(function($) {

	"use strict";

	var normalContainer,
			$postboxes,
			$postboxTabs;

	//create the menu with javascript

	function init() {

		var $postboxesTitles = normalContainer.find('.hndle'); //build the list of menu items
		$postboxTabs = $('<ul>', {'id': 'postbox_tabs', 'class': ''});

		$postboxes.each(function(i, el) {

			$(el).addClass( 'postbox-'+i );

			var $tab = $( '<li>', { 'id': el.id +'_tab' } )
			.append( $('<button>', {'data-tab':i}).text( $postboxesTitles[i].textContent ) );

			if ( $(el).hasClass('hide-if-js') ) {
				$tab.addClass("hide");
			}

			$postboxTabs.append($tab);
		});

		normalContainer.before($postboxTabs);
		$postboxTabs.find("li:not(.hide):first button").addClass('active');

		$postboxes.removeClass('active'); // Hide all post boxes, then display the first active one
		normalContainer.find('.postbox:not(.hide-if-js):first').addClass('active');

		normalContainer.addClass('postbox-tabs');
	}

	$(document).ready(function() {

		normalContainer = $('#normal-sortables');
		$postboxes = normalContainer.find('.postbox');

		init();

		/* behavior */

		$postboxTabs.on('click', 'button', function( e ) {
			e.preventDefault();

			$postboxes.removeClass('active');
			$(e.delegateTarget).find('button').removeClass('active');

			var tab_id = this.getAttribute('data-tab');
			$(this).addClass('active');
			normalContainer.find('.postbox-' + tab_id).addClass('active');

		});

		$('.hide-postbox-tog').on('click', function( e ) {

			var target_tab = jQuery('#' + this.value +'_tab');
			target_tab.toggleClass('hide');

			if ( target_tab.is('.hide') )
				$postboxTabs.find("li:not(.hide):first button").click();
			else
				target_tab.children('button').click();

		});
	});

}(jQuery));
