# Liferay Devcon 2024 Pizza Chatbot

![Architecture](architecture.png)

## Custom GPT

https://chatgpt.com/g/g-jAkLiTuyU-liferay-devcon-2024-pizza-chatbot

## Liferay Chatbot

1. Clone this repo.
2. Install [blade](https://learn.liferay.com/w/dxp/liferay-development/tooling/blade-cli).
3. Navigate to the workspace:
    ```bash
    cd workspace
    ```
4. Initialize the server:
    ```bash
    blade server init
    rm -rf bundles/data/hypersonic
    ```
5. Run the server:
    ```bash
    OPENAI_API_KEY=**** blade server run -d
    ```
6. Deploy the code:
    ```bash
    blade deploy
    ```
7. Order a pizza like a pro:
    ```bash
    curl -X POST \
      -H 'Content-Type: application/json' \
      -u test@liferay.com:devcon \
      http://localhost:8080/o/chatbot/v1.0/chat \
      -d '{
        "openAPIURL": "http://localhost:8080/o/c/pizzaorders/openapi.yaml",
        "messages": [
          {
            "content": "I want a pizza carbonara delivered to Budapest, Erzsébet tér 12, 1051 Hungary",
            "source": "USER"
          }
        ]
      }'
    ```
8. Let's build a chat UI!

