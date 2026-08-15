# Разбор синдрома хорошей девочки

Тест на синдром хорошей девочки: степень выраженности, 7 признаков, корень в детстве и 30-дневный план восстановления границ. Степень — бесплатно.

- Стек: Next.js 16 (App Router), TypeScript strict, Tailwind CSS 4, Framer Motion, Lucide.
- Оплата: ЮKassa REST API через fetch, без SDK. `payment_method_type` не передаётся, поэтому доступны все подключённые способы: карты, СБП, ЮMoney, оплата частями.
- PDF: @react-pdf/renderer со встроенным PT Sans (кириллица).
- Письма: Resend, вложение с PDF.

## Маршруты

| Путь | Назначение |
| --- | --- |
| `/` | Лендинг с формой |
| `/result` | Бесплатная часть результата, остальное под пейволом |
| `/thank-you` | Подтверждение оплаты и скачивание PDF |
| `/blog`, `/blog/[slug]` | Блог, 5 статьи |
| `/privacy`, `/offer` | Политика конфиденциальности и оферта |
| `/api/checkout` | Создание платежа ЮKassa |
| `/api/webhook` | Уведомление об оплате, отправка письма с PDF |
| `/api/generate-pdf` | Генерация PDF по ответам |

## Настройка ЮKassa

- Return URL: `https://good-girl-syndrome.vercel.app/thank-you`
- Webhook URL: `https://good-girl-syndrome.vercel.app/api/webhook` — события `payment.succeeded` и `payment.canceled`

## Локальный запуск

```bash
npm install
npm run dev
```

Переменные окружения — в `.env.local` (см. `.env.example`).
