/**  {@tutorial}  https://paulie.dev/posts/2020/08/styled-components-responsive-array-syntax/ */

const breakpoints = [576, 768, 992];

/**
 * @function createMediaQueries
 * @param css of @type object
 * @returns cssMediaQueries of @type object
 * 
 * 1 - creates a new object called 'cssKeyValuePairs' with key values pairs for each property / value
 * 2 - assign each of those values to an appropriate breakpoint value
 * 3 - create formed media queries that will work when used with the style object syntax
 * -------------------------------------------------------------------------------------
 * is 'mobile-first', so '[0, ...breakpoints]' => adds the '0 to 576' viewport
 * 
 *  
 */

export const createMediaQueries = (css) => {

    // 1 
    const cssKeyValuePairs = css.reduce( (items, item) => {
        const { property, values } = item;
        items.push(
            Array.isArray(item.values)?
                values.map( (value) => ({ [property]: value }))
                : [{ [property]: values }]
        );
        return items;
    }, []);

    // console.log(JSON.stringify(cssKeyValuePairs, null, 2));

    // 2
    const cssToBreakpoints = [0, ...breakpoints]
        .map((breakpoint, index) => ({
            breakpoint: breakpoint,
            css: cssKeyValuePairs
                .map((array) => array[index])
                .filter(Boolean)
                .reduce((items, item) => {
                    items[`${Object.keys(item)}`] = `${Object.values(item)}`;
                    return items;
                }, {})
    }))
    // .slice(0, -1); // remove last breakpoint

    // console.log(JSON.stringify(cssToBreakpoints, null, 2)); 

    // 3
    const cssMediaQueries = cssToBreakpoints.reduce((items, item) => {
        const { breakpoint, css } = item;

        breakpoint?
            (items[`@media screen and (min-width: ${breakpoint}px)`] = { ...css})
            : (items = {...css});

        return items;
    }, {});
    // console.log(JSON.stringify(cssMediaQueries, null, 2));
    return { ...cssMediaQueries };
}

    /**
    * @example
    * 1 -
    *     [
    *        [
    *            {
    *               "width": "100%"
    *           },
    *            {
    *               "width": "50%"
    *            },
    *            {
    *               "width": "auto"
    *            }
    *        ]
*        ]
    * 
    */