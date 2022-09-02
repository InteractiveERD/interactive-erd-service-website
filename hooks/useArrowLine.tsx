import React, { useCallback, useEffect, useState } from 'react';

// type Props= {
//    tablePosition : {
//       x : number;
//       y : number;
//    }
// }

function useArrowLine() {
   const [_, setState] = useState({});

   const updateArrowLinePosition = useCallback(() => setState({}), []);

   useEffect(() => {
      updateArrowLinePosition();
   });

   return {
      updateArrowLinePosition,
   };
}

export default useArrowLine;
