import React, { useEffect, useState } from 'react';

function useArrowLine() {
   const [, setState] = useState({});

   const updateArrowLinePosition = () => setState({})


   useEffect(() => {
      updateArrowLinePosition();
   })

   return {
      updateArrowLinePosition,
   };
}

export default useArrowLine;
