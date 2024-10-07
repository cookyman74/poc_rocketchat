<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## 개요

이 프로젝트는 **NestJS** 서버와 **Rocket.Chat** API를 연동하여 그룹 채팅, 채널 채팅, 다이렉트 메시지와 같은 기능을 지원하는 PoC입니다. NestJS 서버는 Rocket.Chat의 REST API를 사용하여 채팅방 생성, 사용자 초대, 메시지 전송 및 조회 등의 기능을 제공합니다.

## 기술 스택

- **NestJS**: 서버 프레임워크
- **Rocket.Chat**: 오픈 소스 채팅 서버
- **TypeScript**: 프로그래밍 언어
- **Axios**: HTTP 클라이언트
- **Docker**: 컨테이너화 및 Rocket.Chat 설치

## 프로젝트 구조

```csharp
├── src
│   ├── common
│   │   └── rocket-chat-http.service.ts   # Rocket.Chat과의 HTTP 통신을 담당하는 서비스
│   ├── group-chat
│   │   └── group-chat.service.ts         # 그룹 채팅 관련 서비스
│   ├── channel-chat
│   │   └── channel-chat.service.ts       # 채널 채팅 관련 서비스
│   ├── direct-chat
│   │   └── direct-chat.service.ts        # 다이렉트 메시지 관련 서비스
│   ├── user
│   │   └── user.service.ts               # 사용자 관리 관련 서비스
│   ├── dto
│   │   └── create-room.dto.ts            # 방 생성 DTO
│   │   └── send-message.dto.ts           # 메시지 전송 DTO
│   ├── app.controller.ts                 # 모든 컨트롤러 정의
│   └── app.module.ts                     # 메인 모듈
├── rocket-chat
│   └── docker-compose.yml                # Rocket.Chat 및 MongoDB Docker Compose 파일
├── README.md                             # 프로젝트 설명서
└── ...

```

## 요구 사항

- **Docker** 및 **Docker Compose**
- **Node.js** (v14 이상)
- **yarn** 또는 **npm**

## 설치 및 실행

### 1. **Docker로 Rocket.Chat 서버 설치**

Rocket.Chat과 MongoDB를 Docker Compose로 쉽게 설치할 수 있습니다. 먼저, **rocket-chat/docker-compose.yml** 파일을 실행합니다.

#### **docker-compose.yml**

```yaml
version: '3'

services:
  rocketchat:
    image: rocket.chat:latest
    environment:
      - MONGO_URL=mongodb://mongo:27017/rocketchat
      - ROOT_URL=http://localhost:3000
      - PORT=3000
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - ./data/db:/data/db
    restart: unless-stopped
```

### 2. **Docker Compose 실행**

아래 명령어로 Docker Compose를 실행합니다.

```bash
docker-compose -f rocket-chat/docker-compose.yml up -d
```

이 명령어를 통해 **Rocket.Chat**과 **MongoDB**가 컨테이너로 실행됩니다.

### 3. **Rocket.Chat 서버 접속**

Rocket.Chat 서버가 성공적으로 실행되면, **http://localhost:3000**으로 브라우저에서 접속할 수 있습니다. 초기 설정을 완료하고 사용자 계정을 생성합니다.

### 4. **NestJS 서버 설치**

**NestJS** 서버를 설치하려면, 프로젝트 루트에서 아래 명령어를 실행하여 필요한 패키지를 설치합니다.

```bash
yarn install
```

### 5. **환경 변수 설정**

**Rocket.Chat** API와 통신하기 위한 환경 변수를 설정합니다. **`.env`** 파일을 프로젝트 루트에 생성합니다.

```makefile
ROCKET_CHAT_BASE_URL=http://localhost:3000/api/v1
ROCKET_CHAT_AUTH_TOKEN=<Your-Auth-Token>
ROCKET_CHAT_USER_ID=<Your-User-Id>
```

**ROCKET_CHAT_AUTH_TOKEN**과 **ROCKET_CHAT_USER_ID**는 Rocket.Chat에 로그인 후 사용자 설정에서 API 토큰을 발급받아 사용합니다.

### 6. **NestJS 서버 실행**

아래 명령어로 NestJS 서버를 실행합니다.

```bash
yarn start:dev
```


서버는 기본적으로 **http://localhost:6000**에서 실행됩니다.

## 주요 API 기능 및 테스트 방법

### 1. **그룹 채팅방 생성**

새로운 그룹 채팅방을 생성하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X POST http://localhost:6000/chat/create-room \
  -H "Content-Type: application/json" \
  -d '{"name": "test-room", "members": ["cookyman", "cookyman2"]}'
```

### 2. **사용자 생성**

새로운 사용자를 생성하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X POST http://localhost:6000/chat/create-user \
  -H "Content-Type: application/json" \
  -d '{"username": "cookyman", "email": "cookyman@example.com", "password": "password123"}'
```

### 3. **특정 사용자 검색**

특정 사용자를 검색하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X GET "http://localhost:6000/chat/search-user?username=cookyman"
```

### 4. **채널 메시지 전송**

채널에 메시지를 전송하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X POST http://localhost:6000/chat/send-message \
  -H "Content-Type: application/json" \
  -d '{"roomId": "roomId12345", "message": "Hello World"}'
```

### 5. **채널 메시지 조회**

채널에 전송된 메시지를 조회하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X GET "http://localhost:6000/chat/messages?roomId=roomId12345"
```

### 6. **다이렉트 메시지 채널 생성**

다이렉트 메시지 채널을 생성하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X POST http://localhost:6000/chat/create-direct-message \
  -H "Content-Type: application/json" \
  -d '{"username": "cookyman2"}'
```

### 7. **다이렉트 메시지 전송**

다이렉트 메시지를 전송하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X POST http://localhost:6000/chat/send-direct-message \
  -H "Content-Type: application/json" \
  -d '{"roomId": "directRoomId123", "message": "Hello, cookyman2!"}'
```

### 8. **다이렉트 메시지 조회**

다이렉트 메시지를 조회하려면 아래의 **curl** 명령어를 사용합니다.

```bash
curl -X GET "http://localhost:6000/chat/direct-messages?roomId=directRoomId123"
```

## 결론

이 PoC는 **NestJS** 서버와 **Rocket.Chat**을 통합하여 채팅 기능을 손쉽게 구현할 수 있는 구조와 가능여부를 확인하였습니다. 본 PoC를 통해 채팅방 생성, 사용자 관리, 메시지 전송 등 채팅과 관련된 다양한 부가 기능을 API로 구현할 수 있을 것으로 판단되고, 이를 바탕으로 더욱 확장된 기능을 구현할 수 있을 것 같습니다.
