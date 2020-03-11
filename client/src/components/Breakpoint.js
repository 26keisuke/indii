import React from "react";
import MediaQuery from "react-responsive"
import PropTypes from "prop-types"

const breakpoints = {
    desktop: "(min-width: 1025px)",
    dablet: "(min-width: 768px)",
    phablet: "(max-width: 1024px)", // phone and tablet
    tablet: "(min-width: 768px) and (max-width: 1024px)",
    mobile: "(max-width: 768px)",
}

export default function Breakpoint(props) {
    const breakpoint = breakpoints[props.name] || breakpoint.desktop;

    return (
        <MediaQuery {...props} query={breakpoint}>
            {props.children}
        </MediaQuery>
    )
}

React.propTypes = {
    name: PropTypes.string,
    children: PropTypes.object,
}