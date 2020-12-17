import { computed, reactive, onMounted } from 'vue'
export function compositionList (func: any) {
  const data = reactive({
    count: 0,
    page: 1,
    pageSize: 10,
    list: [],
    loading: false,
    finished: false,
    query: {}
  })

  const condition = computed(() => {
    return {
      page: data.page,
      limit: data.pageSize,
      query: data.query,
      sort: {
        createDate: -1
      }
    }
  })

  async function fetchData () {
    data.loading = true
    try {
      const { data: { data: { list, count } } } = await func(condition.value)
      data.count = count
      data.page += 1
      data.list = data.list.concat(list)
      console.log(data.count)
    } finally {
      data.loading = false
    }
  }

  onMounted(() => {
    fetchData()
  })

  function loadList () {
    if (data.list.length >= data.count) {
      data.finished = true
      return
    }

    return fetchData()
  }

  return {
    loadList,
    fetchData,
    data
  }
}
