/**
 * WordPress dependencies
 */

import { ComplementaryArea } from '@wordpress/interface';
import { Popover } from '@wordpress/components';

function Inspector(props) {
	return (
		<Popover position="bottom" className="iso-inspector">
			<ComplementaryArea.Slot scope="isolated/editor" />
		</Popover>
	);
}

export default Inspector;
