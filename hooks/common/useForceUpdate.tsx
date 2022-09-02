import React, { useEffect, useState } from 'react';

function useForceUpdate() {
   const [value, setValue] = useState(0);

   const forceUpdate = () => setValue(value => value + 1);

   useEffect(() => {
      // console.log(value);
   }, [value]);
   return { value, forceUpdate };
}

export default useForceUpdate;
