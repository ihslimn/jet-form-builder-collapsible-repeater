// Import necessary components from WordPress
const { registerBlockType } = wp.blocks;
const { ToggleControl } = wp.components;

function registerCollapsedFieldsStart() {

    registerBlockType( 'jfb-repeater-collapsible/collapsed-fields-start', {
        title: 'Repeater Collapsed Fields Start',
        icon: 'image-flip-vertical',
        category: 'jet-form-builder-elements',
        description: "Place into Repeater Field. All fields after this block will be collapsible.",
        attributes: {
            'initiallyCollapsed': {
                type: 'boolean',
                default: false,
            },
        },
        edit: function (props) {

            const {
                attributes,
                setAttributes,
                isSelected,
            } = props;
    
            return (
                <>
                    <div>
                        <p>Repeater Collapsed Fields Start</p>
                        <ToggleControl
                            label="Collapsed initially"
                            checked={ attributes.initiallyCollapsed }
                            onChange={ ( isCollapsed ) => {
                                setAttributes({ 'initiallyCollapsed': Boolean( isCollapsed ) });
                            } }
                        />
                    </div>
                </>
            );
        },
    });

}

export default registerCollapsedFieldsStart;
