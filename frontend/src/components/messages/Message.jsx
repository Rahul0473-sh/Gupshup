const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR6fRZ8DTqWrZM_oUHLvSjkn1wTtg00UTATA&usqp=CAU"
          />
        </div>
      </div>
      <div className="chat-header">
        Anakin
        <time className="text-xs opacity-50">12:46</time>
      </div>
      <div className="chat-bubble">I Kill you!</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};

export default Message;
