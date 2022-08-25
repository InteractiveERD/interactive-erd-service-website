import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";

function TestPage() {
  // states
  const [ws, setWs] = useState<WebSocket | undefined>();
  const [value, setValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // handlers
  const handleValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const onClickButton = () => {
    // console.log(`ws : ${JSON.stringify(ws, null, "\t")}`)
    if (!ws) return;
    if (!value) return;
    ws!.send(value);
  };

  const setWebSocket = () => {
    const HOST = "30.30.0.100:1323";
    const uri = `ws://${HOST}/ws`;
    let _ws = new WebSocket(uri);

    setWs(_ws);

    _ws.onopen = function () {
      console.log("on open");
      console.log("Connected!");
    };

    _ws.onclose = (ev : CloseEvent) =>{
      console.log("on close")
      console.log(JSON.stringify(ev, null, "\t"))
      
      _ws = new WebSocket(uri);
      setWs(_ws);
    }

    _ws.onerror = (ev : Event) =>{
      console.log("on error")
      console.log(JSON.stringify(ev, null, "\t"))
    }

    _ws.onmessage = function (evt: MessageEvent) {
      const data = evt.data;
      setMessage(JSON.stringify(data, null, "\t"));
    };
  };

  useEffect(() => {
    setWebSocket();
  }, []);
  return (
    <div>
      <Input value={value} onChange={handleValue} />
      <Button onClick={onClickButton}>{"전송"}</Button>
      <Text>{message}</Text>
    </div>
  );
}

export default TestPage;

const Input = styled.input``;
const Button = styled.button``;
const Text = styled.p``;
