import { formatBirth } from "@/lib/numerology";

export type QuizAnswers = Record<string, string>;

export type FieldType = "text" | "date" | "textarea" | "radio";

export interface FieldOption {
  id: string;
  label: string;
  /** Points this option adds to each result type. */
  score?: Record<string, number>;
}

export interface QuizField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  help?: string;
  required: boolean;
  /** Lay the radio buttons out in two columns. */
  columns?: number;
  /** Include this answer in the short summary shown on /result. */
  summary?: boolean;
  options?: FieldOption[];
}

export const FIELDS: QuizField[] = [
  {
    "id": "name",
    "type": "text",
    "label": "Как вас зовут",
    "placeholder": "Имя",
    "required": true,
    "summary": true
  },
  {
    "id": "birth",
    "type": "date",
    "label": "Дата рождения",
    "help": "Используется для дополнительного слоя разбора.",
    "required": true,
    "summary": true
  },
  {
    "id": "q1",
    "type": "radio",
    "label": "1. Как часто вы соглашаетесь на то, чего на самом деле не хотите?",
    "required": true,
    "options": [
      {
        "id": "a",
        "label": "Редко — обычно говорю прямо",
        "score": {
          "severity": 0
        }
      },
      {
        "id": "b",
        "label": "Иногда, если человек важен",
        "score": {
          "severity": 1
        }
      },
      {
        "id": "c",
        "label": "Часто — отказать почти не получается",
        "score": {
          "severity": 2
        }
      },
      {
        "id": "d",
        "label": "Почти всегда, я и не думаю об отказе",
        "score": {
          "severity": 3
        }
      }
    ]
  },
  {
    "id": "q2",
    "type": "radio",
    "label": "2. Что вы чувствуете сразу после того, как отказали?",
    "required": true,
    "options": [
      {
        "id": "a",
        "label": "Ничего особенного",
        "score": {
          "severity": 0
        }
      },
      {
        "id": "b",
        "label": "Лёгкую неловкость, быстро проходит",
        "score": {
          "severity": 1
        }
      },
      {
        "id": "c",
        "label": "Вину, прокручиваю разговор",
        "score": {
          "severity": 2
        }
      },
      {
        "id": "d",
        "label": "Сильную тревогу, часто перезваниваю и соглашаюсь",
        "score": {
          "severity": 3
        }
      }
    ]
  },
  {
    "id": "q3",
    "type": "radio",
    "label": "3. Как вы реагируете, если кто-то вами недоволен?",
    "required": true,
    "options": [
      {
        "id": "a",
        "label": "Спокойно, это его право",
        "score": {
          "severity": 0
        }
      },
      {
        "id": "b",
        "label": "Неприятно, но живу дальше",
        "score": {
          "severity": 1
        }
      },
      {
        "id": "c",
        "label": "Начинаю исправлять ситуацию, даже если не виновата",
        "score": {
          "severity": 2
        }
      },
      {
        "id": "d",
        "label": "Не могу успокоиться, пока не вернула расположение",
        "score": {
          "severity": 3
        }
      }
    ]
  },
  {
    "id": "q4",
    "type": "radio",
    "label": "4. Часто ли вы просите о помощи?",
    "required": true,
    "options": [
      {
        "id": "a",
        "label": "Да, когда нужно — прошу",
        "score": {
          "severity": 0
        }
      },
      {
        "id": "b",
        "label": "Прошу, но с трудом",
        "score": {
          "severity": 1
        }
      },
      {
        "id": "c",
        "label": "Почти никогда, справляюсь сама",
        "score": {
          "severity": 2
        }
      },
      {
        "id": "d",
        "label": "Никогда — просить неудобно и стыдно",
        "score": {
          "severity": 3
        }
      }
    ]
  },
  {
    "id": "q5",
    "type": "radio",
    "label": "5. Если вас спросят, чего хотите именно вы, — ответ найдётся?",
    "required": true,
    "options": [
      {
        "id": "a",
        "label": "Да, сразу",
        "score": {
          "severity": 0
        }
      },
      {
        "id": "b",
        "label": "Найдётся, но нужно подумать",
        "score": {
          "severity": 1
        }
      },
      {
        "id": "c",
        "label": "Обычно отвечаю «как вам удобно»",
        "score": {
          "severity": 2
        }
      },
      {
        "id": "d",
        "label": "Я давно не знаю, чего хочу сама",
        "score": {
          "severity": 3
        }
      }
    ]
  }
];

/** Radio fields start unselected on purpose — the answer has to be a real one. */
export const DEFAULTS: QuizAnswers = {};

const BY_ID = new Map(FIELDS.map((field) => [field.id, field]));

export function labelFor(fieldId: string, value: string): string {
  const field = BY_ID.get(fieldId);
  if (!field) return value;
  if (field.type === "date") return formatBirth(value);
  if (field.type !== "radio") return value;
  return field.options?.find((option) => option.id === value)?.label ?? value;
}

/** Returns the first problem found, or null when the form is ready to submit. */
export function validate(answers: QuizAnswers): string | null {
  for (const field of FIELDS) {
    if (!field.required) continue;
    const value = (answers[field.id] ?? "").trim();
    if (!value) {
      return field.type === "radio"
        ? `Выберите вариант: ${field.label}`
        : `Заполните поле: ${field.label}`;
    }
    if (field.type === "date" && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return "Укажите дату рождения полностью";
    }
  }
  return null;
}

/** Sums the per-option weights into a score for each result type. */
export function scoreAnswers(answers: QuizAnswers): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const field of FIELDS) {
    if (field.type !== "radio") continue;
    const chosen = field.options?.find((option) => option.id === answers[field.id]);
    if (!chosen?.score) continue;
    for (const [type, points] of Object.entries(chosen.score)) {
      totals[type] = (totals[type] ?? 0) + points;
    }
  }
  return totals;
}

/** Every answered field, written out for the PDF. */
export function describeAnswers(answers: QuizAnswers): string[] {
  const lines: string[] = [];
  for (const field of FIELDS) {
    const value = (answers[field.id] ?? "").trim();
    if (!value) continue;
    lines.push(`${field.label}: ${labelFor(field.id, value)}`);
  }
  return lines;
}

/** The one-line version shown under the free teaser on /result. */
export function summaryAnswers(answers: QuizAnswers): string[] {
  const lines: string[] = [];
  for (const field of FIELDS) {
    if (!field.summary) continue;
    const value = (answers[field.id] ?? "").trim();
    if (!value) continue;
    lines.push(labelFor(field.id, value));
  }
  return lines;
}
