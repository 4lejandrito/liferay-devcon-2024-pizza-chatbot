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
5. Run the server (you need an [OpenAI API Key](https://platform.openai.com/api-keys)):
    ```bash
    OPENAI_API_KEY=**** blade server run -d
    ```
    > The issue we encountered during the live presentation was due to OpenAI detecting exposed keys in public GitHub repositories and automatically disabling them. As soon as I made the repository public, the key was deactivated.
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

