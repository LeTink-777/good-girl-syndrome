export type PlanId = "basic" | "standard" | "premium";

export interface Plan {
  id: PlanId;
  /** Shown on the pricing card. */
  name: string;
  /** One-line description of what the tier contains. */
  summary: string;
  price: number;
  oldPrice: number;
  /** Goes into the YooKassa payment description. */
  yooDescription: string;
  /** Delivery window promised for this tier. */
  delivery: string;
  features: string[];
  /** Extra material listed in the PDF for this tier. */
  extras: string[];
  /** Highlighted as the recommended tier. */
  popular?: boolean;
  /** Renders the offer countdown on this tier. */
  timer?: boolean;
  /** Placeholder link to the audio commentary. */
  audioUrl?: string;
  /** Placeholder booking link for the personal session. */
  calendlyUrl?: string;
}

export const PLANS: Record<PlanId, Plan> = {
  basic: {
    "id": "basic",
    "name": "Разбор",
    "summary": "PDF-разбор синдрома и 30-дневный план границ",
    "price": 390,
    "oldPrice": 1290,
    "yooDescription": "Разбор синдрома хорошей девочки, базовый тариф",
    "delivery": "24 часа",
    "features": [
      "Полный разбор вашей степени синдрома",
      "7 признаков и как они проявляются у вас",
      "Корень в детстве: откуда это взялось",
      "30-дневный план восстановления границ",
      "PDF на почту"
    ],
    "extras": []
  },
  standard: {
    "id": "standard",
    "name": "Разбор с аудио",
    "summary": "PDF плюс аудиокомментарий к вашему результату",
    "price": 790,
    "oldPrice": 2490,
    "yooDescription": "Разбор синдрома хорошей девочки с аудиокомментарием",
    "delivery": "12 часов",
    "features": [
      "Всё из тарифа «Разбор»",
      "Аудиокомментарий к разбору, 20 минут",
      "Разбор трёх ситуаций, где отказать труднее всего",
      "Готовые формулировки отказа без оправданий"
    ],
    "extras": [
      "Аудиокомментарий к разбору: ссылка на файл приходит вместе с PDF и доступна на странице подтверждения заказа."
    ],
    "popular": true,
    "timer": true,
    "audioUrl": "/audio/commentary.mp3"
  },
  premium: {
    "id": "premium",
    "name": "Разбор и сессия",
    "summary": "PDF, аудио и личная сессия 30 минут",
    "price": 1490,
    "oldPrice": 4900,
    "yooDescription": "Разбор синдрома хорошей девочки с личной сессией",
    "delivery": "6 часов",
    "features": [
      "Всё из тарифа «Разбор с аудио»",
      "Личная сессия 30 минут",
      "Разбор ваших конкретных отношений и границ",
      "Ответы на вопросы по плану"
    ],
    "extras": [
      "Аудиокомментарий к разбору: ссылка на файл приходит вместе с PDF.",
      "Личная сессия 30 минут: ссылка для записи приходит письмом и доступна на странице подтверждения заказа."
    ],
    "audioUrl": "/audio/commentary.mp3",
    "calendlyUrl": "https://calendly.com/dvdkmv/30min"
  },
};

export const PLAN_IDS: PlanId[] = ["basic", "standard", "premium"];

export const PLAN_LIST: Plan[] = PLAN_IDS.map((id) => PLANS[id]);

export function isPlanId(value: string): value is PlanId {
  return (PLAN_IDS as string[]).includes(value);
}
