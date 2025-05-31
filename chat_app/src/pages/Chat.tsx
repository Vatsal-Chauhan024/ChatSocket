import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../lib/socket";
import { CommonButton, CommonInput, MessageComponent } from "../components";
import { English } from "../Constants";
import type { SpecificMessageType } from "../types/Chat";
import { toast } from "react-toastify";
import { Utility } from "../helpers";

const Chat = () => {
  const location = useLocation();
  const specificUser = useMemo(() => {
    return location.state?.user;
  }, [location.state?.user]);
  const [message, setMessage] = useState("");
  const [totalMessages, setTotalMessages] = useState<SpecificMessageType[]>([]);

  const onPressSend = useCallback(() => {
    if (message.trim().length === 0) {
      toast.error(English.E6);
      return;
    }
    socket.emit("message", { message });
    setMessage("");
  }, [message]);
  const navigate = useNavigate()

  useEffect(() => {
    if (!specificUser) {
      navigate('/')
      return
    };

    socket.emit("joined", specificUser);
    socket.on("welcome", (data: SpecificMessageType) => {
      setTotalMessages((prev) => [...prev, data]);
    });
    socket.on("userJoined", (data: SpecificMessageType) => {
      setTotalMessages((prev) => [...prev, data]);
    });
    socket.on("userLeft", (data: SpecificMessageType) => {
      setTotalMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [navigate, specificUser]);

  useEffect(() => {
    socket.on("sendMessage", (data: SpecificMessageType) => {
      setTotalMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    if(totalMessages?.length > 0){
       Utility.ScrollToDiv('scrollToDiv', true)
    }
  }, [totalMessages?.length])

  return (
    <div className="bg-black/95 w-screen h-screen flex items-center justify-between">
      <div className="bg-white h-2/3 w-[75%] mx-auto">
        <div className="bg-red-400 h-[15%]">
          <h1 className="text-3xl font-semibold flex items-center justify-start h-full pl-5 text-slate-800">{English.E1}</h1>
        </div>
        <div className=" h-[70%] overflow-y-auto" id="scrollToDiv">
          {totalMessages.map((messageItem) => {
            return (
              <MessageComponent
                isLeft={messageItem?.user === specificUser}
                item={messageItem}
                key={messageItem?.message}
              />
            );
          })}
        </div>
        <div className=" mt-2 px-2 flex items-center gap-3">
          <CommonInput
            type="text"
            className="max-w-4/5 w-full shrink-0 grow"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(event) => {
              if(event.key === 'Enter'){
                onPressSend()
              }
            }}
          />
          <CommonButton
            type="button"
            content={English.E5}
            className="normal__button !w-full"
            onClick={() => {
              onPressSend();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
