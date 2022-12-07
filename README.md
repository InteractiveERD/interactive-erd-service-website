# Interactive ERD v1.0
: Draw your own interactive ER diagram using react. Inspired by dbdiagram.io. And this is just a sample product.

## Background
: Want to know how does this ERD maker like dbdiagram product works. 

## Tech Stacks
- FE : Next.js, Typescript
- Hosting : Firebase Hosting
## Demo
: You can experience demo project according to these steps below.
1. Access to the url(`https://interactiveerd.web.app`). 
2. Click 'Get started' button on right of the header.

<img src="https://user-images.githubusercontent.com/37768791/206095088-d464457a-49de-4df4-b3d7-2e883d60c78d.gif"/>

## Supported Features
- [x] Drag & Drop table component with no third-party library.
- [x] Connect arrow line which can represent relationship to each table with no third-party library..
    - [x] Put text on every side of bidirectional arrow line(start, end, middle).
    - [x] Polyline shape lines for better visualization.
- [x] Select mode, drag mode available.
- [ ] Comments mode still not available.(like Figma comment)
- [ ] Realtime share system still not available.
- [ ] Table insertion still developing.

## References
### Logic
URL : https://jsbin.com/vurumupoqu/1/edit?html,output

### Issues
: Issues that I faced while making this product. Huge thanks for all people who gave me below solutions.
- [ISSUE] mouse event escape when move too fast => DraggableTable component
URL : https://stackoverflow.com/questions/56822929/how-to-process-mousemove-event-in-parent-in-react
- [ISSUE] getBoundingClientRect changes while scrolling => ArrowLine component
URL : https://stackoverflow.com/questions/25630035/javascript-getboundingclientrect-changes-while-scrolling