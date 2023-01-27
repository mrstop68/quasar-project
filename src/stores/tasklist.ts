import { defineStore } from 'pinia';

export const useTaskList = defineStore('list', {
  state: () => ({
    task1: [
      {
        id: 1,
        title: 'Title 1',
        tags: 'Node',
        enddate: '2023/05/05',
        state: 'todo 1',
        description: 'wysiwyg 1',
      },
      {
        id: 2,
        title: 'Title 2',
        tags: 'PHP',
        enddate: '2023/08/08',
        state: 'todo 2',
        description: 'wysiwyg 2',
      },
      {
        id: 3,
        title: 'Title 3',
        tags: 'Javascript',
        enddate: '2023/12/12',
        state: 'todo 3',
        description: 'wysiwyg 3',
      },
    ],
  }),
});
