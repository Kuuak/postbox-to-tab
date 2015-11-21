!function($) {

	var normalContainer,
			$postboxes,
			$postboxTabs;

	//create the menu with javascript

	function init() {

		$postboxesTitles = normalContainer.find('.hndle'); //build the list of menu items
		$postboxTabs = jQuery('<ul>', {'id': 'postbox_tabs', 'class': ''});

		$postboxes.each(function(i, el) {

			jQuery(el).addClass( 'postbox-'+i );

			var $tab = jQuery( '<li>', { 'id': el.id +'_tab' } )
			.append( jQuery('<button>', {'data-tab':i}).text( $postboxesTitles[i].textContent ) );

			if ( jQuery(el).hasClass('hide-if-js') ) {
				$tab.addClass('hide')
			}

			$postboxTabs.append($tab);
		});

		normalContainer.before($postboxTabs);
		$postboxTabs.find("li:not(.hide):first button").addClass('active');

		$postboxes.hide(); // Hide all post boxes, then display the first active one
		normalContainer.find('.postbox:not(.hide-if-js):first').addClass('active').show()

		normalContainer.addClass('postbox-tabs');


		// tabs.sortable({axis:'x',cursor:'move', containment:'parent', delay:150})
	}

	jQuery(document).ready(function() {

		normalContainer = jQuery('#normal-sortables');
		$postboxes = normalContainer.find('.postbox');

		init();

		/* behavior */

		$postboxTabs.on('click', 'button', function( e ) {
			e.preventDefault();

			$postboxes.removeClass('active').hide();
			jQuery(e.delegateTarget).find('button').removeClass('active');

			tab_id = this.getAttribute('data-tab');
			jQuery(this).addClass('active');
			normalContainer.find('.postbox-' + tab_id).addClass('active').show();

		});

		jQuery('.hide-postbox-tog').on('click', function( e ) {

			var target_tab = jQuery('#' + this.value +'_tab');
			target_tab.toggleClass('hide');

			if ( target_tab.is('.hide') )
				$postboxTabs.find("li:not(.hide):first button").click();
			else
				target_tab.children('button').click();

		});
	});

}(jQuery);
