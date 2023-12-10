import { IS_COLLAPSIBLE, SUPPORTED_BLOCKS } from './constants';

function registerAttributes( settings, name ) {

	if ( ! SUPPORTED_BLOCKS[ name ] ) {
		return settings;
	}

	settings.attributes = {
		...settings.attributes,
		[ IS_COLLAPSIBLE ]: {
			type: 'boolean',
			default: false,
		},
	};

	return settings;
}

export default registerAttributes;