---
slug: "lotus-rag"
title: "Building a Bilingual Q&A System for Lotus's with RAG"
date: "2024-01-15"
excerpt: "Developed and deployed a Retrieval-Augmented Generation (RAG) system for a major supermarket chain to handle customer queries in both Thai and English."
tags: ["RAG", "LLM", "NLP", "Retail", "Thai"]
coverImage: "assets/RAG.jpg"
---

### TLDR;

- Built a Q&A system for Lotus's, Thailand's second-largest supermarket chain.
- Used a hybrid approach of RAG and keyword search with a small-sized LLM to handle queries in both Thai and English.
- The system efficiently retrieves information from a knowledge base to answer customer questions.
- Successfully deployed a Minimum Viable Product (MVP).


![My Robot](/public/assets/lotus-s.jpeg)

### Problem Statement
The existing customer service response chatbot on the Lotus's website was a rule-based chatbot that presented static responses and only responded to a particular set of keywords. More nuanced responses needed real life customer support which increased the cost of the customer service department as more staff is needed.
The company was looking into ways to reduce the operating expenses by leveraging modern artificial-intelligence to answer common Q&A questions in a nuanced manner, in both English and Thai.


### Solution
This project was conducted during my three-month internship at Lotus's Thailand. My core objective was to build a functional prototype of a generative AI customer service agent capable of handling the company's specific knowledge base.
The parameters were as such:
- I was provided with an internal dataset of Q&A
- The model had to answer in both Thai and English, based on the prompt
- The answers had to be accurate and supplemented with the context from the Q&A as much as possible
- The response had to be fast, a few seconds at maximum and the usage of streaming was highly encouraged
- There was a hardware constraint based on the GPU they had in-house

Here is a deep dive into the technical architecture, model selection, and optimization strategies I employed.

#### 1. System Architecture: Hybrid RAG
Standard vector search is excellent for semantic understanding but often fails at specific keyword matching (e.g., specific product codes or names). To address this, I implemented a **Hybrid Retrieval** system:

*   **Dense Retrieval (Semantic Search):** I utilized **FAISS (Facebook AI Similarity Search)** to handle vector storage and retrieval. For embeddings, I selected `intfloat/multilingual-e5-large-instruct`. This model is specifically optimized for multilingual tasks, allowing the system to understand the semantic meaning of a query in both Thai and English effectively.
*   **Sparse Retrieval (Keyword Search):** To capture exact keyword matches which are crucial in retail (e.g., "Gift Card conditions"), I integrated **BM25** using the `rank_bm25` library.
*   **Ensemble Retriever:** I used **LangChain** to orchestrate an ensemble retriever that weights the results from both FAISS and BM25, ensuring the LLM receives the most accurate context chunks.

#### 2. Model Selection and Benchmarking
One of the biggest challenges was finding a model that was fluent in Thai, capable of English reasoning, and small enough to run on limited hardware. I benchmarked several models:

*   **Typhoon & SeaLLM:** These were strong contenders for Thai fluency. However, integration required specific prompting structures.
*   **OpenThaiGPT (7B):** I tested the `openthaigpt-1.0.0-7b-chat` model. It showed high proficiency in Thai syntax but occasionally struggled with complex reasoning logic compared to larger English-centric models.
*   **Llama 3 (8B Instruct):** Ultimately, I also experimented with Meta's Llama 3. Despite being English-centric, its reasoning capabilities are superior. By feeding it high-quality Thai context via RAG, it was able to hallucinate less and synthesize answers effectively.

#### 3. Hardware Optimization and Quantization
The project faced strict hardware constraints—I needed to run these models on a laptop or a standard Google Colab instance (T4 GPU). Loading a full 70B or even a standard 7B model in 16-bit precision was impossible.

To solve this, I utilized **Quantization** via `llama-cpp-python` and the **GGUF** file format.
*   I used **Q8_0 (8-bit quantization)** for the models. This reduced the memory footprint of the 7B/8B models to under 10GB of VRAM while maintaining near-original performance.
*   I enabled GPU offloading (`CMAKE_ARGS="-DLLAMA_CUDA=on"`) to ensure the matrix multiplications happened on the GPU rather than the CPU, keeping inference times down to a few seconds.

#### 4. The Application Layer
For the user interface and deployment of the MVP, I moved away from basic terminal scripts to a full-stack approach:
*   **Backend:** I used **FastAPI** to serve the model as an API.
*   **Frontend:** I deployed the chat interface using **Chainlit**. Chainlit provided an out-of-the-box ChatGPT-like UI that supported "Thought Process" toggling, allowing stakeholders to see exactly which source documents the RAG system retrieved before answering.
*   **Tunneling:** To demo the application live from the Google Colab environment to stakeholders, I used **ngrok** to create a secure tunnel to the localhost port.

### Results
The final MVP successfully ingested the Lotus's internal Q&A CSVs. It could handle questions like *"How do I accumulate Lotus Coins?"* in English or *"วิธีแลกคะแนนทำอย่างไร"* in Thai, retrieving the correct policy from the database and generating a coherent, natural language response.