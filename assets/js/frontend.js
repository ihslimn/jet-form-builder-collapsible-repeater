(

	function( $ ) {

		$( window ).on( 'jet-form-builder/init', init );

		function init() {

			const {
				addAction,
			} = window.JetPlugins.hooks;

			addAction(
				'jet.fb.input.makeReactive',
				'jfb-repeater-collapsible/repeater',
				function( input ) {

					if ( input.inputType !== 'repeater' ) {
						return;
					}

					if ( ! input.nodes[0]?.closest( `[data-is-collapsible="${input.name}"]` ) ) {
						return;
					}

					input.isCollapsibleRepeater = true;

				}
			);

			//jet.fb.observe.after

			addAction(
				'jet.fb.observe.after',
				'jfb-repeater-collapsible/repeater-row',
				function( observable ) {

					if ( ! observable.parent?.isCollapsibleRepeater ) {
						return;
					}

					console.log( observable );

					//.jet-form-builder-repeater__row-fields

					let collapsedStateToggleButton = document.createElement( 'div' );
					collapsedStateToggleButton.classList.add( 'jet-form-builder-repeater__row-collapse-toggle' );
					collapsedStateToggleButton.innerHTML = '<button type="button" class="jet-form-builder-repeater__collapse-toggle">c</button>';

					//console.log( collapsedStateToggleButton );

					observable.rootNode.querySelector( '.jet-form-builder-repeater__row-fields' ).after( collapsedStateToggleButton );

					collapsedStateToggleButton.addEventListener( 'click', function() {
						const rowFields = this.closest( '.jet-form-builder-repeater__row' ).querySelector( '.jet-form-builder-repeater__row-fields' );

						toggleCollapsedState( rowFields );
					} );

				}
			);

			$( window ).off( 'jet-form-builder/init', init );
			
		}

		function toggleCollapsedState( rowFields ) {
			$( rowFields ).toggleClass( 'collapsed' );
		}

	}

)( jQuery );
