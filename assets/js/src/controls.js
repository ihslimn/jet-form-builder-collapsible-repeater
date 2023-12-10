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
													? 'Enabled.'
													: 'Disabled.'
											}
											checked={ attributes[ IS_COLLAPSIBLE ] }
											onChange={ () => {
												setAttributes( { [ IS_COLLAPSIBLE ] : ! attributes[ IS_COLLAPSIBLE ] } );
											} }
										/>
									</PanelRow> 
								}
								{/* { supportType === 'value' &&
									<PanelRow>
										<ToggleControl
											label="Enable value updater"
											help={
												attributes[ VALUE_LISTENER_ENABLED ]
													? 'Enabled.'
													: 'Disabled.'
											}
											checked={ attributes[ VALUE_LISTENER_ENABLED ] }
											onChange={ () => {
												setAttributes( { [ VALUE_LISTENER_ENABLED ] : ! attributes[ VALUE_LISTENER_ENABLED ] } );
											} }
										/>
									</PanelRow>
								}
								{ ( attributes[ OPTIONS_LISTENER_ENABLED ] || attributes[ VALUE_LISTENER_ENABLED ] ) && 
									<PanelRow>
										<TextControl
											label="Fields to listen"
											help={ 'comma-separated' }
											value={ attributes[ FIELD_TO_LISTEN ] }
											onChange={ newValue => {
												setAttributes( { [ FIELD_TO_LISTEN ] : newValue } );
											} }
										/>
									</PanelRow> 
								}
								{ ( attributes[ OPTIONS_LISTENER_ENABLED ] || attributes[ VALUE_LISTENER_ENABLED ] ) &&
									<PanelRow>
										<ToggleControl
											label="Listen all"
											help={
												attributes[ LISTEN_ALL ]
													? 'Yes.'
													: 'No.'
											}
											checked={ attributes[ LISTEN_ALL ] }
											onChange={ () => {
												setAttributes( { [ LISTEN_ALL ] : ! attributes[ LISTEN_ALL ] } );
											} }
										/>
									</PanelRow>
								}
								{ supportType === 'value' && attributes[ VALUE_LISTENER_ENABLED ] && 
									<PanelRow>
											<TextControl
												label="Callback or query parameters"
												value={ attributes[ CALLBACK ] }
												help={ 'Callback which parameters are $item_id (value of the field that is being listened to), $field_name (this field name), $form_id (this form ID). Alternatively JetEngine query_id|property to get a specified propery from the first object from query.' }
												onChange={ newValue => {
													setAttributes( { [ CALLBACK ] : newValue } );
												} }
											/>
									</PanelRow>
								} */}
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
	'jet-form-builder/collapsible-repeater',
	addControls
);
