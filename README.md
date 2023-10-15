# VTB^MAPI^

Mobile-first ассистент для клиентов ВТБ банка

## Главные фичи продукта

- карта с отметками ближайших банкоматов
- фильтрация на карте
- список ближайших отделений по геопозиции
- Подробная информация по выбранному отделению
- возможности поиска интересующей услуги, вопроса, и тд

## Используемые технологии
- Postgres & PostGIS
- Ansible
- Docker & Docker compose
- Typescript
- OSRM (в процессе интеграции)
- Node.js
    - Express
- React
    - Tailwind CSS
    - Vite
    - Daisy UI
    - Leaflet

## Инструкция по запуску

### требования к хосту
- https://github.com/nvm-sh/nvm & node v20
- docker
- docker compose

```bash
nvm install
nvm use
npm ci
```

### Вспомогательные сервисы
- создать файл /.env

```
DB_DB=mapi
DB_USER=mapi
DB_PASSWORD=my_password
```

```bash
docker compose -f docker-compose.yml --env-file .env up -d --pull=always --build --timestamps
```

### API
- создать файл /apps/server/.env

```
LISTEN=3000
DB_URI=postgresql://mapi:my_password@localhost:5432/mapi
```

- запуск
```bash
npm run -w @vtb/server dev
```


Made by /talkiiing team
