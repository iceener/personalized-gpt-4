![AI_Devs #2](https://cloud.overment.com/aidevs-1694672760.png)

Repozytorium z kodem źródłowym z webinaru **Hiperpersonalizacja AI, czyli GPT-4 dopasowane do Ciebie**
Nagranie ze spotkania dostępne jest tutaj: https://www.youtube.com/watch?v=fgGrGF18ah8

Szkolenie AI Devs #2 zaczynamy 23 października. Dołącz do nas na https://aidevs.pl

⚠️ **UWAGA!** ⚠️
- Kod źródłowy jest przeznaczony wyłącznie do celów edukacyjnych. Nie należy go używać w środowisku produkcyjnym.
- Kod **nie jest** zoptymalizowany do pracy z dużymi zestawami danych.
- 🚨🚨 WAŻNE 🚨🚨 Przed uruchomieniem kodu, ustaw twardy limit $ na swoim koncie https://platform.openai.com
- Podczas webinaru kod był uruchamiany z modelem GPT-4 i jest to **rekomendowany model do realizowania takich zadań**. Jeśli nie posiadasz do niego dostępu, możesz zmienić model z gpt-4-0613 na gpt-3.5-turbo-0613, jednak precyzja aplikacji **znacznie spadnie**

## Instalacja

1. Pobierz repozytorium na swój komputer
2. Zmień nazwę pliku .env.example na .env
3. Dodaj swój klucz OpenAI API do pliku .env
4. Dodaj swój klucz Todoist API do pliku .env
5. Dodaj dowolny klucz API chroniący aplikację (może to być dowolny ciąg znaków) do pliku .env
6. Zainstaluj zależności poleceniem `bun install`
7. Uruchom kod poleceniem `bun start`
8. Serwer uruchomi się na porcie 3000
9. Wykonaj zapytanie CURL według poniższego przykładu, aby przetestować działanie aplikacji

## Ograniczenia

- Usunąłem z aplikacji obsługę notatek Notion, zostawiłem jednak schematy funkcji oraz przykładowe zapytanie do scenariusza make.com

## Pamięć długoterminowa

W pliku memory.md zapisane jest kilka wspomnień na mój temat. Jeśli chcesz je zmodyfikować lub dodać własne, możesz to zrobić, ale **pamię†aj o usunięciu pliku memory.index z katalogu "store"**. Wówczas przy pierwszym uruchomieniu aplikacji, indeks utworzy się ponownie.

UWAGA: Na potrzeby testów unikaj dodawania dużych ilości danych do tego pliku, a ich poszczególne fragmenty oddzielaj pustą linią.

## Przykładowe polecenie

Po uruchomieniu serwera według powyższych instrukcji wykonaj poniższe polecenie, aby przetestować działanie aplikacji.
Pamiętaj, aby w nagłówku Authorization podać swój klucz API (czyli dowolny ciąg znaków, z pliku .env).

Jeśli ustawisz jako zapytanie "polecenie dodania zadania do Todoist", to aplikacja zrobi to, pod warunkiem że Twój klucz API Todoist jest prawidłowy.

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer API_KEY" -d '{"query":"Who is Adam?"}' localhost:3000
```

## (zaawansowane) Integracja Slack & Wiadomości głosowe

Ten krok jest opcjonalny i nie jest wymagany do uruchomienia aplikacji. Pozwala jednak na podłączenie jej do Slacka, w tym także obsługę wiadomości głosowych.
Logika integracji Slack oraz wiadomości głosowych została stworzona w make.com (potrzebujesz podstaw jego obsługi, aby przejść przez poniższe kroki). Aby ją odwzorować, potrzebujesz:

1. Konto w make.com i Slack
2. Utworzyć nowy scenariusz automatyzacji w make.com
3. Zaimportować ten schemat (blueprint) — [Pobierz](https://cloud.overment.com/aidevs_slack-1697665252.json)
4. Zalogować się na konto Slack
5. 🚨 WAŻNE: Pomiędzy pierwszym modułem "New Message" a "Router" znajduje się filtr, na który należy kliknąć i ustawić w nim warunki sprawdzające, czy wiadomość pochodzi od naszego bota (można to zrobić na podstawie identyfikatora). Jest to konieczne, aby uniknąć ciągłego wysyłania wiadomości.
6. W module "Message JSON" należy utworzyć nową strukturę danych. Można ją utworzyć z pomocą generatora, w którym można wpisać obiekt JSON: **{"query":"..."}**
7. W module HTTP Request należy ustawić adres naszego serwera VPS oraz klucz API podany w pliku .env

Wskazówka: nie musisz konfigurować serwera, aby skorzystać w make.com ze swojej aplikacji. Na potrzeby testów, możesz skorzystać z bezpłatnego planu https://ngrok.com z pomocą którego udostępnisz serwer działający na **localhost:3000** publicznie. Wystarczy polecenie:

```bash
ngrok http localhost:3000
```

Wygenerowany adres URL możesz wpisać w module "Ask AI" w make.com.

![](https://cloud.overment.com/aidevs_dm-e08c8409-0.png)


## Dołącz do drugiej edycji AI_Devs

Więcej na temat pracy z dużymi modelami językowymi i łączenia ich z kodem, znajdziesz w drugiej edycji AI_Devs. Dołącz do nas na https://aidevs.pl