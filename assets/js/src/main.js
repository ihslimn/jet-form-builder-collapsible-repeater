import registerAttributes from './attributes';
import './controls';
import registerCollapsedFieldsStart from './blocks/collapsed-fields-start'

const {
	      addFilter,
      } = wp.hooks;

addFilter(
	'blocks.registerBlockType',
	'jfb-repeater-collapsible/blockAttributes',
	registerAttributes,
);

function registerBlocks() {
	registerCollapsedFieldsStart();
}

document.addEventListener( 'jet-form-builder-initialized', registerBlocks );
