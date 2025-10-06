// Practice Questions with Detailed Explanations
const practiceQuestions = [
    // Selectors
    {
        topic: "selectors",
        question: "Which selector has the highest specificity?",
        options: ["Element selector (div)", "Class selector (.class)", "ID selector (#id)", "Attribute selector ([type='text'])"],
        correct: 2,
        explanation: "ID selectors have the highest specificity among these options. Specificity hierarchy: inline styles > IDs > classes/attributes/pseudo-classes > elements. ID selectors have a specificity of (0,1,0,0)."
    },
    {
        topic: "selectors",
        question: "What does the '>' selector do in CSS?",
        options: ["Selects all descendants", "Selects direct children only", "Selects siblings", "Selects parent elements"],
        correct: 1,
        explanation: "The '>' (child combinator) selects only direct children of an element. For example, 'div > p' selects only <p> elements that are direct children of <div>, not nested deeper."
    },
    {
        topic: "selectors",
        question: "How do you select every <p> element that immediately follows a <div>?",
        options: ["div ~ p", "div + p", "div > p", "div p"],
        correct: 1,
        explanation: "The '+' (adjacent sibling combinator) selects an element that immediately follows another. 'div + p' selects only <p> elements that come right after a <div>. Use '~' for all following siblings."
    },
    {
        topic: "selectors",
        question: "What's the difference between :nth-child(2) and :nth-of-type(2)?",
        options: ["No difference", ":nth-child counts all elements, :nth-of-type counts same type", "Same thing", ":nth-of-type is newer"],
        correct: 1,
        explanation: ":nth-child(2) selects the 2nd child regardless of type. :nth-of-type(2) selects the 2nd child of that specific type. Example: p:nth-of-type(2) finds the 2nd <p> among siblings."
    },
    {
        topic: "selectors",
        question: "What do pseudo-elements use?",
        options: ["Single colon (:)", "Double colon (::)", "Hash (#)", "Dot (.)"],
        correct: 1,
        explanation: "Pseudo-elements use double colons (::before, ::after, ::first-line). Pseudo-classes use single colons (:hover, :focus). CSS3 introduced :: for pseudo-elements, but : still works for backward compatibility."
    },
    {
        topic: "selectors",
        question: "Which has higher specificity: '.class .class' or '#id'?",
        options: [".class .class", "#id", "Same specificity", "Depends on order"],
        correct: 1,
        explanation: "One ID selector (#id) beats any number of class selectors. Specificity: IDs (0,1,0,0) > classes (0,0,1,0). Two classes (0,0,2,0) still lose to one ID (0,1,0,0)."
    },

    // Layout & Box Model
    {
        topic: "layout",
        question: "What is the total width of an element with width: 100px, padding: 10px, border: 5px, and margin: 15px (with default box-sizing)?",
        options: ["100px", "130px", "145px", "160px"],
        correct: 1,
        explanation: "With default box-sizing (content-box), total width = width + padding + border = 100px + 20px (10px each side) + 10px (5px each side) = 130px. Margin is outside and doesn't affect element width."
    },
    {
        topic: "layout",
        question: "What does 'box-sizing: border-box' do?",
        options: ["Removes borders", "Includes padding and border in width/height", "Only includes border in width/height", "Excludes padding from width/height"],
        correct: 1,
        explanation: "box-sizing: border-box makes the width/height include padding and border. If you set width: 100px, the element stays 100px total, with padding and border calculated inside that width."
    },
    {
        topic: "layout",
        question: "Which position value removes an element from document flow?",
        options: ["static", "relative", "absolute", "sticky"],
        correct: 2,
        explanation: "position: absolute removes the element from normal document flow. Other elements act as if it doesn't exist. It's positioned relative to its nearest positioned ancestor."
    },
    {
        topic: "layout",
        question: "What's the default display value for <div>?",
        options: ["inline", "block", "inline-block", "flex"],
        correct: 1,
        explanation: "Divs are block-level elements by default. Block elements start on new lines and take full width available. Spans are inline by default. You can change display to override defaults."
    },
    {
        topic: "layout",
        question: "What does 'display: inline-block' allow?",
        options: ["Inline elements to have width/height", "Block elements to be inline", "Both", "Neither"],
        correct: 2,
        explanation: "inline-block combines benefits of both: elements flow inline like text, but you can set width, height, and vertical margins like block elements. Great for navigation items."
    },
    {
        topic: "layout",
        question: "When does z-index work?",
        options: ["Always", "Only on positioned elements", "Only on absolute elements", "Only on fixed elements"],
        correct: 1,
        explanation: "z-index only works on positioned elements (position: relative, absolute, fixed, or sticky). Static elements ignore z-index. Higher values stack on top of lower values."
    },
    {
        topic: "layout",
        question: "What does 'overflow: hidden' do?",
        options: ["Hides the element", "Hides content that overflows", "Makes element invisible", "Removes overflow property"],
        correct: 1,
        explanation: "overflow: hidden clips content that extends beyond the element's box. It also creates a new block formatting context and can be used to contain floats or hide scrollbars."
    },

    // Flexbox
    {
        topic: "flexbox",
        question: "What does 'justify-content: space-between' do in Flexbox?",
        options: ["Centers items", "Distributes items with space between them", "Aligns items to the start", "Stretches items"],
        correct: 1,
        explanation: "justify-content: space-between distributes flex items with equal space between them. The first item aligns to the start, the last to the end, and space is evenly distributed between all items."
    },
    {
        topic: "flexbox",
        question: "Which property controls the main axis alignment in Flexbox?",
        options: ["align-items", "justify-content", "align-content", "flex-direction"],
        correct: 1,
        explanation: "justify-content controls alignment along the main axis (horizontal by default). align-items controls the cross axis. The main axis direction is determined by flex-direction."
    },
    {
        topic: "flexbox",
        question: "What does 'flex: 1' mean?",
        options: ["Width of 1px", "Flex-grow: 1, flex-shrink: 1, flex-basis: 0", "One column layout", "First item in flex"],
        correct: 1,
        explanation: "flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0. The item will grow to fill available space and can shrink if needed, starting from 0 base size."
    },
    {
        topic: "flexbox",
        question: "What's the default flex-direction?",
        options: ["column", "row", "row-reverse", "column-reverse"],
        correct: 1,
        explanation: "The default flex-direction is 'row', which arranges items horizontally from left to right. 'column' arranges them vertically. Add '-reverse' to reverse the order."
    },

    // Grid
    {
        topic: "grid",
        question: "What does 'grid-template-columns: repeat(3, 1fr)' create?",
        options: ["3 rows of equal height", "3 columns of equal width", "3 pixel columns", "3 flexible rows"],
        correct: 1,
        explanation: "This creates 3 columns of equal width. 'fr' (fraction) unit divides available space. repeat(3, 1fr) is shorthand for '1fr 1fr 1fr', creating three equal-width columns."
    },
    {
        topic: "grid",
        question: "How do you create gaps between grid items?",
        options: ["margin", "padding", "gap (or grid-gap)", "spacing"],
        correct: 2,
        explanation: "The 'gap' property (formerly grid-gap) creates space between grid items without affecting outer edges. You can use 'gap: 20px' for uniform spacing or 'gap: 20px 10px' for row-gap and column-gap."
    },
    {
        topic: "grid",
        question: "What does 'grid-column: 1 / 3' do?",
        options: ["Creates 1-3 columns", "Spans from column line 1 to 3", "Sets column width to 1-3", "Creates 3 column grids"],
        correct: 1,
        explanation: "grid-column: 1 / 3 makes an item span from grid line 1 to grid line 3, covering 2 columns. Grid lines are the dividing lines between tracks, numbered from 1."
    },
    {
        topic: "grid",
        question: "What does 'auto-fit' do in CSS Grid?",
        options: ["Automatically fits content", "Fits as many columns as possible", "Adjusts column width", "Removes empty columns"],
        correct: 1,
        explanation: "auto-fit in repeat(auto-fit, minmax(...)) fits as many columns as possible in the available space. auto-fill creates tracks even if empty, while auto-fit collapses empty tracks."
    },

    // Animations
    {
        topic: "animations",
        question: "What's the difference between transition and animation?",
        options: ["No difference", "Transitions need trigger, animations auto-play", "Animations are faster", "Transitions are better"],
        correct: 1,
        explanation: "Transitions require a trigger (like hover) and animate between two states. Animations use @keyframes, can auto-play, loop, and have multiple intermediate steps."
    },
    {
        topic: "animations",
        question: "What does 'animation-fill-mode: forwards' do?",
        options: ["Plays animation forward", "Keeps final keyframe styles", "Moves element forward", "Starts animation"],
        correct: 1,
        explanation: "animation-fill-mode: forwards keeps the styles from the last keyframe (100%) applied after the animation ends. Without it, the element returns to its original styles."
    },
    {
        topic: "animations",
        question: "Which timing function provides constant speed?",
        options: ["ease", "ease-in", "linear", "ease-out"],
        correct: 2,
        explanation: "linear provides constant speed throughout the animation. 'ease' starts slow, speeds up, then slows down. 'ease-in' starts slow, 'ease-out' ends slow."
    },
    {
        topic: "animations",
        question: "What does 'transform: scale(2)' do?",
        options: ["Makes element 2px larger", "Doubles the element size", "Creates 2 scales", "Moves element by 2"],
        correct: 1,
        explanation: "transform: scale(2) doubles the element's size (200% of original). scale(0.5) would halve it. You can scale axes separately: scale(2, 1) doubles width but keeps height."
    },
    {
        topic: "animations",
        question: "Which transform property moves an element?",
        options: ["move()", "translate()", "position()", "shift()"],
        correct: 1,
        explanation: "translate() moves elements. translate(50px, 100px) moves right 50px and down 100px. Unlike changing position properties, transforms are GPU-accelerated and perform better."
    },
    {
        topic: "animations",
        question: "Which filter creates a black and white effect?",
        options: ["filter: bw(1)", "filter: grayscale(1)", "filter: blackwhite(100%)", "filter: monochrome"],
        correct: 1,
        explanation: "filter: grayscale(1) or grayscale(100%) creates black and white. 0 is full color, 1 is full grayscale. Other filters: blur(), brightness(), contrast(), sepia()."
    },
    {
        topic: "animations",
        question: "What's the correct transition syntax?",
        options: ["transition: property timing duration delay", "transition: property duration timing delay", "transition: duration property timing", "transition: property duration delay timing"],
        correct: 1,
        explanation: "Syntax: transition: property duration timing-function delay. Example: transition: all 0.3s ease 0.1s. Duration is required, others optional. Order matters for duration/delay."
    },

    // Responsive Design
    {
        topic: "responsive",
        question: "What's the correct syntax for a mobile-first media query (min-width)?",
        options: ["@media (min-width: 768px)", "@media screen and (min-width: 768px)", "Both are correct", "@media min-width: 768px"],
        correct: 2,
        explanation: "Both syntaxes are correct! '@media (min-width: 768px)' is the modern, shorter version. Adding 'screen and' is optional but more explicit. min-width creates mobile-first queries."
    },
    {
        topic: "responsive",
        question: "What is the purpose of 'viewport' meta tag?",
        options: ["Adds views to page", "Controls page zoom on mobile", "Creates viewports", "Removes port views"],
        correct: 1,
        explanation: "The viewport meta tag (<meta name='viewport' content='width=device-width, initial-scale=1.0'>) controls how the page is displayed on mobile devices, ensuring proper scaling."
    },
    {
        topic: "responsive",
        question: "What unit is best for responsive font sizes?",
        options: ["px", "rem", "pt", "cm"],
        correct: 1,
        explanation: "rem (root em) is ideal for responsive design. It's relative to the root font size, making it easy to scale the entire site. 1rem = root font size (usually 16px)."
    },
    {
        topic: "responsive",
        question: "What does 'vw' stand for?",
        options: ["Very wide", "Viewport width", "Variable width", "Vertical width"],
        correct: 1,
        explanation: "vw stands for viewport width. 1vw = 1% of viewport width. 100vw = full viewport width. Similarly, vh = viewport height. Great for responsive layouts."
    },

    // Typography
    {
        topic: "typography",
        question: "What's the difference between em and rem units?",
        options: ["No difference", "em is relative to parent, rem to root", "rem is older", "em is better"],
        correct: 1,
        explanation: "em is relative to the parent element's font size and compounds. rem is relative to the root (html) element's font size and doesn't compound, making it more predictable."
    },
    {
        topic: "typography",
        question: "How do you prevent text from wrapping?",
        options: ["text-wrap: none", "white-space: nowrap", "no-wrap: true", "wrap: false"],
        correct: 1,
        explanation: "white-space: nowrap prevents text from wrapping to a new line. Combined with overflow: hidden and text-overflow: ellipsis, you can create truncated text with '...'."
    },
    {
        topic: "typography",
        question: "What does 'line-height: 1.5' mean?",
        options: ["1.5px height", "1.5 times the font size", "1.5em spacing", "15% height"],
        correct: 1,
        explanation: "line-height: 1.5 (unitless) sets the line height to 1.5 times the element's font size. This is preferred over units as it scales proportionally with font size changes."
    },
    {
        topic: "typography",
        question: "What does 'writing-mode: vertical-rl' do?",
        options: ["Rotates text 90 degrees", "Creates vertical text, right-to-left", "Makes text vertical-left", "Rotates layout"],
        correct: 1,
        explanation: "writing-mode: vertical-rl creates vertical text flowing right-to-left (like traditional Japanese). vertical-lr flows left-to-right. horizontal-tb is default."
    },

    // Colors and Backgrounds
    {
        topic: "layout",
        question: "What's the difference between RGB and RGBA?",
        options: ["No difference", "RGBA includes alpha (transparency)", "RGB is newer", "RGBA is faster"],
        correct: 1,
        explanation: "RGBA adds an alpha channel for transparency. rgb(255, 0, 0) is opaque red, while rgba(255, 0, 0, 0.5) is 50% transparent red. Alpha ranges from 0 (transparent) to 1 (opaque)."
    },
    {
        topic: "layout",
        question: "How do you create a linear gradient from top to bottom?",
        options: ["linear-gradient(to bottom, red, blue)", "gradient(top-bottom, red, blue)", "linear-gradient(red, blue)", "Both a and c"],
        correct: 3,
        explanation: "Both work! linear-gradient(red, blue) defaults to top-to-bottom. You can be explicit with 'to bottom' or use degrees like '180deg'. Gradients flow from first color to last."
    },
    {
        topic: "layout",
        question: "What does 'background-size: cover' do?",
        options: ["Covers entire element, may crop", "Shows entire image, may have space", "Tiles the image", "Stretches image"],
        correct: 0,
        explanation: "background-size: cover scales image to cover entire element while maintaining aspect ratio. It may crop parts. Use 'contain' to ensure entire image is visible."
    },

    // Units and Values
    {
        topic: "layout",
        question: "What's the difference between % and vw?",
        options: ["No difference", "% is relative to parent, vw to viewport width", "vw is older", "% is better"],
        correct: 1,
        explanation: "% is relative to parent element's dimension. vw (viewport width) is relative to viewport: 1vw = 1% of viewport width. 100vw = full viewport width, regardless of parent."
    },
    {
        topic: "layout",
        question: "What does calc() do in CSS?",
        options: ["Calculates selector specificity", "Performs mathematical calculations", "Validates calculations", "Creates calculators"],
        correct: 1,
        explanation: "calc() performs math in CSS: width: calc(100% - 50px). You can mix units: calc(100vw - 2rem). Use +, -, *, / operators. Space around + and - is required."
    },
    {
        topic: "layout",
        question: "How do you create a circle with CSS?",
        options: ["shape: circle", "border-radius: 50%", "circle: true", "shape-style: circle"],
        correct: 1,
        explanation: "border-radius: 50% on a square element (equal width and height) creates a perfect circle. border-radius rounds corners; 50% makes them meet in the middle."
    },

    // Variables
    {
        topic: "layout",
        question: "How do you declare a CSS variable?",
        options: ["$variable: value", "--variable: value", "var-variable: value", "@variable: value"],
        correct: 1,
        explanation: "CSS variables use --name syntax: --primary-color: #667eea; Use them with var(): color: var(--primary-color). Define in :root for global scope or any selector for local scope."
    },
    {
        topic: "layout",
        question: "How do you use a CSS variable with a fallback?",
        options: ["var(--color) or blue", "var(--color, blue)", "var(--color || blue)", "var(--color ?? blue)"],
        correct: 1,
        explanation: "Use var(--variable, fallback): color: var(--primary-color, blue). If --primary-color isn't defined, blue is used. You can nest variables: var(--primary, var(--default, blue))."
    },
    {
        topic: "layout",
        question: "Can CSS variables contain multiple values?",
        options: ["No, only single values", "Yes, any valid CSS value including multiple", "Only numbers", "Only colors"],
        correct: 1,
        explanation: "CSS variables can store any valid CSS value: --spacing: 10px 20px; --shadow: 0 5px 15px rgba(0,0,0,0.3); Even multiple properties: --card-style: 10px solid blue;"
    },

    // Shadows and Effects
    {
        topic: "layout",
        question: "What's the order of values in box-shadow?",
        options: ["offset-x offset-y blur spread color", "color blur spread offset-x offset-y", "blur offset-x offset-y color", "offset-x blur offset-y spread"],
        correct: 0,
        explanation: "box-shadow: offset-x offset-y blur spread color. Example: box-shadow: 5px 5px 10px 2px rgba(0,0,0,0.5). Blur and spread are optional. Add 'inset' for inner shadow."
    },

    // Advanced Topics
    {
        topic: "layout",
        question: "How do you change the cursor to a pointer hand?",
        options: ["cursor: hand", "cursor: pointer", "pointer: hand", "mouse: pointer"],
        correct: 1,
        explanation: "cursor: pointer shows the pointing hand. Other values: default, text, move, grab, not-allowed, wait. cursor: pointer indicates clickable elements."
    },
    {
        topic: "layout",
        question: "When should you use object-fit?",
        options: ["On any element", "Only on replaced elements (img, video)", "Only on divs", "On text elements"],
        correct: 1,
        explanation: "object-fit works on replaced elements like <img>, <video>. It controls how content fits in its box. Values: fill, contain, cover, none, scale-down. Similar to background-size."
    },
    {
        topic: "layout",
        question: "What does clip-path do?",
        options: ["Clips paths", "Creates custom element shapes", "Cuts paths", "Removes paths"],
        correct: 1,
        explanation: "clip-path creates custom shapes by clipping elements. Example: clip-path: circle(50%) makes a circle, polygon() creates custom shapes. Great for unique designs."
    },
    {
        topic: "layout",
        question: "What is mix-blend-mode used for?",
        options: ["Mixing colors", "Blending element with background", "Mixing fonts", "Creating blends"],
        correct: 1,
        explanation: "mix-blend-mode controls how element's content blends with background. Values: multiply, screen, overlay, etc. Similar to Photoshop blend modes. Creates interesting visual effects."
    },
    {
        topic: "layout",
        question: "What does 'aspect-ratio: 16 / 9' do?",
        options: ["Sets width to 16px and height to 9px", "Maintains 16:9 ratio", "Divides element in 16:9", "Creates 16x9 grid"],
        correct: 1,
        explanation: "aspect-ratio: 16 / 9 maintains a 16:9 width-to-height ratio. Perfect for responsive videos/images. If you set width, height adjusts automatically to maintain ratio."
    },
    // Additional 50 Questions
    {
        topic: "selectors",
        question: "What does the universal selector (*) select?",
        options: ["Nothing", "All elements", "Only divs", "Only text"],
        correct: 1,
        explanation: "The universal selector (*) selects all elements on the page. Use sparingly as it can affect performance. Often used for CSS resets: * { margin: 0; padding: 0; }"
    },
    {
        topic: "selectors",
        question: "What does :not() pseudo-class do?",
        options: ["Removes elements", "Selects elements that don't match selector", "Negates styles", "Inverts colors"],
        correct: 1,
        explanation: ":not() selects elements that don't match the given selector. Example: p:not(.special) selects all <p> elements except those with class 'special'."
    },
    {
        topic: "selectors",
        question: "What's the difference between :first-child and :first-of-type?",
        options: ["No difference", ":first-child must be first element, :first-of-type is first of that type", "Same thing", ":first-of-type is newer"],
        correct: 1,
        explanation: ":first-child selects an element that is the first child of its parent. :first-of-type selects the first element of that type among siblings, regardless of position."
    },
    {
        topic: "selectors",
        question: "How do you select all even rows in a table?",
        options: ["tr:even", "tr:nth-child(even)", "tr:nth-child(2n)", "Both b and c"],
        correct: 3,
        explanation: "Both tr:nth-child(even) and tr:nth-child(2n) select even rows. 2n means every 2nd element. You can also use :nth-child(odd) or :nth-child(2n+1) for odd rows."
    },
    {
        topic: "layout",
        question: "What does 'clear: both' do?",
        options: ["Clears all styles", "Prevents floating below float elements", "Removes borders", "Clears content"],
        correct: 1,
        explanation: "clear: both prevents an element from appearing beside floated elements, forcing it below them. Used to contain floats. Values: left, right, both, none."
    },
    {
        topic: "layout",
        question: "What's the purpose of 'contain' CSS property?",
        options: ["Contains overflow", "Optimizes rendering performance", "Contains floats", "Contains margins"],
        correct: 1,
        explanation: "contain tells browser which parts of element are independent, allowing performance optimizations. Values: layout, paint, size, style. Use contain: content for most cases."
    },
    {
        topic: "layout",
        question: "What does 'visibility: hidden' do compared to 'display: none'?",
        options: ["Same thing", "visibility keeps space, display removes it", "display keeps space", "visibility is faster"],
        correct: 1,
        explanation: "visibility: hidden hides element but preserves its space in layout. display: none removes element completely from layout. Use visibility for toggling without layout shift."
    },
    {
        topic: "layout",
        question: "What is a 'stacking context'?",
        options: ["Stack of elements", "3D space for z-index", "Stacked borders", "Context menu"],
        correct: 1,
        explanation: "A stacking context is a 3D conceptualization where elements are layered. Created by positioned elements with z-index, opacity < 1, transforms, etc. Children z-index only compares within same context."
    },
    {
        topic: "flexbox",
        question: "What does 'align-self' do?",
        options: ["Aligns flex container", "Overrides align-items for single item", "Aligns text", "Self-centers element"],
        correct: 1,
        explanation: "align-self overrides align-items for a specific flex item. Values: auto, flex-start, flex-end, center, baseline, stretch. Useful for making one item align differently."
    },
    {
        topic: "flexbox",
        question: "What's the default value of 'flex-wrap'?",
        options: ["wrap", "nowrap", "wrap-reverse", "auto"],
        correct: 1,
        explanation: "Default flex-wrap is 'nowrap', meaning items stay on one line and may shrink. Use 'wrap' to allow items to wrap to new lines when space runs out."
    },
    {
        topic: "flexbox",
        question: "What does 'order' property do in Flexbox?",
        options: ["Orders flex items visually", "Sets importance", "Creates order list", "Alphabetizes items"],
        correct: 0,
        explanation: "order controls visual order of flex items. Default is 0. Lower values appear first, higher values last. Doesn't affect source order (important for accessibility)."
    },
    {
        topic: "grid",
        question: "What does 'fr' unit stand for?",
        options: ["Frame", "Fraction", "Free", "Fixed ratio"],
        correct: 1,
        explanation: "fr stands for 'fraction' of available space. 1fr takes 1 part, 2fr takes 2 parts. grid-template-columns: 1fr 2fr creates columns where second is twice the first."
    },
    {
        topic: "grid",
        question: "How do you create a 12-column grid?",
        options: ["grid-columns: 12", "grid-template-columns: repeat(12, 1fr)", "columns: 12", "grid: 12"],
        correct: 1,
        explanation: "grid-template-columns: repeat(12, 1fr) creates 12 equal columns. This is the basis of many CSS frameworks like Bootstrap's 12-column grid system."
    },
    {
        topic: "grid",
        question: "What does 'grid-auto-flow' control?",
        options: ["Flow of water", "How auto-placed items are inserted", "Animation flow", "Grid flow direction"],
        correct: 1,
        explanation: "grid-auto-flow controls how auto-placed items fill the grid. Values: row (default), column, dense (fills gaps). Use 'dense' for masonry-like layouts."
    },
    {
        topic: "grid",
        question: "What's the difference between 'gap' and 'margin' in Grid?",
        options: ["No difference", "gap is between items, margin is outside", "margin is better", "gap is older"],
        correct: 1,
        explanation: "gap creates space between grid items without affecting outer edges. margin creates space around each item, including outer edges. gap is cleaner for grid spacing."
    },
    {
        topic: "animations",
        question: "How many keyframes can you define?",
        options: ["Only 2 (from, to)", "Only 3 (0%, 50%, 100%)", "Unlimited", "Maximum 10"],
        correct: 2,
        explanation: "You can define unlimited keyframes at any percentage. @keyframes can have 0%, 25%, 50%, 75%, 100% or any other percentage. More keyframes = more control."
    },
    {
        topic: "animations",
        question: "What does 'animation-iteration-count: infinite' do?",
        options: ["Loops forever", "Loops 999 times", "Never stops loading", "Creates infinite scroll"],
        correct: 0,
        explanation: "animation-iteration-count: infinite makes animation loop forever. Use specific numbers (1, 2, 3) for limited loops. Great for loading spinners and continuous effects."
    },
    {
        topic: "animations",
        question: "What's 'animation-direction: alternate'?",
        options: ["Alternates colors", "Plays forward then backward", "Changes direction randomly", "Alternates elements"],
        correct: 1,
        explanation: "alternate makes animation play forward, then backward, then forward, etc. Combined with infinite iteration, creates smooth back-and-forth motion. alternate-reverse starts backward."
    },
    {
        topic: "animations",
        question: "Can you animate the 'display' property?",
        options: ["Yes", "No", "Only with transitions", "Only in modern browsers"],
        correct: 1,
        explanation: "You cannot animate display directly as it's not interpolatable. Use opacity and visibility instead, or animate max-height for show/hide effects. display changes instantly."
    },
    {
        topic: "responsive",
        question: "What's a 'breakpoint' in responsive design?",
        options: ["Where page breaks", "Screen width where design changes", "Bug in code", "Breaking point of browser"],
        correct: 1,
        explanation: "A breakpoint is a specific screen width where layout changes via media query. Common breakpoints: 768px (tablet), 1024px (desktop). Choose based on your content needs."
    },
    {
        topic: "responsive",
        question: "What does 'mobile-first' approach mean?",
        options: ["Mobile is priority", "Design for mobile, enhance for desktop", "Mobile loads first", "Mobile only design"],
        correct: 1,
        explanation: "Mobile-first means designing for mobile screens first, then adding features for larger screens using min-width media queries. Results in cleaner code and better mobile performance."
    },
    {
        topic: "responsive",
        question: "What's the difference between 'em' and 'px' for media queries?",
        options: ["No difference", "em respects browser zoom, px doesn't", "px is better", "em is older"],
        correct: 1,
        explanation: "em units in media queries respect browser zoom settings for accessibility. 1em typically = 16px. Using em improves accessibility for users who change browser font size."
    },
    {
        topic: "responsive",
        question: "What does '@media print' do?",
        options: ["Prints media", "Styles for printing", "Prints variables", "Creates print button"],
        correct: 1,
        explanation: "@media print applies styles only when printing. Hide navigation, adjust colors, set page breaks. Example: @media print { .no-print { display: none; } }"
    },
    {
        topic: "typography",
        question: "What's 'font-display: swap' used for?",
        options: ["Swaps fonts", "Shows fallback font while web font loads", "Swaps text", "Changes display"],
        correct: 1,
        explanation: "font-display: swap shows fallback font immediately while web font loads, then swaps when ready. Improves perceived performance. Other values: auto, block, fallback, optional."
    },
    {
        topic: "typography",
        question: "What does 'text-overflow: ellipsis' require?",
        options: ["Nothing else", "white-space: nowrap and overflow: hidden", "Just overflow: hidden", "Just width"],
        correct: 1,
        explanation: "text-overflow: ellipsis requires both white-space: nowrap (prevent wrapping) and overflow: hidden (clip overflow). Also needs defined width. Shows '...' for truncated text."
    },
    {
        topic: "typography",
        question: "What's the purpose of 'font-variant: small-caps'?",
        options: ["Makes text small", "Displays lowercase as small capitals", "Creates small fonts", "Caps text size"],
        correct: 1,
        explanation: "font-variant: small-caps displays lowercase letters as smaller uppercase letters. Uppercase letters remain normal size. Good for headings and stylistic text."
    },
    {
        topic: "typography",
        question: "What does 'letter-spacing' control?",
        options: ["Letter size", "Space between letters", "Letter style", "Letter color"],
        correct: 1,
        explanation: "letter-spacing (or tracking) controls space between letters. Positive values increase spacing, negative decreases. Example: letter-spacing: 0.1em; Common in headings."
    },
    {
        topic: "layout",
        question: "What's the 'initial' keyword?",
        options: ["First value", "Sets property to default value", "Initial style", "Starting point"],
        correct: 1,
        explanation: "initial sets property to its default/initial value per CSS specification. Different from browser defaults. Example: display: initial; resets to inline for most elements."
    },
    {
        topic: "layout",
        question: "What does 'inherit' keyword do?",
        options: ["Inherits money", "Takes parent's value", "Creates inheritance", "Inherits color only"],
        correct: 1,
        explanation: "inherit forces property to take parent element's computed value, even for non-inherited properties. Example: border: inherit; makes border same as parent."
    },
    {
        topic: "layout",
        question: "What is 'unset' keyword?",
        options: ["Removes property", "Acts as inherit or initial depending on property", "Unsets styles", "Resets value"],
        correct: 1,
        explanation: "unset acts as inherit for inherited properties, initial for non-inherited. Universal reset that works intelligently based on property type."
    },
    {
        topic: "layout",
        question: "What does 'pointer-events: none' do?",
        options: ["Removes pointers", "Makes element not respond to mouse events", "Hides cursor", "Disables events"],
        correct: 1,
        explanation: "pointer-events: none makes element invisible to mouse events. Clicks pass through to elements below. Useful for overlays. Element can still receive keyboard focus."
    },
    {
        topic: "layout",
        question: "What's 'user-select: none' used for?",
        options: ["Prevents selection", "Prevents text selection", "Blocks users", "Removes selection"],
        correct: 1,
        explanation: "user-select: none prevents text selection. Useful for UI elements, buttons, or labels you don't want users to select. Be careful with accessibility - don't overuse."
    },
    {
        topic: "layout",
        question: "What does 'will-change' property do?",
        options: ["Promises changes", "Hints browser about future changes", "Changes elements", "Sets future styles"],
        correct: 1,
        explanation: "will-change hints browser about properties that will animate/change, allowing optimization. Example: will-change: transform; Don't overuse - only for actual performance issues."
    },
    {
        topic: "layout",
        question: "What's 'scroll-behavior: smooth'?",
        options: ["Smooth scrolling", "Enables smooth anchor link scrolling", "Smooths scroll bars", "Smooth animations"],
        correct: 1,
        explanation: "scroll-behavior: smooth enables smooth scrolling for anchor links and scrollTo() operations. Apply to html element. Modern alternative to JavaScript smooth scroll libraries."
    },
    {
        topic: "layout",
        question: "What does 'appearance: none' do?",
        options: ["Hides element", "Removes native styling from form elements", "Makes invisible", "Removes appearance"],
        correct: 1,
        explanation: "appearance: none removes browser's default styling from form elements like inputs, selects, and buttons, allowing full custom styling. Essential for custom form designs."
    },
    {
        topic: "selectors",
        question: "What does ':focus-within' select?",
        options: ["Focused elements", "Element or its descendants with focus", "Focus area", "Inner focus"],
        correct: 1,
        explanation: ":focus-within matches element if it or any descendant has focus. Great for styling form containers when inputs inside are focused. Example: form:focus-within { border-color: blue; }"
    },
    {
        topic: "selectors",
        question: "What's ':placeholder-shown' used for?",
        options: ["Shows placeholder", "Selects input while placeholder is visible", "Shown placeholders", "Placeholder styling"],
        correct: 1,
        explanation: ":placeholder-shown selects input/textarea elements that are currently showing placeholder text (i.e., empty). Different from ::placeholder which styles the placeholder text itself."
    },
    {
        topic: "selectors",
        question: "What does ':checked' pseudo-class do?",
        options: ["Checks elements", "Selects checked radio/checkbox inputs", "Validates checks", "Creates checkmarks"],
        correct: 1,
        explanation: ":checked selects radio buttons, checkboxes, or options that are checked/selected. Combine with sibling selectors for custom checkbox/radio styling without JavaScript."
    },
    {
        topic: "selectors",
        question: "What's '::selection' used for?",
        options: ["Selection menus", "Styles selected text", "Selects elements", "Creates selections"],
        correct: 1,
        explanation: "::selection styles text that user selects/highlights. Example: ::selection { background: yellow; color: black; } Limited properties work: color, background, text-shadow."
    },
    {
        topic: "layout",
        question: "What's 'max-width: 100%' commonly used for?",
        options: ["Maximum size", "Makes images responsive", "Limits width", "100% max"],
        correct: 1,
        explanation: "max-width: 100% on images prevents them from exceeding container width, making them responsive. Combined with height: auto, maintains aspect ratio while scaling."
    },
    {
        topic: "layout",
        question: "What does 'min-height: 100vh' do?",
        options: ["Minimum height", "Ensures element is at least full viewport height", "100 vertical", "Height view"],
        correct: 1,
        explanation: "min-height: 100vh makes element at least as tall as viewport. Great for full-height sections. Content can make it taller. vh = viewport height unit."
    },
    {
        topic: "layout",
        question: "What's the difference between 'width: auto' and 'width: 100%'?",
        options: ["No difference", "auto respects padding/border, 100% doesn't", "100% is better", "auto is default"],
        correct: 1,
        explanation: "width: auto adjusts to content and respects padding/border. width: 100% can cause overflow if padding/border added (with default box-sizing). auto is usually safer."
    },
    {
        topic: "animations",
        question: "What's '@supports' rule used for?",
        options: ["Support tickets", "Feature detection for CSS", "Supports browsers", "Creates support"],
        correct: 1,
        explanation: "@supports tests if browser supports CSS feature. Example: @supports (display: grid) { ... } Apply modern CSS with fallbacks. Also called feature queries."
    },
    {
        topic: "layout",
        question: "What does 'currentColor' keyword do?",
        options: ["Current color palette", "Uses element's current color value", "Gets current color", "Color currently used"],
        correct: 1,
        explanation: "currentColor references element's current 'color' property value. Example: border-color: currentColor; makes border match text color. Great for maintaining color consistency."
    },
    {
        topic: "layout",
        question: "What's 'column-count' property for?",
        options: ["Counts columns", "Creates multi-column layout", "Column numbers", "Counting system"],
        correct: 1,
        explanation: "column-count creates newspaper-style multi-column layout. Example: column-count: 3; Content flows into 3 columns. Use column-gap for spacing between columns."
    },
    {
        topic: "layout",
        question: "What does 'resize' property control?",
        options: ["Element size", "Whether user can resize element", "Resizes automatically", "Responsive sizing"],
        correct: 1,
        explanation: "resize allows user to resize element. Values: none, both, horizontal, vertical. Commonly used on textareas. Requires overflow other than visible to work."
    },
    {
        topic: "grid",
        question: "What's 'minmax()' function in Grid?",
        options: ["Min and max values", "Defines flexible size range", "Minimum maximum", "Range function"],
        correct: 1,
        explanation: "minmax(min, max) defines size range for grid tracks. Example: grid-template-columns: repeat(3, minmax(200px, 1fr)); creates columns between 200px and 1fr."
    },
    {
        topic: "layout",
        question: "What does 'all: unset' do?",
        options: ["Unsets all", "Resets all properties", "Removes all styles", "Clears all"],
        correct: 1,
        explanation: "all: unset resets all properties to inherited or initial values. Nuclear option for removing styles. Use sparingly as it affects everything including display."
    },
    {
        topic: "animations",
        question: "What's 'prefers-color-scheme' media query?",
        options: ["Color preferences", "Detects user's dark/light mode preference", "Scheme selector", "Preferred colors"],
        correct: 1,
        explanation: "@media (prefers-color-scheme: dark) detects if user's system is set to dark mode. Allows automatic dark/light theme switching. Values: light, dark."
    },
    {
        topic: "layout",
        question: "What does 'outline' differ from 'border'?",
        options: ["No difference", "outline doesn't affect layout", "border is better", "outline is newer"],
        correct: 1,
        explanation: "outline doesn't take up space (doesn't affect layout), appears outside border. Can't have rounded corners on each side independently. Good for focus indicators."
    }
];

// Practice State
let currentQuestionIndex = 0;
let questionsAttempted = 0;
let correctAnswers = 0;
let currentTopic = 'all';
let availableQuestions = [];
let answeredCurrentQuestion = false;

// DOM Elements
const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const explanationBox = document.getElementById('explanationBox');
const explanationText = document.getElementById('explanationText');
const nextQuestionBtn = document.getElementById('nextQuestionBtn');
const newQuestionBtn = document.getElementById('newQuestionBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');
const feedbackBadge = document.getElementById('feedbackBadge');

// Stats Elements
const questionsAttemptedEl = document.getElementById('questionsAttempted');
const correctCountEl = document.getElementById('correctCount');
const accuracyRateEl = document.getElementById('accuracyRate');

// Initialize Practice Mode
function initPractice() {
    loadStats();
    filterQuestions();
    loadQuestion();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    // Topic Filter
    document.querySelectorAll('.topic-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.topic-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentTopic = this.dataset.topic;
            filterQuestions();
            loadQuestion();
        });
    });

    // Next Question Button
    nextQuestionBtn.addEventListener('click', () => {
        loadQuestion();
    });

    // New Question Button (Skip)
    newQuestionBtn.addEventListener('click', () => {
        loadQuestion();
    });

    // Reset Stats Button
    resetStatsBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all practice statistics?')) {
            questionsAttempted = 0;
            correctAnswers = 0;
            updateStats();
            saveStats();
        }
    });
}

// Filter Questions by Topic
function filterQuestions() {
    if (currentTopic === 'all') {
        availableQuestions = [...practiceQuestions];
    } else {
        availableQuestions = practiceQuestions.filter(q => q.topic === currentTopic);
    }
    
    if (availableQuestions.length === 0) {
        availableQuestions = [...practiceQuestions];
    }
}

// Load Question
function loadQuestion() {
    // Reset state
    answeredCurrentQuestion = false;
    explanationBox.classList.remove('show');
    nextQuestionBtn.classList.remove('show');
    feedbackBadge.innerHTML = '';
    
    // Get random question
    currentQuestionIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[currentQuestionIndex];
    
    // Display question
    questionNumber.textContent = `Question ${questionsAttempted + 1}`;
    questionText.textContent = question.question;
    
    // Display options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = `
            <div class="option-label">${String.fromCharCode(65 + index)}</div>
            <div class="option-text">${option}</div>
        `;
        
        optionElement.addEventListener('click', () => {
            if (!answeredCurrentQuestion) {
                checkAnswer(index);
            }
        });
        
        optionsContainer.appendChild(optionElement);
    });
}

// Check Answer
function checkAnswer(selectedIndex) {
    if (answeredCurrentQuestion) return;
    
    answeredCurrentQuestion = true;
    questionsAttempted++;
    
    const question = availableQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        correctAnswers++;
    }
    
    // Update UI
    const options = document.querySelectorAll('.option');
    options.forEach((opt, idx) => {
        opt.classList.add('disabled');
        if (idx === question.correct) {
            opt.classList.add('correct');
        }
        if (idx === selectedIndex && !isCorrect) {
            opt.classList.add('incorrect');
        }
    });
    
    // Show feedback
    feedbackBadge.innerHTML = `
        <span class="feedback-badge ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </span>
    `;
    
    // Show explanation
    explanationText.textContent = question.explanation;
    explanationBox.classList.add('show');
    nextQuestionBtn.classList.add('show');
    
    // Update stats
    updateStats();
    saveStats();
}

// Update Stats Display
function updateStats() {
    questionsAttemptedEl.textContent = questionsAttempted;
    correctCountEl.textContent = correctAnswers;
    
    const accuracy = questionsAttempted > 0 
        ? Math.round((correctAnswers / questionsAttempted) * 100) 
        : 0;
    accuracyRateEl.textContent = `${accuracy}%`;
}

// Save Stats to localStorage
function saveStats() {
    const stats = {
        questionsAttempted,
        correctAnswers
    };
    localStorage.setItem('cssPracticeStats', JSON.stringify(stats));
}

// Load Stats from localStorage
function loadStats() {
    const saved = localStorage.getItem('cssPracticeStats');
    if (saved) {
        const stats = JSON.parse(saved);
        questionsAttempted = stats.questionsAttempted || 0;
        correctAnswers = stats.correctAnswers || 0;
        updateStats();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initPractice);