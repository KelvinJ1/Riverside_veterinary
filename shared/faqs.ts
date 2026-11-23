export type Faq = {
  question: string
  answer: string
}

export const newClientFaqs: Faq[] = [
  {
    question: 'Which animals do you see?',
    answer:
      'Dogs and cats. If you are unsure whether we are the right door, call and describe the animal before you book. We would rather say so early than start a visit we cannot do well.',
  },
  {
    question: 'How long should I set aside?',
    answer:
      'A first visit is a full appointment, longer than a vaccine stop. When the hospital confirms the time, it tells you how long to plan for, with a little room if the history runs long.',
  },
  {
    question: 'Can I stay with my animal?',
    answer:
      'Yes, for the conversation and the exam. If a moment apart would be kinder or safer, we say that before anyone leaves the room, and we say when we will be back.',
  },
  {
    question: 'Do you need records from the last clinic?',
    answer:
      'Bring what you have. A vaccine list, medications with doses, and the food label are enough to start. If an older record would change the plan, we request it with your permission. You do not need a complete file to be seen.',
  },
  {
    question: 'What if my animal is worse before the appointment?',
    answer:
      'Call the hospital. Do not wait on the form, and do not wait for the original time if breathing, bleeding, collapse, or pain has changed. The team will tell you whether to come in now.',
  },
  {
    question: 'Will I know the cost before something starts?',
    answer:
      'An estimate comes before any non-urgent procedure. The first visit itself is the exam and the conversation. If something extra is worth doing the same day, you hear the reason and the cost before it begins.',
  },
]
