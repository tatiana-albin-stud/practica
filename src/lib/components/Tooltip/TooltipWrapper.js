import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

/**
 *
 * @position top-start | top | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start
 * @hasArrow if 'arrow' is added as prop, the tooltip will have a arrow
 * @textTip {string}  is the text from tooltip
 * @followCursor tooltip will follow your cursor
 * @style will overwrite the default style of the tooltip
 * @returns the children who was wrapped
 */
const TooltipUWrapper = ({ position = 'top', textTip, hasArrow = false, children, style, ...props }) => {
    const defaultStyles = {
        textAlign: 'center',
        fontSize: '14px',
        color: '#5b80ba',
        backgroundColor: 'white',
        boxShadow: '#eaeef4 0px 4px 16px, #eaeef1 0px 8px 32px',
        padding: '8px 14px',
    };

    return (
        <Tooltip
            {...props}
            title={textTip}
            placement={position}
            TransitionComponent={Zoom}
            componentsProps={{
                tooltip: {
                    sx: {
                        ...defaultStyles,
                        ...style,
                    },
                },
                arrow: {
                    sx: {
                        color: style?.borderColor && style.borderColor,
                    },
                },
            }}
        >
            {children}
        </Tooltip>
    );
};

export default TooltipUWrapper;
