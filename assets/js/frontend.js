(

	function( $ ) {

		document.addEventListener( 'DOMContentLoaded', init );

		function init() {

			const {
				addAction,
			} = window.JetPlugins.hooks;

			addAction(
				'jet.fb.input.makeReactive',
				'jfb-repeater-collapsible/repeater',
				function( input ) {

					if ( input.inputType !== 'repeater' || ! input.template ) {
						return;
					}

					let collapsed = input.template.content.querySelector('.collapsed-fields-container + div');

					if ( ! collapsed ) {
						return;
					}

					while ( collapsed ) {
						input.template.content.querySelector('.collapsed-fields-container').append( collapsed );
						collapsed = input.template.content.querySelector('.collapsed-fields-container + div:not(.collapsed-fields-container)');
					}

					let collapsedStateToggleButton = document.createElement( 'div' );
					collapsedStateToggleButton.classList.add( 'jet-form-builder-repeater__row-collapse-toggle' );
					collapsedStateToggleButton.innerHTML = '<button type="button" class="jet-form-builder-repeater__collapse-toggle"></button>';

					input.template.content.querySelector( '.jet-form-builder-repeater__row-fields' ).after( collapsedStateToggleButton );

					input.isCollapsibleRepeater = true;

				}
			);

			addAction(
				'jet.fb.observe.after',
				'jfb-repeater-collapsible/repeater-row',
				function( observable ) {

					if ( ! observable.parent?.isCollapsibleRepeater ) {
						return;
					}
					
					let collapsedStateToggleButton = observable.rootNode.querySelector( '.jet-form-builder-repeater__collapse-toggle' );

					collapsedStateToggleButton.addEventListener( 'click', function() {
						const rowFields = this.closest( '.jet-form-builder-repeater__row' ).querySelector( '.collapsed-fields-container' );

						toggleCollapsedState( rowFields );
					} );

				}
			);

			function toggleCollapsedState( rowFields ) {
				if ( rowFields.classList.contains( 'toggle-collapsed') ) {
					return;
				}

				const options = {
					start: () => { rowFields.classList.add( 'toggle-collapsed'); },
					complete: () => { rowFields.classList.remove( 'toggle-collapsed'); },
					fail: () => { rowFields.classList.remove( 'toggle-collapsed'); },
					duration: 10,
				};

				if ( rowFields.classList.contains( 'collapsed') ) {
					$( rowFields ).slideDown( options );
					rowFields.classList.remove( 'collapsed');
				} else {
					$( rowFields ).slideUp( options );
					rowFields.classList.add( 'collapsed');
				}
			}
			
		}

	}

)( jQuery );
