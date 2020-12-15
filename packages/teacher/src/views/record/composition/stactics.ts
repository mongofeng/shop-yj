import { COURSE_HOUR_ACTION_TYPE } from '@root/common/const/enum'
import dayjs from 'dayjs'
import { commonQuery } from '@root/common/api/statistics'
import { useStore } from 'vuex'
import { onMounted, reactive, toRefs } from 'vue'

export function getStatistics (collectionName: string) {
  const store = useStore()

  const statistics = reactive({
    today: 0,
    month: 0,
    all: 0
  })

  const teacherId = store.state.oauth.userid
  // 东八区0点，ISODate("2020-12-14T16:00:00.730Z")  $expr: { $gte: ['$createDate', { $toDate: '2020-12-15 00:00:00 +0800' }] }
  const today = dayjs().format('YYYY-MM-DD 00:00:00 +0800')
  const teacherMatch = JSON.stringify({
    $match: {
      teacherId, // 选择老师
      $expr: { $gte: ['$createDate', { $toDate: today }] }, // 选择时间
      type: {
        $in: [COURSE_HOUR_ACTION_TYPE.supplement, COURSE_HOUR_ACTION_TYPE.sign]
      }
    }
  })

  // 本月
  const month = dayjs().format('YYYY-MM-01 00:00:00 +0800')
  const monthMatch = JSON.stringify({
    $match: {
      teacherId, // 选择老师
      $expr: { $gte: ['$createDate', { $toDate: month }] }, // 选择时间
      type: {
        $in: [COURSE_HOUR_ACTION_TYPE.supplement, COURSE_HOUR_ACTION_TYPE.sign]
      }
    }
  })

  // 所有的
  const all = JSON.stringify({
    $match: {
      teacherId, // 选择老师
      type: {
        $in: [COURSE_HOUR_ACTION_TYPE.supplement, COURSE_HOUR_ACTION_TYPE.sign]
      }
    }
  })

  // 通用的group
  const group = JSON.stringify(
    {
      $group: {
        // _id: { $dateToString: { format: '%Y-%m', date: '$createDate' } },
        _id: null,
        count: { $sum: '$num' }
      }
    }
  )

  async function getTodayData () {
    const { data: { data } } = await commonQuery({
      collectionName,
      sql: [
        teacherMatch,
        group
      ]
    })
    console.log(data)
    statistics.today = data[0].count
  }

  async function getMonthData () {
    const { data: { data } } = await commonQuery({
      collectionName,
      sql: [
        monthMatch,
        group
      ]
    })
    console.log(data)
    statistics.month = data[0].count
  }

  async function getAllData () {
    const { data: { data } } = await commonQuery({
      collectionName,
      sql: [
        all,
        group
      ]
    })
    console.log(data)
    statistics.all = data[0].count
  }

  onMounted(() => {
    getTodayData()
    getMonthData()
    getAllData()
  })

  return {
    statistics
  }
}
