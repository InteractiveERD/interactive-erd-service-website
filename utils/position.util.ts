export const getPositionByTransform = (el: HTMLElement) => {
   const transform = el.style.transform;
   const matrix = new WebKitCSSMatrix(transform);
   const x = matrix.m41;
   const y = matrix.m42;

   return {
      x: x,
      y: y,
   };
};


