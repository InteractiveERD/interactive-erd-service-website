import React from 'react'
import styled from 'styled-components'

function DiagramPage() {
  return (
    <DiagramPageWrap>
      <SideWindowWrap>{"asdljaskdjdals"}</SideWindowWrap>
    </DiagramPageWrap>
  )
}

export default DiagramPage


const DiagramPageWrap = styled.div``
const SideWindowWrap  =styled.section`
  position : fixed;
  height : 100%;
  left : 0;
  top : 0;
  bottom : 0;
  width : 300px;
  background-color: navy;
`