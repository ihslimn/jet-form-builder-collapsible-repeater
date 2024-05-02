import { IS_COLLAPSIBLE, SUPPORTED_BLOCKS } from './constants';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;

const { InspectorControls } = wp.blockEditor;
const { TextControl, ToggleControl, Panel, PanelRow, PanelBody } = wp.components;

const addControls = createHigherOrderComponent( ( BlockEdit ) => {

	return ( props ) => {

		let blockName = props.name,
			isSupported = SUPPORTED_BLOCKS[ blockName ] || false;

		if ( ! isSupported ) {
			return ( <BlockEdit { ...props } /> );
		}

		const {
			attributes,
			setAttributes,
			isSelected,
		} = props;

		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected &&
					<InspectorControls>
						<Panel>
							<PanelBody title="Collabsible" initialOpen={ false }>
								
								{ isSupported &&
									<PanelRow>
										<ToggleControl
											label="Is collapsible"
											help={
												attributes[ IS_COLLAPSIBLE ]
													? 'Enabled. Don\'t forget to put "Repeater Collapsed Fields Start" block before the fields that should be collapsed.'
													: 'Disabled.'
											}
											checked={ attributes[ IS_COLLAPSIBLE ] }
											onChange={ () => {
												setAttributes( { [ IS_COLLAPSIBLE ] : ! attributes[ IS_COLLAPSIBLE ] } );
											} }
										/>
									</PanelRow> 
								}
							</PanelBody>
						</Panel>
					</InspectorControls>
				}
			</>
		);
	};

}, 'addControls' );

addFilter(
	'editor.BlockEdit',
	'jfb-repeater-collapsible/controls',
	addControls
);
