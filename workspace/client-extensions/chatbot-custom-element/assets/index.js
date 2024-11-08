import React, { useState } from "react";
import ReactDOM from "react-dom";
import ClayForm, { ClayInput } from "@clayui/form";
import ClayButton from "@clayui/button";
import ClayCard from "@clayui/card";
import ClayLoadingIndicator from "@clayui/loading-indicator";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div className="p-4">
      <div>
        {messages.map((msg, index) => (
          <div
            className={
              "d-flex flex-column " +
              (msg.source === "USER" ? "align-items-end" : "align-items-start")
            }
          >
            <ClayCard key={index}>
              <ClayCard.Body>
                <ClayCard.Description truncate={false} displayType="text">
                  {msg.content || (
                    <ClayLoadingIndicator
                      displayType="primary"
                      shape="squares"
                      size="sm"
                    />
                  )}
                </ClayCard.Description>
              </ClayCard.Body>
            </ClayCard>
          </div>
        ))}
      </div>
      <ClayForm
        onSubmit={async (e) => {
          e.preventDefault();

          if (!input.trim()) return;

          const newMessages = [...messages, { content: input, source: "USER" }];

          setMessages([...newMessages, { content: "", source: "SYSTEM" }]);
          setInput("");

          const response = await fetch("/o/chatbot/v1.0/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-csrf-token": Liferay.authToken,
            },
            body: JSON.stringify({
              messages: newMessages,
              openAPIURL:
                "https://hopelessly-touched-bluegill.ngrok-free.app/o/c/devcon2024pizzaworkshopratings/openapi.yaml",
            }),
          });

          const { content } = await response.json();
          setMessages([...newMessages, { content, source: "SYSTEM" }]);
        }}
      >
        <ClayForm.Group>
          <ClayInput.Group>
            <ClayInput.GroupItem prepend>
              <ClayInput
                placeholder="Message Chatbot"
                type="text"
                value={input}
                onInput={(e) => setInput(e.target.value)}
              />
            </ClayInput.GroupItem>
            <ClayInput.GroupItem append shrink>
              <ClayButton displayType="primary" type="submit">
                Submit
              </ClayButton>
            </ClayInput.GroupItem>
          </ClayInput.Group>
        </ClayForm.Group>
      </ClayForm>
    </div>
  );
}

class CustomElement extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<Chatbot />, this);
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this);
  }
}

const ELEMENT_NAME = "chatbot-custom-element";

if (!customElements.get(ELEMENT_NAME)) {
  customElements.define(ELEMENT_NAME, CustomElement);
}
