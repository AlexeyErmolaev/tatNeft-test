import { createEvent, createStore, sample } from 'effector';

const mockedArticles = [
  {
    id: 1,
    title: 'Создание сервера для онлайн ММО игр на PHP ч. 10 — Открытый бесшовной мира в 2D игре и причем тут беспилотники',
    description: `Дело в том, что Sleep добавляют не только начинающие программисты. Мне встречались программисты, которые при опыте 3–5 лет работы делали такой фикс и в тестах кода, и в продакшене. Подобный код является по своей сути бомбой замедленного действия. Важно понять одно: если вы делаете фиск такого рода, он может быть замаскирован до поры до времени. Потом пройдёт обновление операционной системы или же вы поменяете железо на новое и все, тайминги изменятся и старые проблемы станут явными.

    Обратите внимание, увеличение времени sleep‑а — тоже не выход :)
    
    Подход «Логов, больше логов» маскирует concurrency проблему
    Порой обнаружение корня проблемы занимает много времени, поэтому программисты на практике часто добавляют логи для дальнейшего изучения проблемы, что правильно. Можно добавить немного логов — это действительно полезно и помогает решению проблемы. Но, бывает, добавляют лог‑сообщения через строчку. У вас там маленький кусок кода, обложенный кучей логов, и код чудесным образом перестает падать. Потом через какое‑то время поднимается история бага, и оказывается, что он не воспроизводился некоторое время. Поэтому баг закрывают по причине «Не воспроизводится N месяцев, возможно, уже пофиксили». А на деле баг остался.
    
    Давайте разберемся, почему это пока «работает». В местах добавления логов код начинает выполняться медленнее и создаёт иллюзию, что рассинхрона нет и все «заработало», но ничего подобного. Нужно всегда помнить, input/output операции дорого стоят с точки зрения ресурсов системы.`,
    theme: 'Разработка игр',
    author: 'Alexey Ermolaev',
    timestamp: new Date().getTime()
  },
  {
    id: 2,
    title: 'Создание сервера для онлайн ММО игр на PHP ч. 10 — Открытый бесшовной мира в 2D игре и причем тут беспилотники',
    description: `Дело в том, что Sleep добавляют не только начинающие программисты. Мне встречались программисты, которые при опыте 3–5 лет работы делали такой фикс и в тестах кода, и в продакшене. Подобный код является по своей сути бомбой замедленного действия. Важно понять одно: если вы делаете фиск такого рода, он может быть замаскирован до поры до времени. Потом пройдёт обновление операционной системы или же вы поменяете железо на новое и все, тайминги изменятся и старые проблемы станут явными.

    Обратите внимание, увеличение времени sleep‑а — тоже не выход :)
    
    Подход «Логов, больше логов» маскирует concurrency проблему
    Порой обнаружение корня проблемы занимает много времени, поэтому программисты на практике часто добавляют логи для дальнейшего изучения проблемы, что правильно. Можно добавить немного логов — это действительно полезно и помогает решению проблемы. Но, бывает, добавляют лог‑сообщения через строчку. У вас там маленький кусок кода, обложенный кучей логов, и код чудесным образом перестает падать. Потом через какое‑то время поднимается история бага, и оказывается, что он не воспроизводился некоторое время. Поэтому баг закрывают по причине «Не воспроизводится N месяцев, возможно, уже пофиксили». А на деле баг остался.
    
    Давайте разберемся, почему это пока «работает». В местах добавления логов код начинает выполняться медленнее и создаёт иллюзию, что рассинхрона нет и все «заработало», но ничего подобного. Нужно всегда помнить, input/output операции дорого стоят с точки зрения ресурсов системы.`,
    theme: 'Дача',
    author: 'Alexey Ermolaev',
    timestamp: new Date().setDate(new Date().getDate() - 2)
  }
]
export interface IArticle {
  id: number,
  title: string,
  description: string,
  theme: string,
  author: string,
  timestamp: number
}

//Events
export const resetFiltersStores = createEvent()
export const changeThemeFilter = createEvent<string>()
export const changeAuthorFilter = createEvent<string>()
export const handleFilterArticles = createEvent()
export const handleDeleteArticle = createEvent<number>()
export const changeDateFilter = createEvent<string>()

//Stores
export const $themeFilter = createStore<string>('').reset(resetFiltersStores)
export const $authorFilter = createStore<string>('').reset(resetFiltersStores)
export const $dateFilter = createStore<string>('').reset(resetFiltersStores)
export const $articles = createStore<IArticle[]>(mockedArticles)
export const $filteredArticles = createStore<IArticle[]>(mockedArticles)


$themeFilter.on(changeThemeFilter, (_, value) => value)
$authorFilter.on(changeAuthorFilter, (_, value) => value)
$dateFilter.on(changeDateFilter, (_, value) => value)

sample({
  clock: handleFilterArticles,
  source: {
    articles: $articles,
    themeFilter: $themeFilter,
    authorFilter: $authorFilter,
    dateFilter: $dateFilter
  },
  fn: ({articles, themeFilter, authorFilter, dateFilter}) => {
    let filtered = articles
    if (!themeFilter && !authorFilter && !dateFilter) {
      return filtered
    } else if (themeFilter) {
      filtered = filtered.filter(article => article.theme.includes(themeFilter))
    } else if (authorFilter) {
      filtered = filtered.filter(article => article.author.includes(authorFilter))
    } else if (dateFilter) {
      filtered = filtered.filter(article => new Date(article.timestamp).toDateString() === new Date(dateFilter).toDateString())
    }
    return filtered
  },
  target: $filteredArticles
})

sample({
  clock: handleDeleteArticle,
  source: $articles,
  fn: (articles: IArticle[], id: number) => {
    const filteredArticles = articles.filter(article => article.id !== id)
    return filteredArticles
  },
  target: [$articles , $filteredArticles]
})