import React from 'react'
import styled from 'styled-components'

function DiagramHeader() {
  return (
    <DiagramHeaderWrap>DiagramHeader</DiagramHeaderWrap>
  )
}

export default DiagramHeader


const DiagramHeaderWrap = styled.section`
    width : 100%;
    height : 50px;
    background-color: white;
`


// TODO: 피그마처럼 협업용으로 만들거라 해당 UI 참고해도 좋을듯.(+ dbdiagram.io)